import React from 'react';
import { PackageX, Home, ArrowLeft, Store, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate, onOpenConfig }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto">
        <PackageX className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-stone-900 font-mono">404</span>
        <h1 className="text-2xl font-bold text-stone-900">Page Not Found</h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          The wheat product or page you are looking for may have moved or been updated in our catalog.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/products')}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Store className="w-4 h-4" />
          <span>View All Products</span>
        </button>

        <WhatsAppButton
          label="Ask Support on WhatsApp"
          variant="outline"
          size="sm"
          onOpenConfig={onOpenConfig}
        />
      </div>
    </div>
  );
};
