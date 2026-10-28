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
        return 'bg-success/15';
      case 'danger':
        return 'bg-danger/20';
      case 'confirmation':
        return 'bg-info/15';
      default:
        return 'bg-surface';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'danger':
        return 'text-danger';
      case 'confirmation':
        return 'text-info';
      default:
        return 'text-on-surface/60';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success hover:bg-success/90 text-on-success';
      case 'danger':
        return 'bg-danger hover:bg-danger/90 text-on-danger';
      case 'confirmation':
        return 'bg-info hover:bg-info/90 text-on-info';
      default:
        return 'bg-primary hover:bg-primary/90 text-on-primary';
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
      <div className={`${getBgColor()} rounded-2xl p-8 w-96 shadow-2xl animate-slideUp border border-outline-variant`}>
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-container flex items-center justify-center shadow-lg`}>
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
              className="flex-1 px-4 py-3 rounded-lg border border-outline-variant bg-container text-on-surface font-medium text-sm hover:bg-container-high transition-colors"
            >
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && (
            <button
              onClick={onPrimaryClick}
              className={`flex-1 px-4 py-3 rounded-lg ${getButtonColor()} font-medium text-sm transition-colors`}
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
