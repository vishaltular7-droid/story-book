import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Button from './Button';

interface StepUploadProps {
  onImageSelected: (base64: string) => void;
}

const StepUpload: React.FC<StepUploadProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="text-3xl font-serif text-ink mb-6">Start Your Story</h2>
      <p className="text-stone-500 mb-8">Upload a photo to begin the transformation. We'll turn it into a work of art.</p>
      
      <div 
        className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
          dragActive ? 'border-accent bg-orange-50' : 'border-stone-300 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-pastel-blue rounded-full flex items-center justify-center mb-2">
            <Upload className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-ink">Drag & Drop your image here</h3>
          <p className="text-stone-400">or</p>
          <Button onClick={() => inputRef.current?.click()} variant="primary">
            Browse Files
          </Button>
          <p className="text-xs text-stone-400 mt-4">Supports JPEG, PNG (Max 5MB)</p>
        </div>
      </div>
    </div>
  );
};

export default StepUpload;
