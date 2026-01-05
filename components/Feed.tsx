
import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, BadgeCheck, Image as ImageIcon, Camera, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    author: { name: 'DriftMaster', username: 'drift_king', verification: 'blue' },
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    caption: 'Sunset drives in the 911 are just different. #Porsche #Drift',
    likes: 1240,
    comments: 42,
    timestamp: '2h ago'
  },
  {
    id: '2',
    userId: 'u2',
    author: { name: 'Luxury Motors', username: 'lux_cars', verification: 'gold' },
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    caption: 'Fresh inventory arriving soon! Who wants a sneak peek? 🏎️',
    likes: 850,
    comments: 15,
    timestamp: '5h ago',
    isSale: true,
    price: 85000
  },
  {
    id: '3',
    userId: 'u3',
    author: { name: 'Jane Doe', username: 'janedoe_cars', verification: 'none' },
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    caption: 'Cleaned up the garage today. ✨',
    likes: 320,
    comments: 8,
    timestamp: '1d ago'
  }
];

const Feed: React.FC = () => {
  return (
    <div className="space-y-6 py-6">
      {/* Create Post Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <img src="https://i.pravatar.cc/150?u=me" alt="me" className="w-full h-full rounded-full object-cover" />
          </div>
          <button className="flex-1 text-left px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            What's in your garage?
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">
              <ImageIcon size={18} className="text-green-500" />
              Photo
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors">
              <Camera size={18} className="text-brand-500" />
              Live
            </button>
          </div>
          <button className="bg-brand-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors">
            Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {MOCK_POSTS.map((post) => (
        <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all hover:shadow-md">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-orange-600 p-0.5">
                <img src={`https://i.pravatar.cc/150?u=${post.userId}`} alt="avatar" className="w-full h-full rounded-full border-2 border-white dark:border-slate-900 object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{post.author.username}</span>
                  {post.author.verification === 'blue' && <BadgeCheck size={14} className="text-brand-500 fill-current" />}
                  {post.author.verification === 'gold' && <BadgeCheck size={14} className="text-amber-500 fill-current" />}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">{post.timestamp}</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Image */}
          <div className="aspect-square relative bg-slate-100 dark:bg-slate-800 group overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt="post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {post.isSale && (
              <div className="absolute top-4 right-4 bg-brand-600 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-xl ring-2 ring-white/20">
                FOR SALE: ${post.price?.toLocaleString()}
              </div>
            )}
          </div>

          {/* Actions & Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-5">
                <button className="text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors transform active:scale-125">
                  <Heart size={26} strokeWidth={2} />
                </button>
                <button className="text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
                  <MessageCircle size={26} strokeWidth={2} />
                </button>
                <button className="text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
                  <Send size={26} strokeWidth={2} />
                </button>
              </div>
              <button className="text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
                <Bookmark size={26} strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-black text-sm text-slate-900 dark:text-slate-100">
                {post.likes.toLocaleString()} likes
              </p>
              <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-300">
                <span className="font-black mr-2 text-slate-900 dark:text-slate-100">{post.author.username}</span>
                {post.caption}
              </div>
              <button className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-brand-600 transition-colors pt-1">
                View all {post.comments} comments
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
