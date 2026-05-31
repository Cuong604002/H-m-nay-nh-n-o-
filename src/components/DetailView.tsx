import { useState, FormEvent } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Phone, Heart, Share2, Compass, Send, CheckCircle2, Award, Download } from 'lucide-react';
import { FoodItem, PlaceItem } from '../types';
import { USER_AVATAR, MOCK_COMMENTS } from '../data/mockData';

interface DetailViewProps {
  item: FoodItem | PlaceItem;
  onBack: () => void;
  isFood: boolean;
}

export default function DetailView({ item, onBack, isFood }: DetailViewProps) {
  const [comments, setComments] = useState(MOCK_COMMENTS.filter(c => c.postId === 'post_1'));
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Cast properties to safe visual parameters
  const title = item.name;
  const rating = item.rating;
  const reviewsCount = item.reviewsCount || 420;
  const image = item.image;
  const area = isFood ? (item as FoodItem).location : (item as PlaceItem).location;
  const addressStr = !isFood ? (item as PlaceItem).address : `${area}, Việt Nam`;
  const desc = isFood ? (item as FoodItem).description : ((item as PlaceItem).description || 'Một trong những điểm dừng chân thư thái, đầy uy tín.');
  const detailsExtra = isFood ? `Khoảng giá: ${(item as FoodItem).priceRange}` : `Mở cửa: ${(item as PlaceItem).operatingHours}`;

  // Download detail profile
  const downloadDetail = () => {
    const content = `THÔNG TIN ĐỊA ĐIỂM (HÔM NAY ĂN GÌ?)
--------------------------------------------
Tên địa điểm: ${title}
Thể loại: ${isFood ? 'Món Ngon Tuyển Chọn' : 'Điểm Đến Thú Vị'}
Đánh giá: ${rating} ⭐️ (${reviewsCount} lượt bình chọn)
Khu vực: ${area}
Địa chỉ: ${addressStr}
Thông số chi tiết: ${detailsExtra}

Mô tả chi tiết:
${desc}

Chào mừng bạn ghé thăm tụ điểm ẩm thực và dã ngoại cùng ứng dụng "Hôm Nay Ăn Gì?".
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thong_tin_${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const submitComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newC: any = {
        id: `c_${Date.now()}`,
        postId: 'post_1',
        authorName: 'Minh Nguyễn',
        authorAvatar: USER_AVATAR,
        timeAgo: 'Vừa xong',
        content: commentText
      };
      setComments([...comments, newC]);
      setCommentText('');
      setSubmitting(false);
    }, 450);
  };

  return (
    <div className="pt-2 pb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Navigation and Actions Row */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 p-2 bg-white rounded-full border border-outline-variant/35 text-on-surface hover:text-primary active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs font-bold px-1">Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLiked(!liked)}
            className={`p-2.5 rounded-full border border-outline-variant/35 bg-white transition-all duration-300 ${
              liked ? 'text-primary scale-110' : 'text-on-surface-variant'
            }`}
            title="Yêu thích"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-primary' : ''}`} />
          </button>
          <button 
            onClick={downloadDetail}
            className="p-2.5 rounded-full border border-outline-variant/35 bg-white text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center cursor-pointer active:scale-95"
            title="Tải thông tin địa điểm này"
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={() => alert('Đã sao chép liên kết chia sẻ địa điểm!')}
            className="p-2.5 rounded-full border border-outline-variant/35 bg-white text-on-surface-variant hover:text-primary transition-colors"
            title="Chia sẻ"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Image Block */}
      <section className="relative rounded-3xl overflow-hidden aspect-video shadow-md mb-6 max-h-96 w-full">
        <img 
          referrerPolicy="no-referrer"
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-white text-[10px] font-bold uppercase py-0.5 px-2.5 rounded-full">
              {isFood ? 'Món ngon tuyển chọn' : 'Điểm đến thú vị'}
            </span>
          </div>
          <h2 className="text-white font-black text-lg md:text-2xl drop-shadow-sm leading-tight">{title}</h2>
          <p className="text-white/80 text-xs md:text-sm mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-white" />
            <span>{addressStr}</span>
          </p>
        </div>
      </section>

      {/* Details Core Content Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card Overlook Info */}
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-xs">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-1.5 text-secondary">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-sm text-on-surface">{rating}</span>
                <span className="text-xs text-on-surface-variant">({reviewsCount} đánh giá)</span>
              </div>
              <span className="text-teal-600 font-bold text-xs bg-teal-50 px-2.5 py-1 rounded-lg">Đang hoạt động</span>
            </div>

            <h3 className="font-bold text-xs text-on-surface-variant uppercase tracking-wider mb-2">Giới thiệu tổng quan</h3>
            <p className="text-on-surface text-xs md:text-sm leading-relaxed">{desc}</p>
          </div>

          {/* Interactive Comments-Reviews board */}
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-xs">
            <h3 className="font-extrabold text-sm text-on-surface mb-4 flex items-center gap-1.5 border-b border-outline-variant/20 pb-3">
              <span>Bình luận đánh giá khách hàng</span>
              <span className="text-primary text-[10px] bg-primary/10 px-2 py-0.5 rounded-full font-bold">{comments.length}</span>
            </h3>

            {/* Submit Comment mini-form */}
            <form onSubmit={submitComment} className="flex gap-2 items-center mb-6">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chia sẻ nhận xét hoặc trải nghiệm của riêng bạn..."
                className="flex-grow h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
              <button 
                type="submit"
                disabled={submitting || !commentText.trim()}
                className="h-10 px-4 bg-primary text-on-primary font-bold text-xs rounded-xl flex items-center gap-1 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-outline-variant/10 last:border-0 pb-3 flex gap-3">
                  <img src={comment.authorAvatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-xs border" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-on-surface">{comment.authorName}</h4>
                      <span className="text-[9px] text-on-surface-variant">{comment.timeAgo}</span>
                    </div>
                    <p className="text-on-surface text-xs leading-relaxed mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Side Panel (Static map simulation and specs) */}
        <div className="md:col-span-1 space-y-6">
          
          <div className="bg-white p-4 rounded-3xl border border-outline-variant/10 shadow-xs space-y-4">
            <h3 className="font-extrabold text-xs text-on-surface uppercase tracking-wider">Thông tin dịch vụ</h3>
            
            <div className="space-y-3 font-semibold text-xs text-on-surface-variant">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-on-surface font-bold text-[11px] block">{isFood ? 'Giá bình quân' : 'Giờ hoạt động'}</span>
                  <span className="text-[11px]">{detailsExtra}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-on-surface font-bold text-[11px] block">Vị trí tương quan</span>
                  <span className="text-[11px]">{isFood ? (item as FoodItem).distance || '1.1 km' : 'Công viên sáng'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-on-surface font-bold text-[11px] block">Đường dây nóng</span>
                  <span className="text-[11px]">091 123 4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulating static vector map background */}
          <div className="rounded-3xl overflow-hidden border border-outline-variant/15 shadow-sm relative h-48 group">
            <img 
              referrerPolicy="no-referrer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU0oOl9uGjpMbsfkRtoKrsmVKzeM8DIqF_dRzzfhVsFylnOOx7iL1C-60wMqI2D32HgXKYbaq8VKasp6Z2lWuVkLmXPhU5p8GtVDonby7vZCX40pjKzb6kEQyU6yP8lpaJepPbuSCq-SWyc9HhemYowmgkJRIU6GaskTYncgOvyQkr_MrKo6cN52wAUG0g_Zxeleg1Ei6Kl2U-tSqCCfuooYpzsYR7diM28N0PgSzn4t5obfvxOzmTxwHA_MlVzTAl6lrXFBjofS4"
              alt="Google Map Mockup" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs p-3 text-center text-white text-[10px] font-bold uppercase tracking-wider">
              Chỉ đường bằng bản đồ 📍
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
