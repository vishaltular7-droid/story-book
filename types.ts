export enum ArtStyle {
  Disney = 'Disney Magic',
  Fantasy = 'Biblio Fantasy',
  Portrait = 'AI Portrait',
  Comic = 'Comic Book',
  Pixar = '3D Animation',
  Anime = 'Anime Studio',
  Cinematic = 'Cinematic Realism',
  Watercolor = 'Soft Watercolor',
}

export interface StoryContext {
  who: string;
  what: string;
  why: string;
  emotions: string;
}

export interface Story {
  title: string;
  content: string;
  date: string;
  style: ArtStyle;
  originalImage: string; // Base64
  transformedImage: string; // Base64
  context: StoryContext;
}

export enum AppStep {
  Upload = 'UPLOAD',
  Style = 'STYLE',
  Transforming = 'TRANSFORMING',
  Context = 'CONTEXT',
  StoryGeneration = 'STORY_GENERATION',
  Result = 'RESULT',
  Gallery = 'GALLERY'
}
