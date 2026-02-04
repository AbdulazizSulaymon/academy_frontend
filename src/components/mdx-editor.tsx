import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  tablePlugin,
  codeBlockPlugin,
  imagePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  InsertImage,
  InsertCodeBlock,
  toolbarPlugin,
} from '@mdxeditor/editor';
import { css } from '@emotion/react';
import { useMyTheme } from '@hooks/use-my-theme';
import clsx from 'clsx';
import React, { useEffect } from 'react';

// Only import this to the next file
export default function InitializedMDXEditor({ markdown, ...props }: MDXEditorProps) {
  const { isDarkMode } = useMyTheme();
  const ref = React.useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(markdown);
  }, [markdown]);

  return (
    <div
      className={clsx({ 'bg-gray-50 dark:bg-zinc-900 dark:text-white rounded': true, 'dark-editor': isDarkMode })}
      css={css`
        &.dark-editor {
          button:hover,
          button[data-state='on'] {
            background: #1a1a1a !important;
          }

          button svg {
            color: white !important;
          }

          button[data-disabled] svg {
            color: gray !important;
          }
        }
      `}
    >
      <MDXEditor
        // className={clsx('dark-editor' && isDarkMode)}
        // className={'dark-editor'}
        contentEditableClassName="dark:!text-white"
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin(),
          imagePlugin(),

          toolbarPlugin({
            toolbarClassName: 'dark:bg-zinc-800 dark:!text-white !fill-white',
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
                {/*<BlockTypeSelect />*/}
                {/*<InsertCodeBlock />*/}
              </>
            ),
          }),
        ]}
        {...props}
        ref={ref}
      />
    </div>
  );
}
