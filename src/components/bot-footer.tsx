'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { useBotStore } from '@src/stores/bot-store';

export const BotFooter = () => {
  const pathname = usePathname();
  const { orders } = useBotStore();
  
  // Count total items in cart
  const cartItemsCount = Object.values(orders).reduce((sum: number, item: any) => sum + (item.count || 0), 0);

  const navItems = [
    { href: '/admin/new-design', icon: Home, label: 'Asosiy', id: 'home' },
    { href: '/favorites', icon: Heart, label: 'Sevimlilar', id: 'favorites' },
    { href: '/cart', icon: ShoppingCart, label: 'Savat', id: 'cart', badge: cartItemsCount > 0 ? cartItemsCount : null },
    { href: '/admin/profile', icon: User, label: 'Profil', id: 'profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient overlay above footer */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
      
      <nav className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-lg mx-auto px-2 py-2 safe-area-inset-bottom">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.id} href={item.href} className="flex-1">
                  <div className="relative flex flex-col items-center justify-center py-1.5 px-2 group">
                    {/* Icon Container */}
                    <div className={`
                      relative flex items-center justify-center w-12 h-9 rounded-2xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 scale-105' 
                        : 'bg-transparent group-hover:bg-gray-50 active:bg-gray-100'
                      }
                    `}>
                      <Icon 
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      
                      {/* Badge */}
                      {item.badge && (
                        <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                          {item.badge > 99 ? '99+' : item.badge}
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className={`
                      text-[10px] font-medium mt-0.5 transition-colors
                      ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}
                    `}>
                      {item.label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
