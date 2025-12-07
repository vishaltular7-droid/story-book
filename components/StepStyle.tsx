import React from 'react';
import { ArtStyle } from '../types';
import { STYLE_OPTIONS } from '../constants';
import Button from './Button';

interface StepStyleProps {
  onStyleSelected: (style: ArtStyle) => void;
  selectedImage: string;
}

const StepStyle: React.FC<StepStyleProps> = ({ onStyleSelected, selectedImage }) => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-ink mb-2">Choose an Art Style</h2>
        <p className="text-stone-500">Select how you want your memory to be reimagined.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STYLE_OPTIONS.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelected(style.id)}
            className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent text-left flex flex-col items-start gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${style.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
              {style.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">{style.label}</h3>
              <p className="text-sm text-stone-500 mt-1">{style.description}</p>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-2xl pointer-events-none" />
          </button>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-md rotate-3">
            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default StepStyle;
