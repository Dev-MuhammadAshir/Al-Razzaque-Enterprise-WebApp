import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (url: string) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-stone-500 flex items-center flex-wrap gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-amber-800 transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.url + index}>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-stone-800 truncate max-w-xs">{item.label}</span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(item.url)}
                className="hover:text-amber-800 transition-colors cursor-pointer truncate max-w-xs"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
