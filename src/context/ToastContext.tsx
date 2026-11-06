import React, { createContext, useContext, useState } from 'react';
import { ToastNotification } from '../types';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string, type?: ToastNotification['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: ToastNotification['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastNotification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#E10600]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#E10600]" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#E10600]" />;
      case 'info':
        return <Info className="w-5 h-5 text-white" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#2A2A2A] text-white rounded-xl p-4 shadow-2xl border-l-4 border-[#E10600] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="flex items-center gap-3">
              {getIcon(toast.type)}
              <span className="text-xs font-bold text-zinc-100">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
