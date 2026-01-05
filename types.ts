
export type UserRole = 'customer' | 'dealer' | 'admin';
export type VerificationTier = 'none' | 'blue' | 'gold';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: UserRole;
  verification: VerificationTier;
  location?: { lat: number; lng: number };
}

export interface Post {
  id: string;
  userId: string;
  author: Partial<User>;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isSale?: boolean;
  price?: number;
}

export interface CarListing extends Post {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'new' | 'used';
  location: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isEncrypted: boolean;
}

export interface ServiceBooking {
  id: string;
  type: 'consulting' | 'inspection' | 'quickfix';
  status: 'pending' | 'completed';
  price: number;
  date: string;
}
