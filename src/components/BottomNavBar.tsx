import { Home, Search, Sparkles, MessageSquare, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavBarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export default function BottomNavBar({ currentView, onViewChange }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe pt-2 h-20 bg-white/95 backdrop-blur-md border-t border-outline-variant/30 shadow-[0px_-2px_8px_rgba(0,0,0,0.06)] rounded-t-2xl">
      {/* Home */}
      <button 
        onClick={() => onViewChange('home')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
          currentView === 'home' 
            ? 'bg-secondary-container text-on-secondary-container scale-105 shadow-sm' 
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Trang chủ</span>
      </button>

      {/* Search */}
      <button 
        onClick={() => onViewChange('search')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
          currentView === 'search' 
            ? 'bg-secondary-container text-on-secondary-container scale-105 shadow-sm' 
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <Search className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Tìm kiếm</span>
      </button>

      {/* AI Suggest */}
      <button 
        onClick={() => onViewChange('suggest')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
          currentView === 'suggest' 
            ? 'bg-secondary-container text-on-secondary-container scale-105 shadow-sm' 
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <Sparkles className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Gợi ý AI</span>
      </button>

      {/* Community */}
      <button 
        onClick={() => onViewChange('community')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
          currentView === 'community' 
            ? 'bg-secondary-container text-on-secondary-container scale-105 shadow-sm' 
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Cộng đồng</span>
      </button>

      {/* Profile */}
      <button 
        onClick={() => onViewChange('profile')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
          currentView === 'profile' || currentView === 'management'
            ? 'bg-secondary-container text-on-secondary-container scale-105 shadow-sm' 
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Cá nhân</span>
      </button>
    </nav>
  );
}
