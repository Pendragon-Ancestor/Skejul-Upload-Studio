import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({ icon = 'inbox', title, description, action, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
      <div className="w-20 h-20 bg-container-low rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-on-surface/40">{icon}</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold text-on-surface">{title}</h2>
        <p className="text-sm text-on-surface/60 text-center max-w-md">{description}</p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )}

      {children}
    </div>
  );
}
