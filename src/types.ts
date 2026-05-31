export type ViewState =
  | 'splash'
  | 'home'
  | 'search'
  | 'suggest'
  | 'community'
  | 'profile'
  | 'detail'
  | 'management'
  | 'login'
  | 'signup'
  | 'wheel';

export interface FoodItem {
  id: string;
  name: string;
  priceRange: string;
  rating: number;
  reviewsCount?: number;
  image: string;
  category: string;
  distance?: string;
  location: string;
  description: string;
}

export interface PlaceItem {
  id: string;
  name: string;
  location: string;
  image: string;
  tag: string; // 'Mới nhất', 'Xu hướng', 'Gợi ý'
  rating: number;
  reviewsCount: number;
  description?: string;
  address: string;
  operatingHours: string;
  latitude?: number;
  longitude?: number;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  location: string;
  content: string;
  rating: number;
  image: string;
  likes: number;
  commentsCount: number;
  category: 'all' | 'food' | 'location' | 'near_by';
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  replyTo?: string;
}
