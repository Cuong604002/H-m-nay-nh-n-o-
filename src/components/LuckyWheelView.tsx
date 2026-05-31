import { useState, useRef, useEffect, FormEvent } from 'react';
import { Award, RotateCcw, AlertTriangle, CheckCircle2, Navigation, Trash2, Plus, CornerDownRight } from 'lucide-react';

export default function LuckyWheelView() {
  const [items, setItems] = useState([
    'Phở Bò Gia Truyền',
    'Bún Chả Cửa Bắc',
    'Bánh Mì Đặc Biệt',
    'Lẩu Thái Seafood',
    'BBQ Premium Steak',
    'Trà Đào Cam Sả',
    'Cơm Tấm Sườn Bì',
    'Bún Bò O Ninh'
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw modern clean wheel design
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 5;
    const numSlices = items.length;
    const sliceAngle = (360 / numSlices) * (Math.PI / 180);

    ctx.clearRect(0, 0, size, size);

    // Color array for neat slices
    const colors = [
      '#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D',
      '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'
    ];

    items.forEach((item, index) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, index * sliceAngle, (index + 1) * sliceAngle);
      ctx.lineTo(center, center);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Write label names vertically aligned to slices
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(index * sliceAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      
      // Limit text sizing to preserve spacing
      const name = item.length > 15 ? item.substring(0, 13) + '..' : item;
      ctx.fillText(name, radius - 15, 4);
      ctx.restore();
    });

    // Outer wheel rim circle outline
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#333333';
    ctx.stroke();

    // Center circular hub knob core
    ctx.beginPath();
    ctx.arc(center, center, 14, 0, 2 * Math.PI);
    ctx.fillStyle = '#333333';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

  }, [items]);

  const handleSpin = () => {
    if (spinning || items.length === 0) return;

    setSpinning(true);
    setPrize(null);

    // Randomize the degrees rotated (minimum 4 complete turns + random extra degrees)
    const extraAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1440 + extraAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      
      // Compute correct prize index according to deceleration degrees on standard clockwise pointing arrow
      const numSlices = items.length;
      const index = Math.floor(numSlices - ((extraAngle % 360) / (360 / numSlices))) % numSlices;
      setPrize(items[index]);
    }, 4500); // Decelerate duration
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    if (items.length >= 12) {
      alert('Để bánh xe cân đối, vui lòng không thêm quá 12 ý kiến!');
      return;
    }
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 2) {
      alert('Vòng quay cần có tối thiểu 2 món ngon!');
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-2 pb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Introduction banner */}
      <section className="text-center mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-3 text-amber-500 font-bold">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="font-headline-lg text-lg sm:text-2xl text-on-surface font-extrabold mb-1">
          Bánh Xe Số Phận: Hôm Nay Ăn Gì?
        </h2>
        <p className="text-on-surface-variant text-xs max-w-md">
          Quá nhiều lựa chọn khiến bạn đắn đo? Hãy để vòng xoay thần sầu đưa ra quyết định tối thượng hôm nay!
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
        
        {/* Physical Spin Wheel module */}
        <div className="flex flex-col items-center relative w-full pt-4">
          
          {/* Deceleration Indicator Pointing Arrow */}
          <div className="absolute top-0 z-20 flex flex-col items-center select-none">
            <Navigation className="w-10 h-10 text-primary fill-primary rotate-180 drop-shadow-sm animate-bounce" />
          </div>

          {/* Core rotating Canvas container */}
          <div className="relative mt-4">
            <div 
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4500ms cubic-bezier(0.15, 0.95, 0.3, 1)' : 'none'
              }}
              className="rounded-full shadow-2xl bg-white p-1"
            >
              <canvas 
                ref={canvasRef} 
                width={280} 
                height={280} 
                className="rounded-full overflow-hidden block w-72 h-72 sm:w-80 sm:h-80"
              />
            </div>
          </div>

          <button
            onClick={handleSpin}
            disabled={spinning || items.length === 0}
            className="mt-6 bg-primary text-on-primary px-8 py-3.5 rounded-full font-extrabold text-sm shadow-md active:scale-95 duration-150-all hover:shadow-lg hover:scale-105 disabled:opacity-50 select-none cursor-pointer flex items-center gap-1.5"
          >
            <span>{spinning ? 'Đang quay số...' : 'Quay bánh xe 🎯'}</span>
          </button>

          {/* Success Prize display wrapper */}
          {prize && (
            <div className="mt-6 bg-amber-50 border border-amber-300 rounded-2xl p-4 max-w-xs text-center shadow-xs animate-in zoom-in-95 duration-200">
              <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider">Lựa chọn của vũ trụ:</span>
              <h4 className="font-extrabold text-base text-amber-900 mt-1 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{prize}</span>
              </h4>
            </div>
          )}
        </div>

        {/* Wedges editor curation panel */}
        <div className="w-full bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-xs">
          <h3 className="font-extrabold text-xs text-on-surface uppercase tracking-wider mb-4">
            Quản lý các điểm xoay ({items.length}/12)
          </h3>

          <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Thêm món ví dụ: Bún đậu mắm tôm..." 
              className="flex-grow h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
            <button 
              type="submit"
              className="bg-primary text-on-primary px-4 rounded-xl font-bold text-xs hover:brightness-110 flex items-center gap-1 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm</span>
            </button>
          </form>

          {/* Elements list rendering with custom delete */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2.5 bg-background/50 border border-outline-variant/10 rounded-xl duration-200 hover:border-primary/20"
              >
                <span className="text-xs font-semibold text-on-surface truncate">{item}</span>
                <button 
                  onClick={() => handleDeleteItem(index)}
                  className="p-1 text-on-surface-variant hover:text-error rounded hover:bg-red-50"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
