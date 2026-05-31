import { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import SuggestView from './components/SuggestView';
import CommunityView from './components/CommunityView';
import ProfileView from './components/ProfileView';
import DetailView from './components/DetailView';
import ContentManagementView from './components/ContentManagementView';
import LuckyWheelView from './components/LuckyWheelView';
import AndroidDevPanel from './components/AndroidDevPanel';
import { FoodItem, PlaceItem, ViewState } from './types';
import { Sparkles, UtensilsCrossed, Smartphone, Laptop, Wifi, Battery, Compass, Award } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('splash');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  
  // Android simulator settings
  const [isSimulatorMode, setIsSimulatorMode] = useState(true);
  const [deviceStats, setDeviceStats] = useState({
    battery: 98,
    wifi: true,
    network: '5G',
    theme: 'light' as 'light' | 'dark'
  });
  const [currentTime, setCurrentTime] = useState('09:41');

  // Live clock updates for Android status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Splash screen timeout
  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => {
        setView('home');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Navigate to food item detail view
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setSelectedPlace(null);
    setView('detail');
  };

  // Navigate to landmark detail view
  const handleSelectPlace = (place: PlaceItem) => {
    setSelectedPlace(place);
    setSelectedFood(null);
    setView('detail');
  };

  // Triggers search filter keyword redirection
  const handleSetSearchFilter = (keyword: string) => {
    setSearchInitialQuery(keyword);
  };

  // Render the core active screen view
  const renderViewContent = () => {
    switch (view) {
      case 'home':
        return (
          <HomeView 
            onSelectFood={handleSelectFood}
            onSelectPlace={handleSelectPlace}
            onViewChange={setView}
            onSetSearchFilter={handleSetSearchFilter}
          />
        );
      case 'search':
        return (
          <SearchView 
            onSelectFood={handleSelectFood}
            initialQuery={searchInitialQuery}
          />
        );
      case 'suggest':
        return (
          <SuggestView 
            onViewChange={setView}
          />
        );
      case 'community':
        return <CommunityView />;
      case 'profile':
        return (
          <ProfileView 
            onSelectFood={handleSelectFood}
            onSelectPlace={handleSelectPlace}
            onViewChange={setView}
          />
        );
      case 'detail':
        if (selectedFood || selectedPlace) {
          return (
            <DetailView 
              item={selectedFood || selectedPlace!}
              isFood={!!selectedFood}
              onBack={() => setView('home')}
            />
          );
        }
        return null;
      case 'management':
        return (
          <ContentManagementView 
            onBackToProfile={() => setView('profile')}
          />
        );
      case 'wheel':
        return <LuckyWheelView />;
      default:
        return null;
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans select-none antialiased">
      
      {/* 1. Splash intro screen */}
      {view === 'splash' && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center gap-4 animate-out fade-out duration-500 delay-1000">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg relative animate-bounce">
            <UtensilsCrossed className="w-10 h-10 text-white font-black" />
            <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
          <div className="text-center">
            <h1 className="font-headline font-bold text-headline-lg text-primary text-2xl tracking-tight">Hôm Nay Ăn Gì?</h1>
            <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider mt-1">Gợi ý ẩm thực &amp; dã ngoại bằng AI</p>
          </div>
        </div>
      )}

      {/* 2. Global Developer Header Panel for choosing between Android Sim and standalone Web layout */}
      {view !== 'splash' && (
        <header className="bg-slate-900 text-white px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between border-b border-slate-800 gap-4 shadow-md z-40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm uppercase tracking-wider">Môi Trường Lập Trình Android Mobile</h2>
                <span className="bg-emerald-500/25 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-black animate-pulse">ACTIVE</span>
              </div>
              <p className="text-[11px] text-slate-400">Xem trước ứng dụng với khung giả lập Android hoặc sao chép mã nguồn Kotlin Jetpack Compose</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulatorMode(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSimulatorMode 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Chế độ Android</span>
            </button>
            <button
              onClick={() => setIsSimulatorMode(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                !isSimulatorMode 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Web đầy đủ</span>
            </button>
          </div>
        </header>
      )}

      {/* 3. Primary Dashboard Frame */}
      {view !== 'splash' && (
        <div className="flex-grow w-full max-w-[1300px] mx-auto p-4 md:p-6 lg:p-8">
          
          {isSimulatorMode ? (
            /* ANDROID EMULATOR DUAL VIEW LAYOUT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
              
              {/* Left Side: Exquisite Material 3 Android Device Simulator Frame */}
              <div className="lg:col-span-5 flex justify-center sticky top-24 pt-2">
                <div className="relative mx-auto w-full max-w-[390px] h-[780px] rounded-[48px] border-[12px] border-slate-900 bg-white shadow-2xl overflow-hidden flex flex-col transform translate-z-0">
                  
                  {/* Dynamic Front-Camera Punch Hole (Notch) */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full z-50 flex items-center justify-center">
                    <div className="w-1 h-1 bg-slate-900 rounded-full" />
                  </div>

                  {/* Android Status Bar */}
                  <div className="h-9 bg-white px-6 flex items-center justify-between text-[11px] font-bold text-slate-700 z-50 select-none border-b border-outline-variant/10">
                    <div>{currentTime}</div>
                    <div className="flex items-center gap-1.5">
                      {deviceStats.wifi && <Wifi className="w-3.5 h-3.5 text-slate-800" />}
                      <span className="text-[10px] tracking-tight">{deviceStats.network}</span>
                      <div className="flex items-center gap-0.5 ml-0.5">
                        <Battery className="w-4 h-4 text-slate-800 rotate-90" />
                        <span className="text-[10px]">{deviceStats.battery}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Device Screen Viewport - constrain absolute topbar and bottombar */}
                  <div className="relative flex-grow overflow-hidden flex flex-col bg-[#FAFAFC]" style={{ transform: 'translate3d(0, 0, 0)' }}>
                    
                    {/* Embedded TopAppBar (Constraints allow absolute placement context inside Device view) */}
                    <TopAppBar 
                      currentView={view} 
                      onViewChange={setView} 
                      onSearchClick={() => {
                        setSearchInitialQuery('');
                        setView('search');
                      }}
                    />

                    {/* Scrollable Screen Content Context */}
                    <main className="flex-grow overflow-y-auto no-scrollbar pt-16 pb-20 px-3.5">
                      {renderViewContent()}
                    </main>

                    {/* Bottom Material 3 Navigation Bar inside simulator */}
                    <BottomNavBar 
                      currentView={view} 
                      onViewChange={(v) => {
                        setSearchInitialQuery('');
                        setView(v);
                      }}
                    />

                  </div>

                  {/* Android Bottom Gestural Bar System Pill */}
                  <div className="h-5 bg-white flex items-center justify-center pb-2.5 z-50">
                    <div className="w-28 h-1 bg-slate-800/40 rounded-full" style={{ contentVisibility: 'auto' }} />
                  </div>

                </div>
              </div>

              {/* Right Side: Android Developer Code Hub Panel */}
              <div className="lg:col-span-7 h-full">
                <AndroidDevPanel 
                  deviceStats={deviceStats} 
                  setDeviceStats={setDeviceStats} 
                />
              </div>

            </div>
          ) : (
            /* STANDALONE RESPONSIVE WEB VIEW LAYOUT */
            <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col duration-300">
              {/* Desktop App view header spacing */}
              <div className="relative">
                <TopAppBar 
                  currentView={view} 
                  onViewChange={setView} 
                  onSearchClick={() => {
                    setSearchInitialQuery('');
                    setView('search');
                  }}
                />
              </div>

              <main className="flex-grow pt-20 pb-28 px-4 md:px-8 w-full max-w-[1240px] mx-auto min-h-[500px]">
                {renderViewContent()}
              </main>

              <BottomNavBar 
                currentView={view} 
                onViewChange={(v) => {
                  setView(v);
                }}
              />
            </div>
          )}

        </div>
      )}

    </div>
  );
}

