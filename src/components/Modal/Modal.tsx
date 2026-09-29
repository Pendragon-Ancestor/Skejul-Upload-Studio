import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'confirmation' | 'danger';
  title: string;
  message: string;
  icon?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  children?: ReactNode;
}

export function Modal({
  isOpen,
  type = 'success',
  title,
  message,
  icon,
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50';
      case 'danger':
        return 'bg-red-50';
      case 'confirmation':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-500';
      case 'danger':
        return 'text-red-500';
      case 'confirmation':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500 hover:bg-emerald-600';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600';
      case 'confirmation':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getIconName = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'danger':
        return 'warning';
      case 'confirmation':
        return 'help';
      default:
        return 'info';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className={`${getBgColor()} rounded-2xl p-8 w-96 shadow-2xl animate-slideUp border border-gray-100`}>
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg`}>
            <span className={`material-symbols-outlined text-4xl ${getIconColor()}`}>
              {getIconName()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-on-surface mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-on-surface/70 text-sm mb-6 leading-relaxed">
          {message}
        </p>

        {/* Custom Children */}
        {children}

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          {secondaryButtonText && (
            <button
              onClick={onSecondaryClick}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-on-surface font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && (
            <button
              onClick={onPrimaryClick}
              className={`flex-1 px-4 py-3 rounded-lg ${getButtonColor()} text-white font-medium text-sm transition-colors`}
            >
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
