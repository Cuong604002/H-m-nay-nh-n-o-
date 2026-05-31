import { useState, FormEvent } from 'react';
import { Search, Utensils, MapPin, Sparkles, Star, Flame, ArrowRight, Compass, Heart } from 'lucide-react';
import { FOOD_ITEMS, PLACE_ITEMS } from '../data/mockData';
import { FoodItem, PlaceItem, ViewState } from '../types';

interface HomeViewProps {
  onSelectFood: (food: FoodItem) => void;
  onSelectPlace: (place: PlaceItem) => void;
  onViewChange: (view: ViewState) => void;
  onSetSearchFilter?: (filter: string) => void;
}

export default function HomeView({ onSelectFood, onSelectPlace, onViewChange, onSetSearchFilter }: HomeViewProps) {
  const [searchVal, setSearchVal] = useState('');

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (onSetSearchFilter) {
      onSetSearchFilter(searchVal);
    }
    onViewChange('search');
  };

  const hotPlaces = PLACE_ITEMS.filter(p => p.tag === 'Mới nhất' || p.tag === 'Xu hướng');

  return (
    <div className="pt-2 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Search Section */}
      <section className="mb-6">
        <form onSubmit={submitSearch} className="relative max-w-xl mx-auto group">
          <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Hôm nay bạn muốn ăn gì hoặc đi đâu?" 
            className="w-full h-14 pl-12 pr-12 bg-white border border-outline-variant/50 rounded-2xl shadow-sm text-body-lg placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 font-bold" />
          {searchVal && (
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1.5 rounded-lg font-bold"
            >
              Tìm
            </button>
          )}
        </form>
      </section>

      {/* Quick Actions Bento Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          <button 
            onClick={() => {
              if (onSetSearchFilter) onSetSearchFilter('Món ăn');
              onViewChange('search');
            }}
            className="flex flex-col items-center justify-center p-4 bg-primary-container/10 rounded-2xl hover:bg-primary-container/20 transition-all select-none hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Utensils className="text-primary w-6 h-6 animate-pulse" />
            </div>
            <span className="font-label-lg text-center font-semibold text-xs leading-tight text-on-surface">Tìm món ăn</span>
          </button>

          <button 
            onClick={() => {
              if (onSetSearchFilter) onSetSearchFilter('Địa điểm');
              onViewChange('search');
            }}
            className="flex flex-col items-center justify-center p-4 bg-secondary-container/10 rounded-2xl hover:bg-secondary-container/20 transition-all select-none hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center mb-2">
              <MapPin className="text-secondary w-6 h-6" />
            </div>
            <span className="font-label-lg text-center font-semibold text-xs leading-tight text-on-surface">Tìm địa điểm</span>
          </button>

          <button 
            onClick={() => onViewChange('suggest')}
            className="flex flex-col items-center justify-center p-4 bg-tertiary-container/10 rounded-2xl hover:bg-tertiary-container/20 transition-all select-none hover:scale-105 active:scale-95 cursor-pointer col-span-1"
          >
            <div className="w-12 h-12 bg-tertiary-container/20 rounded-full flex items-center justify-center mb-2">
              <Sparkles className="text-tertiary w-6 h-6" style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <span className="font-label-lg text-center font-semibold text-xs leading-tight text-on-surface">Gợi ý AI</span>
          </button>

          <button 
            onClick={() => {
              if (onSetSearchFilter) onSetSearchFilter('Nổi bật');
              onViewChange('search');
            }}
            className="flex flex-col items-center justify-center p-4 bg-surface-container-highest rounded-2xl hover:bg-surface-variant transition-all select-none hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
              <Star className="text-amber-500 w-6 h-6" />
            </div>
            <span className="font-label-lg text-center font-semibold text-xs leading-tight text-on-surface">Nổi bật</span>
          </button>

          <button 
            onClick={() => {
              if (onSetSearchFilter) onSetSearchFilter('Xu hướng');
              onViewChange('search');
            }}
            className="flex flex-col items-center justify-center p-4 bg-surface-container-highest rounded-2xl hover:bg-surface-variant transition-all select-none hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
              <Flame className="text-red-500 w-6 h-6" />
            </div>
            <span className="font-label-lg text-center font-semibold text-xs leading-tight text-on-surface">Xu hướng</span>
          </button>
        </div>
      </section>

      {/* Món Ăn Nổi Bật scrolling row */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm-mobile md:text-headline-sm text-on-surface font-extrabold flex items-center gap-1.5">
              <span>Món ăn nổi bật</span>
              <span className="text-primary text-xs bg-primary/10 px-2 py-0.5 rounded-full font-semibold">Bán chạy nhất</span>
            </h2>
            <p className="text-on-surface-variant text-xs">Được yêu thích nhất tuần này</p>
          </div>
          <button 
            onClick={() => {
              if (onSetSearchFilter) onSetSearchFilter('');
              onViewChange('search');
            }}
            className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2 snap-x snap-mandatory">
          {FOOD_ITEMS.slice(0, 3).map((food) => (
            <div 
              key={food.id}
              onClick={() => onSelectFood(food)}
              className="flex-none w-64 group cursor-pointer snap-start bg-white rounded-2xl border border-outline-variant/10 p-2 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-40 rounded-xl overflow-hidden mb-3 market-img relative">
                <img 
                  referrerPolicy="no-referrer"
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {food.rating}
                </div>
              </div>
              <div className="px-1 b-2">
                <h3 className="font-title-lg text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">{food.name}</h3>
                <p className="text-primary font-semibold text-xs mt-0.5">{food.priceRange}</p>
                <div className="flex items-center gap-1 mt-1 text-on-surface-variant text-[11px]">
                  <Compass className="w-3 h-3" />
                  <span>{food.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Địa Điểm Check-in Hot */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm-mobile md:text-headline-sm text-on-surface font-extrabold">Địa điểm check-in hot</h2>
            <p className="text-on-surface-variant text-xs">Phổ biến cực độ trên diễn đàn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hotPlaces.slice(0, 2).map((place) => (
            <div 
              key={place.id}
              onClick={() => onSelectPlace(place)}
              className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-outline-variant/10"
            >
              <img 
                referrerPolicy="no-referrer"
                src={place.image} 
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className={`inline-block w-fit px-3 py-1 text-[10px] font-bold rounded-full mb-2 uppercase tracking-wider ${
                  place.tag === 'Mới nhất' ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  {place.tag}
                </span>
                <h3 className="text-md md:text-lg font-bold text-white mb-1 drop-shadow-sm">{place.name}</h3>
                <p className="text-white/80 text-xs flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-secondary-container" />
                  <span>{place.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quán Ăn Nổi Bật (Vertical List) */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm-mobile md:text-headline-sm text-on-surface font-extrabold">Đối tác ẩm thực nổi bật</h2>
            <p className="text-on-surface-variant text-xs">Món ngon uy tín, chuẩn hóa dịch vụ</p>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FOOD_ITEMS.slice(3, 6).map((food) => (
            <div 
              key={food.id}
              onClick={() => onSelectFood(food)}
              className="flex gap-4 bg-white p-3 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              <img 
                referrerPolicy="no-referrer"
                src={food.image} 
                alt={food.name}
                className="w-24 h-24 rounded-xl object-cover flex-none group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-between py-1 flex-grow min-w-0">
                <div>
                  <h3 className="font-title-lg text-sm md:text-md text-on-surface font-bold truncate group-hover:text-primary transition-colors">{food.name}</h3>
                  <p className="text-on-surface-variant text-xs truncate mt-0.5">{food.description}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                    <span className="flex items-center gap-1 font-bold text-secondary">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {food.rating}
                    </span>
                    <span>•</span>
                    <span>{food.distance || '1.0km'}</span>
                  </div>
                  <span className="text-teal-600 font-bold text-xs bg-teal-50 px-2 py-1 rounded">Đang mở</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
