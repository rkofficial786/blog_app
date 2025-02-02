export type UserRole = 'blogger' | 'subscriber';

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
  bio?: string;
  expertise?: string[];
  languages?: string[];
  location?: Location;
  followersCount?: number;
  following?: string[];
  createdAt: string;
  postCount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  authorId: string;
  language: string;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogWithAuthor extends BlogPost {
  author: User;
  postCount:number
}

export interface Comment {
  id: string;
  blogId: string;
  userId: string;
  content: string;
  createdAt: string;
}