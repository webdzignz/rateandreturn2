import React from 'react';
import Logo from './Logo';

const LoadingPage: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#002868] via-blue-800 to-blue-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-sky-300/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-sky-400/40 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-sky-300/50 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-2/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-2/3 left-1/6 w-2 h-2 bg-sky-400/30 rounded-full animate-pulse delay-1800"></div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5"></div>

      {/* Main loading content */}
      <div className="relative z-10 text-center animate-in fade-in-50 zoom-in-95 duration-1000">
        {/* Logo with pulsing animation */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500 animate-pulse">
          <Logo size="xl" variant="white" showText={true} />
        </div>

        {/* Loading text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
          Loading Your Investment Portal
        </h1>
        
        <p className="text-lg text-sky-100 mb-12 animate-in slide-in-from-bottom-2 duration-1000 delay-500">
          Connecting you to premium bond opportunities...
        </p>

        {/* Animated loading bar */}
        <div className="w-80 max-w-sm mx-auto mb-8 animate-in slide-in-from-bottom-2 duration-1000 delay-700">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-sky-400 via-sky-300 to-white rounded-full animate-loading-bar shadow-lg"></div>
          </div>
        </div>

        {/* Spinning loader */}
        <div className="flex justify-center mb-8 animate-in fade-in-50 duration-1000 delay-900">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin-slow"></div>
            {/* Inner spinning element */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-sky-400 border-r-sky-300 rounded-full animate-spin"></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 animate-in fade-in-50 duration-1000 delay-1100">
          <div className="w-3 h-3 bg-sky-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-sky-300 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Subtle loading message */}
        <p className="text-sm text-sky-200/80 mt-8 animate-in fade-in-50 duration-1000 delay-1300">
          Preparing your personalized bond portfolio...
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#002868] to-transparent"></div>
    </div>
  );
};

export default LoadingPage;