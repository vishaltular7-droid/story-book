import React from 'react';

interface LoadingScreenProps {
  message: string;
  subMessage?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message, subMessage }) => {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in p-6">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
            <span className="text-3xl animate-pulse">✨</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-ink mb-3">{message}</h3>
      {subMessage && <p className="text-stone-500 max-w-md animate-pulse">{subMessage}</p>}
    </div>
  );
};

export default LoadingScreen;
