import { useState } from 'react';
import { Sparkles, Calendar, DollarSign, Clock, MapPin, Users, Star, Utensils, ArrowRight, Play, Compass, Award, Download } from 'lucide-react';
import { ViewState } from '../types';

interface SuggestViewProps {
  onViewChange: (view: ViewState) => void;
}

export default function SuggestView({ onViewChange }: SuggestViewProps) {
  const [budget, setBudget] = useState('Dưới 200k');
  const [timeAvailable, setTimeAvailable] = useState('Cả ngày');
  const [area, setArea] = useState('Quận 1');
  const [companion, setCompanion] = useState('Đi một mình');
  const [loading, setLoading] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  // Download schedule as a clean text file
  const downloadItinerary = () => {
    const content = `LỊCH TRÌNH ĐỀ XUẤT CHO BẠN (HÔM NAY ĂN GÌ?)
--------------------------------------------
Tham số tìm kiếm:
- Ngân sách: ${budget}
- Thời gian: ${timeAvailable}
- Khu vực: ${area}
- Đi cùng: ${companion}

Chi tiết lịch trình đề xuất:

1. [08:00] Thức Coffee & Chill
   - Thể loại: Khởi đầu nhẹ nhàng
   - Vị trí: 1.2km • ${area === 'Gần đây' ? 'Quận 1' : area}
   - Đánh giá: 4.8 ⭐️
   - Chi tiết: Một không gian yên tĩnh với cà phê đặc sản rang xay tại chỗ, giúp bạn tỉnh táo để bắt đầu ngày mới.

2. [11:30] Nhà Hàng Bếp Mẹ
   - Thể loại: Năng lượng trưa
   - Đánh giá: 4.5 ⭐️
   - Chi tiết: Thưởng thức hương vị cơm nhà truyền thống trong không gian hiện đại, ấm cúng phù hợp cho ${companion.toLowerCase()}.
   - Chi phí ước tính: 150k - 250k

3. [14:00] Galaxy Premium Cinema
   - Thể loại: Giải trí cực đỉnh
   - Chi tiết: Trải nghiệm những bộ phim bom tấn mới nhất với hệ thống âm thanh vòm Dolby Atmos và ghế ngồi thương gia.
   - Vé: 120k / Vé

4. [18:30] The Rooftop Lounge - Fine Dining (Gợi ý đặc biệt ✨)
   - Thể loại: View 360° Trọn vẹn thành phố từ tầng cao
   - Chi tiết: Kết thúc ngày dài bằng một bữa tối lãng mạn dưới ánh nến và ngắm nhìn toàn cảnh thành phố quận 1 từ tầng cao.

Chúc bạn có một ngày trải nghiệm tuyệt vời cùng "Hôm Nay Ăn Gì?"!
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lich_trinh_${area.replace(/\s+/g, '_')}_ai.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate dynamic timelines depending on options
  const handleGenerate = () => {
    setLoading(true);
    setShowTimeline(false);
    setTimeout(() => {
      setLoading(false);
      setShowTimeline(true);
    }, 1200);
  };

  return (
    <div className="pt-2 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Hero Section Form */}
      <section className="relative mb-12">
        <div className="absolute inset-0 bg-secondary-container/5 rounded-3xl -z-10 magic-shimmer" />
        <div className="p-6 md:p-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="font-headline-lg text-xl md:text-2xl text-on-background font-extrabold max-w-lg mb-2">
            Khám phá ngày mới của bạn ✨
          </h2>
          <p className="text-on-surface-variant text-xs md:text-sm max-w-xl mb-8">
            Chỉ cần vài thông tin nhỏ, AI sẽ thiết kế riêng cho bạn một lịch trình hoàn hảo nhất hôm nay.
          </p>

          {/* Form Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
            {/* Budget */}
            <div className="flex flex-col text-left">
              <label className="font-semibold text-xs mb-1.5 text-on-surface-variant flex items-center gap-1.5 select-none">
                <DollarSign className="w-4 h-4 text-secondary" />
                <span>Ngân sách (VNĐ)</span>
              </label>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-11 px-3 py-2 bg-background border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-xs text-on-surface cursor-pointer"
              >
                <option value="Dưới 200k">Dưới 200k</option>
                <option value="200k - 500k">200k - 500k</option>
                <option value="500k - 1tr">500k - 1tr</option>
                <option value="Sang chảnh">Sang chảnh 💎</option>
              </select>
            </div>

            {/* Time */}
            <div className="flex flex-col text-left">
              <label className="font-semibold text-xs mb-1.5 text-on-surface-variant flex items-center gap-1.5 select-none">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Thời gian rảnh</span>
              </label>
              <select 
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
                className="w-full h-11 px-3 py-2 bg-background border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-xs text-on-surface cursor-pointer"
              >
                <option value="Cả ngày">Cả ngày</option>
                <option value="Buổi sáng">Buổi sáng</option>
                <option value="Buổi tối">Buổi tối</option>
                <option value="Chỉ 2-3 tiếng">Chỉ 2-3 tiếng</option>
              </select>
            </div>

            {/* Area */}
            <div className="flex flex-col text-left">
              <label className="font-semibold text-xs mb-1.5 text-on-surface-variant flex items-center gap-1.5 select-none">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Khu vực</span>
              </label>
              <select 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-11 px-3 py-2 bg-background border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-xs text-on-surface cursor-pointer"
              >
                <option value="Quận 1">Quận 1</option>
                <option value="Quận 3">Quận 3</option>
                <option value="Quận 7">Quận 7</option>
                <option value="Hồ Tây, HN">Hồ Tây, HN</option>
                <option value="Gần đây">Gần đây 📍</option>
              </select>
            </div>

            {/* Companion */}
            <div className="flex flex-col text-left">
              <label className="font-semibold text-xs mb-1.5 text-on-surface-variant flex items-center gap-1.5 select-none">
                <Users className="w-4 h-4 text-secondary" />
                <span>Đi cùng ai?</span>
              </label>
              <select 
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
                className="w-full h-11 px-3 py-2 bg-background border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-xs text-on-surface cursor-pointer"
              >
                <option value="Đi một mình">Đi một mình</option>
                <option value="Hẹn hò Couple">Hẹn hò Couple 👩‍❤️‍👨</option>
                <option value="Gia đình">Gia đình</option>
                <option value="Nhóm bạn">Nhóm bạn</option>
              </select>
            </div>
          </div>

          <button 
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="mt-6 bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-md active:scale-95 duration-150 transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gợi ý ngay cho tôi</span>
          </button>
        </div>
      </section>

      {/* Loading state spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-on-surface font-semibold text-sm">AI đang may đo lịch trình hoàn hảo cho bạn...</p>
          <p className="text-on-surface-variant text-xs mt-1">Dựa trên các tham số: {budget}, {timeAvailable}, {area}</p>
        </div>
      )}

      {/* Recommended Timeline display */}
      {showTimeline && (
        <section className="max-w-2xl mx-auto mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-outline-variant/20 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-secondary-container" />
              <h3 className="font-bold text-xs sm:text-sm text-on-surface uppercase tracking-wide">Lịch trình AI đề xuất cho bạn</h3>
            </div>
            
            <button
              onClick={downloadItinerary}
              className="flex items-center justify-center gap-1.5 bg-primary/10 text-primary border border-primary/25 hover:bg-primary hover:text-white px-4 py-2 rounded-full font-extrabold text-xs cursor-pointer active:scale-95 transition-all duration-200 select-none shadow-xs"
              title="Tải kế hoạch này về thiết bị"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Tải lịch trình về máy</span>
            </button>
          </div>

          <div className="relative pl-8 sm:pl-20 space-y-12">
            {/* Timeline Vertical dashed line */}
            <div className="absolute left-[39px] sm:left-[87px] top-4 bottom-4 w-1 timeline-line opacity-30 bg-primary" />

            {/* Timeline Item 1 - 08:00 */}
            <div className="relative group">
              <div className="absolute -left-10 sm:-left-24 top-0 flex flex-col items-center select-none text-center">
                <span className="font-extrabold text-primary text-sm">08:00</span>
                <div className="w-5 h-5 rounded-full bg-secondary-container border-4 border-background z-10 shadow-xs group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/80 border border-outline-variant/10 p-4 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 shadow-xs">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJenATJluPAIa3Zjj1DF6OXvpfj62RE9KzwB1jaK8WYxMNf_iIZ43GqpX3I2-BUtb7kZpQqvq-ir7loCB4fS8owGpqJ1DJVVinP1j7jl_CCmr98cNEJuh1GsfMkt9E9v9MlTa20HM_izlC0JF_yLJH593pqNvewYpNHYEsiQ_CXpEBBlKVudH46nOglOtajBCP6vgX8dE9TyUMmsjfdS25x7STU-83WklNtMhJb7e1uz4ofPvlrsUG8KaTXuo4-_P6HvbxQ4YQ1h8" 
                    alt="Coffee"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-fit bg-secondary-container/20 text-on-secondary-container text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2">
                    Khởi đầu nhẹ nhàng
                  </span>
                  <h4 className="font-bold text-sm text-on-surface">Thức Coffee &amp; Chill</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Một không gian yên tĩnh với cà phê đặc sản rang xay tại chỗ, giúp bạn tỉnh táo để bắt đầu ngày mới.</p>
                  <div className="flex items-center gap-3 mt-3 text-on-surface-variant text-[11px] font-semibold">
                    <span className="flex items-center gap-0.5 text-secondary"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.8</span>
                    <span>•</span>
                    <span>📍 1.2km • {area === 'Gần đây' ? 'Quận 1' : area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 - 11:30 */}
            <div className="relative group">
              <div className="absolute -left-10 sm:-left-24 top-0 flex flex-col items-center select-none text-center">
                <span className="font-extrabold text-primary text-sm">11:30</span>
                <div className="w-5 h-5 rounded-full bg-secondary-container border-4 border-background z-10 shadow-xs group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/80 border border-outline-variant/10 p-4 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 shadow-xs">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpkjDpsDiiD6LbPegztwQn9N5UwMR8gDBZDq-49-LbVSkR9K7fzQ0rP6V7Eldq0Efr13iAhaJamGAX7aIF8OmvRFaP9-NuH5yOpU_Xl-FKN2PKNqNzAeN-2HbxMNJ70GLxmsnKzsyod8xdpN5xmqkDA8A_SDEuzhEYP4Lgx4vhqP-eUgBFmG4ihhn_xHqf1BqmZfcfXkoC6-fE7C6bXJJ6lRxkHXxm1WG6hLLMHNvCNqz9DiARMzRjCmPpoLLdOzPEzVfon_wxdcY" 
                    alt="Lunch spread"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-fit bg-primary-container/15 text-on-primary-container text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2">
                    Năng lượng trưa
                  </span>
                  <h4 className="font-bold text-sm text-on-surface">Nhà Hàng Bếp Mẹ</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Thưởng thức hương vị cơm nhà truyền thống trong không gian hiện đại, ấm cúng phù hợp cho {companion.toLowerCase()}.</p>
                  <div className="flex items-center gap-3 mt-3 text-on-surface-variant text-[11px] font-semibold">
                    <span className="flex items-center gap-0.5 text-secondary"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.5</span>
                    <span>•</span>
                    <span>💵 150k - 250k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 - 14:00 */}
            <div className="relative group">
              <div className="absolute -left-10 sm:-left-24 top-0 flex flex-col items-center select-none text-center">
                <span className="font-extrabold text-primary text-sm">14:00</span>
                <div className="w-5 h-5 rounded-full bg-secondary-container border-4 border-background z-10 shadow-xs group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/80 border border-outline-variant/10 p-4 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 shadow-xs">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJzX1D49_-ZjtXqqPKnQB2R0qhCKNRwm21AeDYgnFn-dcxVidmn1exyn1TyNcp0s2ehYbCJNnpHbAt40NYUzSCmDrhPSM62bCOJlRkU1SmhwHpGPurullx_mlA8_yr48q7OtcE4QuXqEvWobPHEduLDmJxgc9v-cNUo4OAdzQMNoF-rNLll0KpO59-cMMHL8Ov3874r-yuzriESG1z6JPs8ksiWh-fh0E1WKpCT9NGlLT1bkDV0K8SF-9M-Dp20sBFllYcOa3iWHk" 
                    alt="Theater space"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-fit bg-teal-500/15 text-teal-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2">
                    Giải trí cực đỉnh
                  </span>
                  <h4 className="font-bold text-sm text-on-surface">Galaxy Premium Cinema</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Trải nghiệm những bộ phim bom tấn mới nhất với hệ thống âm thanh vòm Dolby Atmos và ghế ngồi thương gia.</p>
                  <div className="flex items-center gap-3 mt-3 text-on-surface-variant text-[11px] font-semibold">
                    <span>🎬 Phim mới</span>
                    <span>•</span>
                    <span>🎟️ 120k / Vé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Item 4 - 18:30 */}
            <div className="relative group">
              <div className="absolute -left-10 sm:-left-24 top-0 flex flex-col items-center select-none text-center">
                <span className="font-extrabold text-primary text-sm">18:30</span>
                <div className="w-5 h-5 rounded-full bg-secondary-container border-4 border-background z-10 shadow-xs group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 shadow-xs">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhccihUrUbdmtNRnxuV7hRACIBKUsxmfmY3sBUIBUgEP-USJAjDfjuEhC9dJRD50qlJh_jYE6Xg2jF6VXPisPpTw69zs_gU3DhGHfOmiA-tk34BKY9s2OTxOKGjPzuLsZFJ74pDA_bH3GWx7lAHLGOdSof88gKvG4ntnt5C8jCOfYrDGPCi-Evv__FI7MXZ06uuWuCD42dSid2SePugcchUSed8OMz2QP6Qt0OSQy_4tftTgc8cq7CUXgLlZsLsXpcEs4CWWCNDLc" 
                    alt="Rooftop dinner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-fit bg-secondary-container text-on-secondary-container text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>Gợi ý đặc biệt ✨</span>
                  </span>
                  <h4 className="font-bold text-sm text-on-surface">The Rooftop Lounge - Fine Dining</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Kết thúc ngày dài bằng một bữa tối lãng mạn dưới ánh nến và ngắm nhìn toàn cảnh thành phố quận 1 từ tầng cao.</p>
                  <div className="flex items-center gap-3 mt-3 text-on-surface-variant text-[11px] font-semibold">
                    <span>🍷 Fine Dining</span>
                    <span>•</span>
                    <span>🌙 View 360° Trọn vẹn</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
}
