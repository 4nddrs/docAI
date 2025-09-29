import React from 'react';
import { Heart, Activity } from 'lucide-react';

export const SplashScreen = () => {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo with heartbeat animation */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center">
            <Heart className="w-16 h-16 text-pink-500 fill-current animate-pulse" />
            <Activity className="w-8 h-8 text-pink-500 ml-2 animate-bounce" />
          </div>
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">DocIA</h1>
        
        {/* Loading indicator */}
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      </div>
    </div>
  );
};