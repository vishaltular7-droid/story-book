import React from 'react';
import { Story } from '../types';
import { Share2, Download, Home } from 'lucide-react';
import Button from './Button';

interface StepResultProps {
  story: Story;
  onRestart: () => void;
}

const StepResult: React.FC<StepResultProps> = ({ story, onRestart }) => {
  
  const handleDownload = () => {
    // Simple download logic for the image
    const link = document.createElement('a');
    link.href = story.transformedImage;
    link.download = `relation-book-${story.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="bg-white shadow-2xl rounded-l-lg rounded-r-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border-r-8 border-stone-800 border-l-2 border-l-stone-200">
        
        {/* Left Page: Image */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-stone-50 border-r border-stone-200 flex flex-col justify-center items-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 pointer-events-none" />
          
          <div className="relative p-2 bg-white shadow-lg rotate-1">
             <img 
              src={story.transformedImage} 
              alt="Story Illustration" 
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>
          <p className="mt-8 font-serif italic text-stone-500 text-sm">
            Illustrated in {story.style} style
          </p>
        </div>

        {/* Right Page: Story */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#fffcf5] text-ink relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 pointer-events-none" />
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">Chapter 1</span>
              <span className="text-xs font-serif italic text-stone-400">{new Date().toLocaleDateString()}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-8 leading-tight">
              {story.title}
            </h1>

            <div className="prose prose-stone prose-lg font-serif leading-relaxed text-stone-700">
               {story.content.split('\n').map((paragraph, idx) => (
                 paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
               ))}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap gap-4 justify-center md:justify-end z-10">
            <Button variant="ghost" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Save Image
            </Button>
            {/* Share functionality would typically use Web Share API */}
            <Button variant="ghost" onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: story.title,
                        text: story.content,
                        url: window.location.href
                    }).catch(console.error);
                } else {
                    alert("Sharing not supported on this browser.");
                }
            }}>
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button onClick={onRestart} variant="primary">
              <Home className="w-4 h-4" /> Create New
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepResult;
