import React, { useState } from 'react';
import { StoryContext } from '../types';
import Button from './Button';

interface StepContextProps {
  onSubmit: (context: StoryContext) => void;
  transformedImage: string;
}

const StepContext: React.FC<StepContextProps> = ({ onSubmit, transformedImage }) => {
  const [formData, setFormData] = useState<StoryContext>({
    who: '',
    what: '',
    why: '',
    emotions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = Object.values(formData).every(val => val.trim().length > 0);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 animate-fade-in items-start">
      {/* Left: Image Preview */}
      <div className="w-full lg:w-1/2 sticky top-8">
        <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-1">
          <img 
            src={transformedImage} 
            alt="Transformed Memory" 
            className="w-full rounded-lg shadow-inner"
          />
          <div className="mt-4 text-center font-serif text-stone-400 italic">
            "A moment frozen in time..."
          </div>
        </div>
      </div>

      {/* Right: Context Form */}
      <div className="w-full lg:w-1/2">
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-ink mb-2">Tell Us More</h2>
          <p className="text-stone-500">Help us write the perfect chapter for this image.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Who is in this image?</label>
            <input
              type="text"
              name="who"
              value={formData.who}
              onChange={handleChange}
              placeholder="e.g., Me and my best friend Sarah"
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">What is happening in this moment?</label>
            <textarea
              name="what"
              value={formData.what}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., We were hiking in the Alps and finally reached the summit..."
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-white transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Why is this moment important to you?</label>
            <textarea
              name="why"
              value={formData.why}
              onChange={handleChange}
              rows={2}
              placeholder="e.g., It was our last trip before college..."
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-white transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Any emotions or memories connected to it?</label>
            <input
              type="text"
              name="emotions"
              value={formData.emotions}
              onChange={handleChange}
              placeholder="e.g., Joy, nostalgia, feeling invincible..."
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-white transition-all"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Write My Story
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepContext;
