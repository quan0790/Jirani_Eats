import React, { useState, useCallback } from "react";

// Toast context to manage notifications
const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    // Auto-remove after 3 seconds with fade animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300); // matches transition duration
    }, 3000);
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`bg-gray-800 text-white px-4 py-2 rounded shadow-md transform transition-all duration-300
              ${t.leaving ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            {t.title && <div className="font-bold">{t.title}</div>}
            <div>{t.description || t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use toast in components
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Simple helper function to show toast globally
export const toast = (message) => {
  console.warn(
    "Global toast helper is not implemented in JSX. Use `useToast().show()` inside a component."
  );
};
