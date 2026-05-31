import { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Eye, MessageSquare, Map, Flame, TrendingUp, Reply, Flag, CornerDownRight } from 'lucide-react';
import { FOOD_ITEMS, PLACE_ITEMS, MOCK_COMMENTS } from '../data/mockData';

interface ContentManagementViewProps {
  onBackToProfile: () => void;
}

export default function ContentManagementView({ onBackToProfile }: ContentManagementViewProps) {
  const [foods, setFoods] = useState([
    {
      id: 'm1',
      name: 'Bún Chả Hà Nội Truyền Thống',
      description: 'Hương vị đậm đà, thịt nướng thơm nồng than hoa.',
      tag: 'Ẩm thực miền Bắc',
      status: 'approved',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkoibr5VpH-A6xpXIANTFGO_ETF8-EBATdc2Gj_z-eYJKBU7h38wvp7QEcAAeMuTb_Qk4ToqcyQ2TJRUcgeBSVdPCGImwoumT-NrrqHBw8zZp9SvtYR_ZQqqcR-7ENEqw-aMccJi6R1XzAvASi_IOt1LDImo2oBTUYTJQ262TVqRLhUb_M_gz2Q9FKCRGhTYhk-RmgrqqX4pN0vF3eTMzyq-M-DrD8xOP8jJMK0cDUCNYCIzPTQ5QbyKUu2PRB5Wf9XAz_FFOnIk8'
    },
    {
      id: 'm2',
      name: 'Phở Bò Gốc Cây Sữa',
      description: 'Nước dùng ngọt thanh xương hầm 12 tiếng.',
      tag: 'Món nước',
      status: 'pending',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZoPwn4UrCeBh-6_XGKlgfHJ4D4Ql2Fgx9sfyRRnwc1kFC3z0KIl5N3lnOpDT8cZHG4scm_IAic8rFm4ct9rcg1RdpsVUbagOAdcl7reD7U6eFuajg-36ZuFq79BWpvDqLhM8y0AeOxWw1CRN0E4GAQOBG4jn5eVv_sApc1_VOKi1hl9L3ifj6DtJhuNvyiqL_b9j0j2MR_akTAGW9mtrB1J8uFYJHmkYmgNmKQPj3AVdHNV3J5wCHmMtnOHf2PcpHzHSAoaBLDdU'
    }
  ]);

  const [places, setPlaces] = useState([
    {
      id: 'pl1',
      name: 'Đỉnh Tà Xùa - Săn mây',
      location: 'Sơn La, Việt Nam',
      rating: 4.8,
      reviews: '1.2k',
      date: '24/10/2023',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPFtbYI8v8F-K1xJfDItUic0VlDaB5bLms_WeO_20Ba92SSAKd1iYFzwbT2WD2ubddPVeGXP7HOzsR9dRZgPXQyajELRpDlCPG8VHDv_YyMzVZ589r16TwBfkFazjHn0fj8Xxcj5rvzNm-ruHvQPKaCAR2JJnMro1Z0efrU0XH1j5icLc_JGWsBF5fobDjXQ2UFZOA5vtstnInd-hB9pNVV7l_bBssfRqKdRHAZDEwMR9h2j1oLn2cq0lylrxZ0b33cwq8lcgl7iE'
    },
    {
      id: 'pl2',
      name: 'Cà phê Rooftop - View Hồ Tây',
      location: 'Hà Nội, Việt Nam',
      rating: 4.5,
      reviews: '860',
      date: '15/10/2023',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VYjct7URnedVRxqq9WMmjW6uxw4JZIiGIFt9MlB8TSVcHeDijEwY5ewbKp0NGkcpybY2mPpyuH0hACtpmRikbNPAz8mUDacIibkmYPKJ0-9KAADxXV984cnH-PGxnBRRoP0hyRETlzt8nXVUXpQ_G28kxQu5pA0lj2TfBanPOv7C1UQjH_lgJ_n3PUN91BG3rCifX0R25JU-TdZqISsqB-9EMjqzIxSM-O8XMHe9v-3CM_lpxdazdlARyR_dE5xeYDZ3T2fgyc4'
    }
  ]);

  const [comments, setComments] = useState([
    {
      id: 'cm1',
      authorName: 'An Nguyễn',
      timeAgo: 'vừa mới đây',
      content: '"Món bún chả này nhìn ngon quá, địa chỉ ở đâu vậy bạn?"',
      parentTopic: 'Phản hồi Bún Chả Hà Nội...'
    },
    {
      id: 'cm2',
      authorName: 'Minh Tú',
      timeAgo: '10 phút trước',
      content: '"View ở đây đẹp thật, cuối tuần mình sẽ ghé thử."',
      parentTopic: 'Phản hồi Cà phê Rooftop...'
    },
    {
      id: 'cm3',
      authorName: 'Khánh Huyền',
      timeAgo: '1 giờ trước',
      content: '"Mình mới đi Tà Xùa về, mây đẹp đúng như bạn kể."',
      parentTopic: 'Phản hồi Đỉnh Tà Xùa...'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'food' | 'place' | 'comment'>('all');
  const [editingItem, setEditingItem] = useState<{ type: 'food' | 'place'; id: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // States for new item creation
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemTag, setNewItemTag] = useState('');

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  const handleDeletePlace = (id: string) => {
    setPlaces(places.filter(p => p.id !== id));
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleAddNewItem = () => {
    if (!newItemName.trim()) return;

    if (newItemTag === 'place') {
      setPlaces([
        {
          id: `pl_${Date.now()}`,
          name: newItemName,
          location: 'Việt Nam',
          rating: 5.0,
          reviews: '1',
          date: 'Hôm nay',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VYjct7URnedVRxqq9WMmjW6uxw4JZIiGIFt9MlB8TSVcHeDijEwY5ewbKp0NGkcpybY2mPpyuH0hACtpmRikbNPAz8mUDacIibkmYPKJ0-9KAADxXV984cnH-PGxnBRRoP0hyRETlzt8nXVUXpQ_G28kxQu5pA0lj2TfBanPOv7C1UQjH_lgJ_n3PUN91BG3rCifX0R25JU-TdZqISsqB-9EMjqzIxSM-O8XMHe9v-3CM_lpxdazdlARyR_dE5xeYDZ3T2fgyc4'
        },
        ...places
      ]);
    } else {
      setFoods([
        {
          id: `m_${Date.now()}`,
          name: newItemName,
          description: newItemDesc || 'Hương vị tuyệt hảo xao xuyến giác quan.',
          tag: 'Món nước',
          status: 'pending',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZoPwn4UrCeBh-6_XGKlgfHJ4D4Ql2Fgx9sfyRRnwc1kFC3z0KIl5N3lnOpDT8cZHG4scm_IAic8rFm4ct9rcg1RdpsVUbagOAdcl7reD7U6eFuajg-36ZuFq79BWpvDqLhM8y0AeOxWw1CRN0E4GAQOBG4jn5eVv_sApc1_VOKi1hl9L3ifj6DtJhuNvyiqL_b9j0j2MR_akTAGW9mtrB1J8uFYJHmkYmgNmKQPj3AVdHNV3J5wCHmMtnOHf2PcpHzHSAoaBLDdU'
        },
        ...foods
      ]);
    }

    setNewItemName('');
    setNewItemDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="pt-2 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header and Back nav */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-black">Quản lý nội dung</h2>
          <p className="text-on-surface-variant text-xs">Theo dõi và chỉnh sửa các bài đăng của bạn tại đây.</p>
        </div>
        <button 
          onClick={onBackToProfile}
          className="bg-surface hover:bg-surface-container border border-outline-variant/30 text-on-surface font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          Quay lại Hồ sơ
        </button>
      </div>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Foods count */}
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 hover:bg-surface-container-low transition-colors">
          <span className="text-on-surface-variant text-xs font-semibold">Món ăn đã đăng</span>
          <div className="flex items-end justify-between">
            <span className="text-xl md:text-2xl font-black text-primary leading-none">{foods.length}</span>
            <span className="text-primary text-xl font-bold">📂</span>
          </div>
        </div>

        {/* Places count */}
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 hover:bg-surface-container-low transition-colors">
          <span className="text-on-surface-variant text-xs font-semibold">Địa điểm của bạn</span>
          <div className="flex items-end justify-between">
            <span className="text-xl md:text-2xl font-black text-tertiary leading-none">{places.length}</span>
            <span className="text-tertiary text-xl">🗺️</span>
          </div>
        </div>

        {/* Comments count */}
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 hover:bg-surface-container-low transition-colors">
          <span className="text-on-surface-variant text-xs font-semibold">Bình luận phản hồi</span>
          <div className="flex items-end justify-between">
            <span className="text-xl md:text-2xl font-black text-secondary leading-none">{comments.length}</span>
            <span className="text-secondary text-xl">💬</span>
          </div>
        </div>

        {/* Views count */}
        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 shadow-sm flex flex-col justify-between h-28 hover:bg-primary/10 transition-colors">
          <span className="text-primary font-bold text-xs">Tổng số lượt xem</span>
          <div className="flex items-end justify-between text-primary">
            <span className="text-xl md:text-2xl font-black leading-none">2.4k</span>
            <TrendingUp className="w-6 h-6 shrink-0" />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6">
        <button 
          onClick={() => setSelectedFilter('all')}
          className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
            selectedFilter === 'all' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          Tất cả danh sách
        </button>
        <button 
          onClick={() => setSelectedFilter('food')}
          className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
            selectedFilter === 'food' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          Món ăn ({foods.length})
        </button>
        <button 
          onClick={() => setSelectedFilter('place')}
          className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
            selectedFilter === 'place' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          Địa điểm ({places.length})
        </button>
        <button 
          onClick={() => setSelectedFilter('comment')}
          className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
            selectedFilter === 'comment' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          Ý kiến cộng đồng ({comments.length})
        </button>
      </section>

      {/* Main lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column (Foods and Places Curation lists) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Foods Section */}
          {(selectedFilter === 'all' || selectedFilter === 'food') && (
            <section className="bg-white/80 p-6 rounded-3xl border border-outline-variant/10 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-primary flex items-center gap-1">🍜 Món ăn của tôi</h3>
                <button 
                  onClick={() => {
                    setNewItemTag('food');
                    setShowAddModal(true);
                  }}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Thêm món mới
                </button>
              </div>

              {foods.length > 0 ? (
                <div className="space-y-3">
                  {foods.map((food) => (
                    <div 
                      key={food.id}
                      className="bg-background/40 p-3.5 rounded-2xl border border-outline-variant/10 flex gap-3 h-28 items-center duration-300 hover:shadow-xs hover:border-primary/30"
                    >
                      <img src={food.image} alt={food.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-xs text-on-surface truncate">{food.name}</h4>
                        <p className="text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">{food.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                            {food.tag}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
                            food.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {food.status === 'approved' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            <span>{food.status === 'approved' ? 'Đã duyệt' : 'Đang duyệt'}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-1 shrink-0">
                        <button 
                          onClick={() => {
                            if (window.confirm('Chức năng sửa thông tin sẽ khả dụng ở lượt cập nhật tới!')) {}
                          }}
                          className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteFood(food.id)}
                          className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-on-surface-variant text-xs font-semibold">Chưa có món ăn nào được thêm.</p>
              )}
            </section>
          )}

          {/* Places Section */}
          {(selectedFilter === 'all' || selectedFilter === 'place') && (
            <section className="bg-white/80 p-6 rounded-3xl border border-outline-variant/10 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-tertiary flex items-center gap-1">📍 Địa điểm dã ngoại</h3>
                <button 
                  onClick={() => {
                    setNewItemTag('place');
                    setShowAddModal(true);
                  }}
                  className="bg-tertiary/10 hover:bg-tertiary/20 text-tertiary px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Thêm điểm mới
                </button>
              </div>

              {places.length > 0 ? (
                <div className="space-y-3">
                  {places.map((place) => (
                    <div 
                      key={place.id}
                      className="bg-background/40 p-3.5 rounded-2xl border border-outline-variant/10 flex gap-3 h-28 items-center duration-300 hover:shadow-xs hover:border-tertiary/30"
                    >
                      <img src={place.image} alt={place.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-xs text-on-surface truncate">{place.name}</h4>
                        <p className="text-on-surface-variant text-[11px] mt-0.5">{place.location}</p>
                        <div className="flex gap-4 mt-2 text-[11px] font-semibold text-on-surface-variant">
                          <span className="flex items-center gap-0.5 text-secondary">
                            ★ {place.rating} ({place.reviews})
                          </span>
                          <span>Đăng ngày: {place.date}</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-1 shrink-0">
                        <button 
                          onClick={() => {
                            if (window.confirm('Chức năng sửa thông tin sẽ khả dụng ở lượt cập nhật tới!')) {}
                          }}
                          className="p-1.5 text-on-surface-variant hover:text-tertiary rounded-lg hover:bg-surface-container"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePlace(place.id)}
                          className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-on-surface-variant text-xs font-semibold">Chưa có địa điểm nào được thêm.</p>
              )}
            </section>
          )}

        </div>

        {/* Right column (Recent comments and reviews) */}
        <div className="lg:col-span-1">
          {(selectedFilter === 'all' || selectedFilter === 'comment') && (
            <section className="bg-white/80 p-6 rounded-3xl border border-outline-variant/10 shadow-xs flex flex-col gap-4">
              <h3 className="font-extrabold text-sm text-secondary flex items-center gap-1 border-b border-outline-variant/20 pb-2">
                <span>💬 Bình luận mới</span>
              </h3>

              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-outline-variant/15 last:border-0 pb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs select-none">
                            {comment.authorName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-on-surface">{comment.authorName}</h4>
                            <p className="text-[9px] text-on-surface-variant">{comment.timeAgo}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button 
                            onClick={() => {
                              const replField = window.prompt(`Trả lời bình luận của ${comment.authorName}:`);
                              if (replField) {
                                alert(`Đã gửi phản hồi: "${replField}"`);
                              }
                            }}
                            className="p-1 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded"
                            title="Reply"
                          >
                            <Reply className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-1 text-on-surface-variant hover:text-error hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-on-surface text-xs leading-relaxed italic">{comment.content}</p>
                      <span className="text-[10px] font-bold text-primary block mt-1.5 flex items-center gap-0.5">
                        <CornerDownRight className="w-3.5 h-3.5" />
                        <span>{comment.parentTopic}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-on-surface-variant text-xs font-semibold">Chưa nhận được phản hồi nào.</p>
              )}
            </section>
          )}
        </div>

      </div>

      {/* Simple Input Modal Popup to Add New Items */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-sm text-primary flex items-center gap-1 border-b border-outline-variant/20 pb-2">
              <span>➕ Thêm mới {newItemTag === 'food' ? 'món ăn ngon' : 'địa điểm du ngoạn'}</span>
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-on-surface-variant block mb-1">Tên gọi</label>
                <input 
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={newItemTag === 'food' ? "Ví dụ: Nem Lụi Sả Ớt..." : "Ví dụ: Đồi Chè Trái Tim..."}
                  className="w-full h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs"
                />
              </div>

              {newItemTag === 'food' && (
                <div>
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block mb-1">Mô tả ngắn</label>
                  <input 
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Mùi thơm, thịt mềm xao xuyến rạo rực..."
                    className="w-full h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-outline text-on-surface font-semibold text-xs rounded-xl"
              >
                Hủy
              </button>
              <button 
                type="button"
                onClick={handleAddNewItem}
                className="flex-1 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:brightness-110 shadow-xs"
              >
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
