import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  rectIntersection,
  CollisionDetection,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { LeadCard } from './lead-card';
import type { Lead, LeadStatus } from '@src/types/lead';
import { leadsQueryKey } from '@src/queries/models/lead';
import { useApi } from '@src/api';
import { useMyTheme } from '@hooks/use-my-theme';

interface Props {
  leads: Lead[];
  statuses: LeadStatus[];
  fieldNameForLeadChecking: string;
}

// Sortable Lead Card Component - optimized with memo only
const SortableLeadCard = React.memo(({ lead, index }: { lead: Lead; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
    data: {
      type: 'lead',
      lead,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2">
      <LeadCard lead={lead} />
    </div>
  );
});

SortableLeadCard.displayName = 'SortableLeadCard';

// Virtual List Item Component - optimized with memo only
const VirtualListItem = React.memo(
  ({
    virtualItem,
    leads,
    measureElement,
  }: {
    virtualItem: any;
    leads: Lead[];
    measureElement: (node: Element | null) => void;
  }) => {
    const lead = leads[virtualItem.index];

    if (!lead) return null;

    return (
      <div
        ref={measureElement}
        data-index={virtualItem.index}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${virtualItem.start}px)`,
        }}
      >
        <SortableLeadCard lead={lead} index={virtualItem.index} />
      </div>
    );
  },
);

VirtualListItem.displayName = 'VirtualListItem';

// Droppable Column Component - optimized
const DroppableColumn = React.memo(
  ({ status, leads, shouldVirtualize }: { status: LeadStatus; leads: Lead[]; shouldVirtualize: boolean }) => {
    const { t } = useTranslation();
    const parentRef = useRef<HTMLDivElement>(null);
    const { isDarkMode } = useMyTheme();

    // Use droppable hook
    const { setNodeRef, isOver } = useDroppable({
      id: status.id,
    });

    // Memoize lead IDs for SortableContext
    const leadIds = useMemo(() => leads.map((lead) => lead.id), [leads]);

    // Virtual list setup with small optimization
    const virtualizer = useVirtualizer({
      count: leads.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 120,
      overscan: 3, // Reduced from 5
      enabled: shouldVirtualize,
    });

    const virtualItems = shouldVirtualize ? virtualizer.getVirtualItems() : [];

    return (
      <Col key={status.id} className="max-w-[300px] min-w-[300px]">
        {/* Column Header */}
        <div
          className="mb-3 rounded p-2"
          css={css`
            background: ${status.color || '#f0f0f0'};
          `}
        >
          <Typography
            className="text-md font-medium"
            css={css`
              color: ${status.color ? '#fff' : '#000'};
            `}
          >
            {t(status.title || 'No Title')} ({leads.length})
          </Typography>
        </div>

        {/* Droppable Area */}
        <div
          ref={(el) => {
            setNodeRef(el);
            if (el) {
              // @ts-ignore
              parentRef.current = el;
            }
          }}
          className={`mb-3 rounded bg-gray-50 p-2 transition-colors ${
            isOver ? 'border-2 border-blue-300 bg-blue-100' : ''
          } dark:bg-gray-600 dark:hover:bg-gray-500`}
          style={{
            height: 'calc(100vh - 270px)',
            minHeight: '400px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            ...(isOver ? { background: isDarkMode ? '#5c4e3e' : '#eaeaea' } : {}),
          }}
        >
          <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
            {shouldVirtualize ? (
              // Virtual List
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualItems.map((virtualItem: Record<string, any>) => (
                  <VirtualListItem
                    key={virtualItem.key}
                    virtualItem={virtualItem}
                    leads={leads}
                    measureElement={virtualizer.measureElement}
                  />
                ))}
              </div>
            ) : (
              // Regular List
              <>
                {leads.map((lead, index) => (
                  <SortableLeadCard key={lead.id} lead={lead} index={index} />
                ))}
                {/* Empty space for dropping */}
                {leads.length === 0 && (
                  <div className="flex h-20 items-center justify-center text-sm text-gray-400">
                    {/*{t('Drop items here')}*/}
                  </div>
                )}
              </>
            )}
          </SortableContext>
        </div>
      </Col>
    );
  },
);

DroppableColumn.displayName = 'DroppableColumn';

// Custom collision detection for better performance
const customCollisionDetection: CollisionDetection = (args) => {
  // First, let's see if there are any collisions with the pointer
  const pointerIntersections = rectIntersection(args);

  if (pointerIntersections.length > 0) {
    return pointerIntersections;
  }

  // If there are no pointer intersections, return the closest corners
  return closestCorners(args);
};

export const KanbanBoard = ({ leads, statuses, fieldNameForLeadChecking }: Props) => {
  const [data, setData] = useState<Record<string, Lead[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const api = useApi();

  // Memoize main status check
  const isMainStatus = useMemo(() => fieldNameForLeadChecking === 'leadStatusId', [fieldNameForLeadChecking]);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Mutations
  const { mutate } = useMutation({
    mutationFn: (payload: { leadId: string; newStatusId?: string; newOrder: number; statusChanged: boolean }) =>
      api.apis.Lead.updateOne({
        where: { id: payload.leadId },
        data: {
          ...(payload.statusChanged && payload.newStatusId
            ? { leadStatus: { connect: { id: payload.newStatusId } }, statusUpdatedAt: new Date() }
            : {}),
          order: payload.newOrder,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [leadsQueryKey] });
    },
  });

  // Optimized initialization
  useEffect(() => {
    const statusMap: Record<string, Lead[]> = {};

    // Single pass through leads
    leads.forEach((lead: any) => {
      const statusId = lead[fieldNameForLeadChecking];
      if (!statusMap[statusId]) {
        statusMap[statusId] = [];
      }
      statusMap[statusId].push(lead);
    });

    // Ensure all statuses have arrays
    statuses.forEach((status) => {
      if (!statusMap[status.id]) {
        statusMap[status.id] = [];
      }
    });

    setData(statusMap);
  }, [leads, statuses, fieldNameForLeadChecking]);

  // Order calculation function
  const calculateOrderForDesc = useCallback(
    (position: 'top' | 'bottom' | 'between', prev?: number, next?: number): number => {
      const DEFAULT_GAP = 1000;
      const MIN_ORDER = 0.01;

      switch (position) {
        case 'top':
          return (prev || DEFAULT_GAP) + DEFAULT_GAP;
        case 'bottom':
          return next ? next / 2 : MIN_ORDER;
        case 'between':
          if (prev && next) {
            return (prev + next) / 2;
          }
          return prev ? prev / 2 : DEFAULT_GAP;
      }
    },
    [],
  );

  // Find container by ID
  const findContainer = useCallback(
    (id: string) => {
      if (id in data) {
        return id;
      }

      return Object.keys(data).find((key) => data[key].some((lead) => lead.id === id));
    },
    [data],
  );

  // Drag handlers
  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveId(active.id as string);

      const containerId = findContainer(active.id as string);
      if (containerId) {
        const lead = data[containerId].find((lead) => lead.id === active.id);
        setActiveLead(lead || null);
      }
    },
    [data, findContainer],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const activeId = active.id as string;
      const overId = over?.id as string;

      if (!overId) {
        setActiveId(null);
        setActiveLead(null);
        return;
      }

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId) || overId;

      if (!activeContainer || !overContainer) {
        setActiveId(null);
        setActiveLead(null);
        return;
      }

      // Skip if position doesn't change
      if (activeContainer === overContainer) {
        const items = data[activeContainer];
        const activeIndex = items.findIndex((lead) => lead.id === activeId);
        const overIndex = items.findIndex((lead) => lead.id === overId);

        if (activeIndex === overIndex) {
          setActiveId(null);
          setActiveLead(null);
          return;
        }
      }

      let newOrder: number = 0;
      const orderField = isMainStatus ? 'order' : 'innerOrder';

      if (activeContainer === overContainer) {
        // Same column
        const items = [...data[activeContainer]];
        const activeIndex = items.findIndex((lead) => lead.id === activeId);
        const overIndex = items.findIndex((lead) => lead.id === overId);

        if (activeIndex === -1 || overIndex === -1) {
          setActiveId(null);
          setActiveLead(null);
          return;
        }

        // Reorder items
        const [moved] = items.splice(activeIndex, 1);
        items.splice(overIndex, 0, moved);

        setData((prev) => ({
          ...prev,
          [activeContainer]: items,
        }));

        // Calculate order
        let position: 'top' | 'bottom' | 'between';
        let prevOrder: number | undefined;
        let nextOrder: number | undefined;

        if (overIndex === 0) {
          position = 'top';
          prevOrder = items[1]?.[orderField];
        } else if (overIndex === items.length - 1) {
          position = 'bottom';
          nextOrder = items[items.length - 2]?.[orderField];
        } else {
          position = 'between';
          prevOrder = items[overIndex + 1]?.[orderField];
          nextOrder = items[overIndex - 1]?.[orderField];
        }

        newOrder = calculateOrderForDesc(position, prevOrder, nextOrder);
      } else {
        // Different columns
        const sourceItems = [...data[activeContainer]];
        const destItems = [...data[overContainer]];

        const activeIndex = sourceItems.findIndex((lead) => lead.id === activeId);
        if (activeIndex === -1) {
          setActiveId(null);
          setActiveLead(null);
          return;
        }

        const [moved] = sourceItems.splice(activeIndex, 1);

        // Find where to insert in destination
        let destIndex: number;
        if (overId === overContainer) {
          destIndex = destItems.length;
        } else {
          destIndex = destItems.findIndex((lead) => lead.id === overId);
          if (destIndex === -1) {
            destIndex = destItems.length;
          }
        }

        destItems.splice(destIndex, 0, moved);

        setData((prev) => ({
          ...prev,
          [activeContainer]: sourceItems,
          [overContainer]: destItems,
        }));

        // Calculate new order
        let position: 'top' | 'bottom' | 'between';
        let prevOrder: number | undefined;
        let nextOrder: number | undefined;

        if (destIndex === 0) {
          position = 'top';
          prevOrder = destItems[1]?.[orderField];
        } else if (destIndex >= destItems.length - 1) {
          position = 'bottom';
          nextOrder = destItems[destItems.length - 2]?.[orderField];
        } else {
          position = 'between';
          prevOrder = destItems[destIndex + 1]?.[orderField];
          nextOrder = destItems[destIndex - 1]?.[orderField];
        }

        newOrder = calculateOrderForDesc(position, prevOrder, nextOrder);
      }

      // Send update to server
      if (isMainStatus) {
        const statusChanged = activeContainer !== overContainer;
        mutate({
          leadId: activeId,
          newStatusId: statusChanged ? overContainer : undefined,
          newOrder,
          statusChanged,
        });
      }

      setActiveId(null);
      setActiveLead(null);
    },
    [data, findContainer, isMainStatus, calculateOrderForDesc, mutate],
  );

  // Memoize columns data with lower threshold
  const columnsData = useMemo(() => {
    return statuses.map((status) => ({
      status,
      leads: data[status.id] || [],
      shouldVirtualize: (data[status.id] || []).length > 15, // Lowered from 20
    }));
  }, [statuses, data]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Row gutter={16} className="flex-nowrap overflow-x-auto">
        {columnsData.map(({ status, leads, shouldVirtualize }) => (
          <DroppableColumn key={status.id} status={status} leads={leads} shouldVirtualize={shouldVirtualize} />
        ))}
      </Row>

      <DragOverlay>
        {activeId && activeLead ? (
          <div className="rotate-3 opacity-95">
            <LeadCard lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
