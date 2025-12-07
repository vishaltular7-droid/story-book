import React, { useState } from 'react';
import { AppStep, ArtStyle, Story, StoryContext } from './types';
import { transformImageWithAI, generateStoryWithAI } from './services/geminiService';
import StepUpload from './components/StepUpload';
import StepStyle from './components/StepStyle';
import StepContext from './components/StepContext';
import StepResult from './components/StepResult';
import LoadingScreen from './components/LoadingScreen';
import { Book, Heart } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.Upload);
  const [originalImage, setOriginalImage] = useState<string>('');
  const [transformedImage, setTransformedImage] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleImageUpload = (base64: string) => {
    setOriginalImage(base64);
    setCurrentStep(AppStep.Style);
  };

  const handleStyleSelect = async (style: ArtStyle) => {
    setSelectedStyle(style);
    setCurrentStep(AppStep.Transforming);
    setError(null);

    try {
      const resultImage = await transformImageWithAI(originalImage, style);
      setTransformedImage(resultImage);
      setCurrentStep(AppStep.Context);
    } catch (err) {
      console.error(err);
      setError("We couldn't transform your image. Please try a different photo or style.");
      setCurrentStep(AppStep.Style); // Go back
    }
  };

  const handleContextSubmit = async (context: StoryContext) => {
    if (!selectedStyle || !transformedImage) return;
    
    setCurrentStep(AppStep.StoryGeneration);
    setError(null);

    try {
      const generatedStory = await generateStoryWithAI(context, selectedStyle);
      
      setStory({
        title: generatedStory.title,
        content: generatedStory.content,
        date: new Date().toISOString(),
        style: selectedStyle,
        originalImage,
        transformedImage,
        context
      });
      
      setCurrentStep(AppStep.Result);
    } catch (err) {
      console.error(err);
      setError("We couldn't write your story. Please try again.");
      setCurrentStep(AppStep.Context);
    }
  };

  const handleRestart = () => {
    setOriginalImage('');
    setTransformedImage('');
    setSelectedStyle(null);
    setStory(null);
    setError(null);
    setCurrentStep(AppStep.Upload);
  };

  // Render Helpers
  const renderStep = () => {
    switch (currentStep) {
      case AppStep.Upload:
        return <StepUpload onImageSelected={handleImageUpload} />;
      case AppStep.Style:
        return <StepStyle onStyleSelected={handleStyleSelect} selectedImage={originalImage} />;
      case AppStep.Transforming:
        return <LoadingScreen message="Weaving your magic..." subMessage="Our AI artists are reimagining your photo in your chosen style. This may take a moment." />;
      case AppStep.Context:
        return <StepContext onSubmit={handleContextSubmit} transformedImage={transformedImage} />;
      case AppStep.StoryGeneration:
        return <LoadingScreen message="Writing your chapter..." subMessage="Crafting a personal story based on your memories and the mood of the artwork." />;
      case AppStep.Result:
        return story ? <StepResult story={story} onRestart={handleRestart} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-paper text-ink selection:bg-accent selection:text-white">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep(AppStep.Upload)}>
            <div className="bg-accent p-2 rounded-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-ink">Relation Book</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-500">
            <span className={currentStep === AppStep.Upload ? 'text-accent' : ''}>1. Upload</span>
            <span className="text-stone-300">•</span>
            <span className={[AppStep.Style, AppStep.Transforming].includes(currentStep) ? 'text-accent' : ''}>2. Style</span>
            <span className="text-stone-300">•</span>
            <span className={[AppStep.Context, AppStep.StoryGeneration].includes(currentStep) ? 'text-accent' : ''}>3. Context</span>
            <span className="text-stone-300">•</span>
            <span className={currentStep === AppStep.Result ? 'text-accent' : ''}>4. Story</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full px-4 py-12">
        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}
        
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 text-stone-400 font-serif">
            Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> using Google Gemini
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
