import { useState, useMemo } from 'react';
import { Search, Star, MapPin, Compass } from 'lucide-react';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';

interface SearchViewProps {
  onSelectFood: (food: FoodItem) => void;
  initialQuery?: string;
}

export default function SearchView({ onSelectFood, initialQuery = '' }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Món Việt', 'Lẩu', 'Nướng', 'Cơm Văn Phòng', 'Trà Sữa'];

  const filteredFoods = useMemo(() => {
    return FOOD_ITEMS.filter((food) => {
      // Filter by category
      const matchesCategory =
        selectedCategory === 'Tất cả' || food.category === selectedCategory;

      // Filter by query search (case insensitive)
      const matchesQuery =
        food.name.toLowerCase().includes(query.toLowerCase()) ||
        food.location.toLowerCase().includes(query.toLowerCase()) ||
        food.category.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="pt-2 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Search Input */}
      <section className="mb-6">
        <div className="relative w-full max-w-2xl mx-auto">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm món ăn, địa điểm..." 
            className="w-full h-12 pl-12 pr-12 bg-white border border-outline-variant/60 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md transition-all outline-none text-body-lg text-on-surface"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Xóa
            </button>
          )}
        </div>
      </section>

      {/* Filter Chips */}
      <section className="mb-8">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 max-w-2xl mx-auto sticky top-16 z-30 bg-background/50 backdrop-blur-xs py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all duration-200 shadow-xs cursor-pointer ${
                  isActive 
                    ? 'bg-primary text-on-primary scale-105' 
                    : 'bg-white text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of Foods */}
      <section className="max-w-5xl mx-auto">
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <div 
                key={food.id}
                className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    referrerPolicy="no-referrer"
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-secondary-container px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-xs text-on-secondary-container">{food.rating}</span>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-white/90 text-primary-container px-2 py-0.5 rounded-full shadow-sm">
                    {food.category}
                  </span>
                </div>

                {/* Info and Actions */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-md text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{food.name}</h3>
                    <span className="text-primary font-bold text-xs shrink-0 ml-2">{food.priceRange.split(' - ')[0]}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-on-surface-variant mb-4 mt-auto">
                    <MapPin className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-xs truncate">{food.distance || '1.1 km'} • {food.location}</span>
                  </div>

                  <button 
                    onClick={() => onSelectFood(food)}
                    className="w-full py-2.5 border border-primary text-primary hover:bg-primary hover:text-on-primary rounded-xl font-semibold text-xs transition-all duration-200 active:scale-95 shadow-xs"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Compass className="w-16 h-16 text-outline-variant mx-auto mb-4 animate-spin duration-3000" />
            <h3 className="font-bold text-md text-on-surface">Không tìm thấy món ăn, địa điểm hơp lệ</h3>
            <p className="text-on-surface-variant text-xs mt-2">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc.</p>
          </div>
        )}
      </section>
    </div>
  );
}
