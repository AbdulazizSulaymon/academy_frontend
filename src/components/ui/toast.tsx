import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ShoppingCart, X } from 'lucide-react';
import clsx from 'clsx';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'cart';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 2500, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, duration - 300);

    // Actually close
    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    cart: <ShoppingCart className="w-5 h-5" />,
  };

  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    cart: 'from-primary to-primary-700',
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={clsx(
        'fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[100] transition-all duration-300',
        isVisible && !isLeaving ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      )}
    >
      <div className={`bg-gradient-to-r ${colors[type]} rounded-2xl p-4 shadow-2xl flex items-center gap-3`}>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
          {icons[type]}
        </div>
        <p className="flex-1 text-white font-medium text-sm">{message}</p>
      </div>
    </div>,
    document.body
  );
};

// Toast manager hook
type ToastData = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'cart';
};

let toastId = 0;
const listeners: Set<(toasts: ToastData[]) => void> = new Set();
let toasts: ToastData[] = [];

const notify = (message: string, type: 'success' | 'error' | 'cart' = 'success') => {
  const id = ++toastId;
  toasts = [...toasts, { id, message, type }];
  listeners.forEach((listener) => listener(toasts));

  return id;
};

const remove = (id: number) => {
  toasts = toasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(toasts));
};

export const toast = {
  success: (message: string) => notify(message, 'success'),
  error: (message: string) => notify(message, 'error'),
  cart: (message: string) => notify(message, 'cart'),
};

export const useToasts = () => {
  const [state, setState] = useState<ToastData[]>([]);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return { toasts: state, remove };
};

export const ToastContainer: React.FC = () => {
  const { toasts, remove } = useToasts();

  if (toasts.length === 0) return null;

  // Only show the latest toast
  const latestToast = toasts[toasts.length - 1];

  return <Toast key={latestToast.id} message={latestToast.message} type={latestToast.type} onClose={() => remove(latestToast.id)} />;
};
