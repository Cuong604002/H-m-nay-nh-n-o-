import { useState, useMemo, FormEvent } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, Star, Plus, Film, Image as ImageIcon, Send } from 'lucide-react';
import { MOCK_POSTS, USER_AVATAR } from '../data/mockData';
import { Post, Comment } from '../types';

interface CommunityViewProps {
  onNewPostClick?: () => void;
}

export default function CommunityView({ onNewPostClick }: CommunityViewProps) {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'food' | 'location' | 'near_by'>('all');
  const [showAddPost, setShowAddPost] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState<'food' | 'location'>('food');

  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'all') return posts;
    return posts.filter(p => p.category === selectedFilter);
  }, [posts, selectedFilter]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: p.likes + (isLiked ? 1 : -1)
        };
      }
      return p;
    }));
  };

  const submitPost = (e: FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorName: 'Minh Nguyễn',
      authorAvatar: USER_AVATAR,
      timeAgo: 'Vừa mới đăng',
      location: 'Sài Gòn',
      content: newContent,
      rating: newRating,
      image: newCategory === 'food' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZz3vURMZj9z9nfzjP_L_cInXttpm-5KT2wmrqv7cXmtX7QTGxZJpq1G111TADmPGuVGtbGhW4O4Do11RyzHr_OJ2wwtFpfPpnJX-4ouyI62rC0LIVhhIESEgfRTbASHXo8eSMHF2e5EeoXfnUAzigP4LGuyIjiCpn7-gBKmqYurYdemTYPgvLwVaZtWW-ShKlBmxox1_zOXC-zsdpGhM4521ZvQYYGyXHFOo_wC3RUrHVKGhVbk1tZVYFM4IkmS4sXZpoM2xI73o'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN78bPEXyYG-S6eMyP67-i-XSSrlC9AOft5Z9Kr7RYvjJ-bv0204IcfifTMGNqiOxv5ByX337q_ujq_516YeIx9SCrXtL92wO2sbriQHnQEszoQLKo1VR3CMHQ1KAWF4_SNWUjQiO79tq2vlvBqEvcUY0rOr9wrb7FNfpSfmBsGki9qWGOkQzrqYoTg0dr6dc72lsop2nW1RHyNKL4f1JTuDBvPmOgWul4Zj_NplxusJIpSmS6CWKDwoSIKC-tnhoAkwgJaoGUUnk',
      likes: 0,
      commentsCount: 0,
      category: newCategory,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setShowAddPost(false);
  };

  return (
    <div className="pt-2 pb-12 max-w-[640px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Story / Discover Row */}
      <section className="flex overflow-x-auto gap-4 py-2 hide-scrollbar mb-4 select-none">
        {/* Discover banner */}
        <div className="flex-shrink-0 w-28 h-40 relative rounded-2xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer">
          <img 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO5gdb4BB-UCwBdYsexitknGkZrr5w7xzrOwZlFM5f2-EoynzUp3wKC7Ynvlc63A-pn7j8BHqzCC3LAUwGlg3TZvzNHhiuyOIMhJX7NpN3a8JxAgsbpKQD8UrV1n2n1vfeVwvin9Msgh3rZCI60RCCUmUxqod0-Xb7rV61bIb1Ub3KJ3NHTWZnJuJz7EyH89YPMhcEAiZ_yVUf1rMz4HgV_VPCIdA7rpNByqAV1DMnUq-rBYxg4NroqjohcxYYQJq84Vp8FK-lKJ4" 
            alt="Discover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
            <span className="text-white font-semibold text-xs drop-shadow-sm">Khám phá</span>
          </div>
        </div>

        {/* Your story with Plus trigger */}
        <div 
          onClick={() => setShowAddPost(true)}
          className="flex-shrink-0 w-28 h-40 relative rounded-2xl overflow-hidden shadow-sm border-2 border-primary hover:scale-105 transition-transform cursor-pointer"
        >
          <img 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkNdebfj23tNGhGwBc6mjPvBqdC-f8ZU-NMg9tHRB4Q5Y6x8gqI68W3AAPgAXfur9hCnZpJpbcbRozYnyi8OcWrCYK_c2kdW3ABYzfKUSAs_JpCtphGcyP7VcGPKKDeKrQKgTx0X1MOuIMcRpwIdHi1JAxWx2SiUB3m-hJ2CRfewOheEJHtjjpwpNcHWKUY3Sp0FU-z-JcJk-fPg2Zc1Wdvn-kz6cMegxcWWBIIa-DQlPVxveg2CdoGOVDxNL0omrQRy4XEGfGhUM" 
            alt="Your story" 
            className="w-full h-full object-cover grayscale brightness-90"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-md animate-bounce mb-1">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-[10px] uppercase tracking-wider">Đăng tin</span>
          </div>
        </div>
      </section>

      {/* Floating post banner or quick action line */}
      <div className="flex gap-2 items-center justify-between bg-white border border-outline-variant/10 p-3 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src={USER_AVATAR} className="w-full h-full object-cover" alt="Me" />
          </div>
          <span 
            onClick={() => setShowAddPost(true)}
            className="text-xs text-on-surface-variant cursor-pointer hover:text-primary transition-colors font-medium"
          >
            Hôm nay bạn phát hiện món ngon gì? Chia sẻ ngay...
          </span>
        </div>
        <button 
          onClick={() => setShowAddPost(true)}
          className="bg-primary hover:bg-primary-container text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Đăng bài
        </button>
      </div>

      {/* New Post Editor Dialog Overlay */}
      {showAddPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={submitPost}
            className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full flex flex-col gap-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <h3 className="font-bold text-sm text-primary flex items-center gap-1">
                <Plus className="w-5 h-5" /> Đăng bài viết cộng đồng
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddPost(false)}
                className="text-xs font-semibold text-on-surface-variant hover:text-primary"
              >
                Hủy
              </button>
            </div>

            <textarea
              required
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Chia sẻ hương vị, không gian, hoặc cảm xúc của bạn về quán ăn hay địa điểm lý tưởng..."
              className="w-full p-3 bg-surface border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-xs text-on-surface"
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Category selector */}
              <div>
                <label className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 block">Danh mục</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as 'food' | 'location')}
                  className="w-full h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs"
                >
                  <option value="food">Món ăn ngon 🍲</option>
                  <option value="location">Địa điểm dạo chơi 📍</option>
                </select>
              </div>

              {/* Rating level */}
              <div>
                <label className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 block">Đánh giá sao</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-surface border border-outline-variant/50 rounded-xl text-xs"
                >
                  <option value={5}>5.0 ★★★★★</option>
                  <option value={4.5}>4.5 ★★★★☆</option>
                  <option value={4}>4.0 ★★★★☆</option>
                  <option value={3.5}>3.5 ★★★☆☆</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" /> Đăng bài viết cộng đồng
            </button>
          </form>
        </div>
      )}

      {/* Feed Filters */}
      <section className="flex gap-2 overflow-x-auto py-2 hide-scrollbar sticky top-16 z-30 bg-background/50 backdrop-blur-xs">
        <button 
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedFilter === 'all' 
              ? 'bg-primary text-on-primary shadow-sm scale-105' 
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setSelectedFilter('food')}
          className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedFilter === 'food' 
              ? 'bg-primary text-on-primary shadow-sm scale-105' 
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Đồ ăn
        </button>
        <button 
          onClick={() => setSelectedFilter('location')}
          className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedFilter === 'location' 
              ? 'bg-primary text-on-primary shadow-sm scale-105' 
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Địa điểm
        </button>
        <button 
          onClick={() => setSelectedFilter('near_by')}
          className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedFilter === 'near_by' 
              ? 'bg-primary text-on-primary shadow-sm scale-105' 
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Gần đây
        </button>
      </section>

      {/* Timeline Feed Posts */}
      <section className="space-y-6 mt-4">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10 hover:shadow-md transition-shadow"
          >
            {/* Author Row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  referrerPolicy="no-referrer"
                  src={post.authorAvatar} 
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant/25 shadow-xs" 
                  alt={post.authorName} 
                />
                <div>
                  <h4 className="font-bold text-xs text-on-surface">{post.authorName}</h4>
                  <p className="text-[10px] text-on-surface-variant">{post.timeAgo} • {post.location}</p>
                </div>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            {/* Post Paragraph and Rating */}
            <div className="px-4 pb-3">
              <p className="font-body-md text-xs sm:text-sm text-on-surface leading-relaxed mb-2">{post.content}</p>
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => {
                  const num = i + 1;
                  const isStarred = num <= post.rating;
                  return (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-500 text-amber-500' : 'text-outline-variant'}`} 
                    />
                  );
                })}
                <span className="font-semibold text-xs ml-1 text-on-surface">{post.rating}</span>
              </div>
            </div>

            {/* Post Attached Media */}
            <div className="aspect-video relative overflow-hidden bg-surface-container flex items-center justify-center">
              <img 
                referrerPolicy="no-referrer"
                src={post.image} 
                alt="Post Media" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
              {post.id === 'post_2' && (
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors group">
                  <Film className="w-14 h-14 text-white opacity-85 group-hover:scale-110 transition-transform" />
                </button>
              )}
              {post.id === 'post_1' && (
                <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>1/4</span>
                </div>
              )}
            </div>

            {/* Dynamic Engagement Actions panel */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-surface-container">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors group ${
                    post.isLiked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <Heart className={`w-5 h-5 group-active:scale-120 transition-transform ${post.isLiked ? 'fill-primary' : ''}`} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-bold">{post.commentsCount}</span>
                </button>
                <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
