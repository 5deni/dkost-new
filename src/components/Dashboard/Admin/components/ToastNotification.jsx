import React, { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaTimes, FaInfoCircle } from 'react-icons/fa';

const ToastNotification = ({ 
  message, 
  type = 'success', 
  duration = 5000, 
  onClose,
  show = false 
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <FaCheck className="text-green-600" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconBg: 'bg-green-100'
        };
      case 'error':
        return {
          icon: <FaTimes className="text-red-600" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconBg: 'bg-red-100'
        };
      case 'warning':
        return {
          icon: <FaExclamationTriangle className="text-yellow-600" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconBg: 'bg-yellow-100'
        };
      case 'info':
        return {
          icon: <FaInfoCircle className="text-blue-600" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconBg: 'bg-blue-100'
        };
      default:
        return {
          icon: <FaInfoCircle className="text-gray-600" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconBg: 'bg-gray-100'
        };
    }
  };

  if (!isVisible) return null;

  const config = getToastConfig();

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`
        max-w-sm w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4
      `}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${config.iconBg} rounded-full p-2 mr-3`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${config.textColor}`}>
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`flex-shrink-0 ml-4 ${config.textColor} hover:opacity-70 transition-opacity`}
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Context Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration + 300); // Add extra time for animation
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            show={true}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Toast Context
export const ToastContext = React.createContext();

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastNotification;
