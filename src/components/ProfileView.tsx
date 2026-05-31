import { useState } from 'react';
import { Settings, Share2, Star, MapPin, Compass, Edit2, ShieldAlert, Award, Grid, List, Activity } from 'lucide-react';
import { USER_AVATAR, FOOD_ITEMS, PLACE_ITEMS } from '../data/mockData';
import { FoodItem, PlaceItem, ViewState } from '../types';

interface ProfileViewProps {
  onSelectFood: (food: FoodItem) => void;
  onSelectPlace: (place: PlaceItem) => void;
  onViewChange: (view: ViewState) => void;
}

export default function ProfileView({ onSelectFood, onSelectPlace, onViewChange }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'reviews' | 'posts'>('favorites');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-2 pb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Hero Profile Section */}
      <section className="relative bg-surface-container-low pt-8 pb-12 px-6 rounded-b-[40px] shadow-sm border border-outline-variant/10">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8 max-w-2xl mx-auto">
          {/* Avatar with edit layer */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg active:scale-95 transition-transform duration-200 cursor-pointer">
              <img 
                referrerPolicy="no-referrer"
                alt="User Avatar" 
                src={USER_AVATAR} 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-container transition-colors active:scale-90">
              <Edit2 className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="mt-6 md:mt-2 text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h2 className="font-headline-md text-on-surface text-xl md:text-2xl font-black">Minh Nguyễn</h2>
              <span className="w-fit mx-auto md:mx-0 bg-primary/10 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 fill-primary" /> Guru Ẩm Thực
              </span>
            </div>
            
            <p className="font-body-md text-on-surface-variant mt-2 max-w-md text-xs sm:text-sm">
              Chuyên gia săn lùng món ngon lề đường và những quán cafe 'hidden gem' tại Sài Gòn. Đam mê du lịch bụi và chụp ảnh đồ ăn.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <button 
                onClick={() => onViewChange('management')}
                className="bg-primary hover:bg-primary-container text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Quản lý bài viết</span>
              </button>
              <button 
                onClick={handleShare}
                className="bg-secondary-container text-on-secondary-container font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-opacity-80 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> 
                <span>{copied ? 'Đã sao chép!' : 'Chia sẻ trang'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (Material Bento Style) */}
      <section className="px-6 -mt-6">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-outline-variant/10 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
            <span className="font-bold text-lg md:text-xl text-primary">42</span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Địa điểm</span>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-outline-variant/10 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
            <span className="font-bold text-lg md:text-xl text-primary">128</span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Món ăn</span>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-outline-variant/10 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
            <span className="font-bold text-lg md:text-xl text-primary">1.2k</span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Đánh giá</span>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="mt-8 border-b border-outline-variant/20 sticky top-16 z-30 bg-background/85 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex justify-around">
          <button 
            id="tab-favorites" 
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 px-4 font-bold text-xs transition-all border-b-2 cursor-pointer ${
              activeTab === 'favorites' 
                ? 'text-primary border-primary scale-102 font-extrabold' 
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Yêu thích (4)
          </button>
          <button 
            id="tab-reviews" 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-4 font-bold text-xs transition-all border-b-2 cursor-pointer ${
              activeTab === 'reviews' 
                ? 'text-primary border-primary scale-102 font-extrabold' 
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Đánh giá của tôi (15)
          </button>
          <button 
            id="tab-posts" 
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-4 font-bold text-xs transition-all border-b-2 cursor-pointer ${
              activeTab === 'posts' 
                ? 'text-primary border-primary scale-102 font-extrabold' 
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Đã đăng (8)
          </button>
        </div>
      </section>

      {/* Profile Tab Content Grid */}
      <section className="mt-6 max-w-2xl mx-auto px-1">
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Food Card 1 - Bun Cha */}
            <div 
              onClick={() => onSelectFood(FOOD_ITEMS[3])} 
              className="group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 aspect-[3/4] cursor-pointer border border-outline-variant/10"
            >
              <div className="w-full h-full overflow-hidden">
                <img 
                  referrerPolicy="no-referrer"
                  alt="Bún Chả" 
                  src={FOOD_ITEMS[3].image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-4">
                <span className="text-secondary-container flex items-center gap-1 font-bold text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.8
                </span>
                <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">Bún Chả Hà Nội - Phố Cổ</h3>
                <p className="text-white/80 text-[10px] flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-white" /> Hoàn Kiếm, Hà Nội
                </p>
              </div>
            </div>

            {/* Food Card 2 - Cafe Giang */}
            <div 
              onClick={() => onSelectFood(FOOD_ITEMS[6])} 
              className="group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 aspect-[3/4] cursor-pointer border border-outline-variant/10"
            >
              <div className="w-full h-full overflow-hidden">
                <img 
                  referrerPolicy="no-referrer"
                  alt="Cafe Giảng" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXihuFHPqCbuxWwZ6epTi3gs7oewkYdWEzxxj_yB-DWejUmK1UEDTEHZ941a8RDdPd2S8eLRSzevD9FGxpcm3E655OIm8_vTsOvXrB8yw1zkjYUx--n0YkkfYqCJyQChHAGOVxhsnQVddSwKUZBMIgX9HLnAUhOziaQWjpF_mTcHR6z2aUyxHHl6D6CJkmwWUYkIbyBRfi7JN8XjNb7wh0FYqi_Pevom09N83hXmy1MlEdVn_eFqwFe_7EjbzZucC37In9_Kzi2ZA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-4">
                <span className="text-secondary-container flex items-center gap-1 font-bold text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9
                </span>
                <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">Cafe Giảng Trứng</h3>
                <p className="text-white/80 text-[10px] flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-white" /> Nguyễn Hữu Huân, HN
                </p>
              </div>
            </div>

            {/* Food Card 3 - Pho Thin */}
            <div 
              onClick={() => onSelectFood(FOOD_ITEMS[0])} 
              className="group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 aspect-[3/4] cursor-pointer border border-outline-variant/10 col-span-2 md:col-span-1"
            >
              <div className="w-full h-full overflow-hidden">
                <img 
                  referrerPolicy="no-referrer"
                  alt="Phở Thìn" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbf_UR9KTA-Fae8Rdo9WX9c4x06Nk1qWT9q1gcME5u447fQpcNctDHyikQV6YIJNCoDbVEhJUZULnPvzc2Su6MusyOBNjjdvdLurdE6Wp4gjtXW2rmW7kXla8ggQaGKKnsAQ8EREMlinpYstDN6r2IAPLMv7lD5zE_XFZR_F5Fk-GFQy7ql1rtalgrwcrdzW0D_INm1hJjYXwZpPzaLdxubvulze1JGCrVTp8b-GDozW4xyP7Ir9a4_F83-2T-7BqMAEcZsMRXfXo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-4">
                <span className="text-secondary-container flex items-center gap-1 font-bold text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.7
                </span>
                <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">Phở Thìn Lò Đúc</h3>
                <p className="text-white/80 text-[10px] flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-white" /> Hai Bà Trưng, Hà Nội
                </p>
              </div>
            </div>

            {/* Location Card 4 - Pho Co Hoi An */}
            <div 
              onClick={() => onSelectPlace(PLACE_ITEMS[0])} 
              className="group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 aspect-[3/4] cursor-pointer border border-outline-variant/10"
            >
              <div className="w-full h-full overflow-hidden">
                <img 
                  referrerPolicy="no-referrer"
                  alt="Hội An" 
                  src={PLACE_ITEMS[0].image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-4">
                <span className="text-secondary-container flex items-center gap-1 font-bold text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 5.0
                </span>
                <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">Phố Cổ Hội An</h3>
                <p className="text-white/80 text-[10px] flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-white" /> TP. Hội An, Quảng Nam
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-xs text-center flex flex-col items-center">
            <List className="w-12 h-12 text-outline mb-3 animate-bounce" />
            <h4 className="font-bold text-xs text-on-surface">Đánh giá của bạn</h4>
            <p className="text-on-surface-variant text-[11px] mt-1">Bạn chưa viết bất kỳ bình luận hay đánh giá công khai nào qua form.</p>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-xs text-center flex flex-col items-center">
            <Activity className="w-12 h-12 text-outline mb-3 animate-pulse" />
            <h4 className="font-bold text-xs text-on-surface">Nhật ký đã đăng</h4>
            <p className="text-on-surface-variant text-[11px] mt-1">Các bài đăng cá nhân của bạn sẽ kích hoạt sau khi kiểm duyệt cộng đồng.</p>
          </div>
        )}
      </section>
    </div>
  );
}
