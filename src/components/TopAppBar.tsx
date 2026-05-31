import { Menu, Search, Bell, Settings, Award } from 'lucide-react';
import { ViewState } from '../types';
import { USER_AVATAR } from '../data/mockData';

interface TopAppBarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onSearchClick?: () => void;
}

export default function TopAppBar({ currentView, onViewChange, onSearchClick }: TopAppBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onViewChange('home')}
          className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150"
          title="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 
          onClick={() => onViewChange('home')}
          className="font-headline-sm text-lg md:text-xl text-primary font-bold cursor-pointer select-none tracking-tight flex items-center gap-1.5"
        >
          <span>Hôm Nay Ăn Gì?</span>
        </h1>
      </div>
      <div className="flex items-center gap-1 md:gap-3">
        {currentView === 'home' && (
          <button 
            onClick={() => onViewChange('wheel')}
            className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 transition-transform flex items-center gap-1 bg-amber-50 px-3 py-1.5 border border-amber-200/50"
            title="Vòng Quay May Mắn"
          >
            <Award className="w-5 h-5 animate-pulse text-amber-500" />
            <span className="text-xs font-bold text-amber-700 hidden sm:inline">Vòng Quay</span>
          </button>
        )}
        <button 
          onClick={onSearchClick || (() => onViewChange('search'))}
          className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150"
          title="Search"
        >
          <Search className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('management')}
          className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150 relative"
          title="Quản lý"
        >
          <Settings className="w-6 h-6" />
        </button>
        <div 
          onClick={() => onViewChange('profile')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer hover:border-primary active:scale-95 transition-all shadow-sm"
          title="Profile"
        >
          <img 
            alt="Profile Avatar" 
            src={USER_AVATAR} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
