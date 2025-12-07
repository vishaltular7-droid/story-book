import React from 'react';
import { ArtStyle } from './types';
import { Sparkles, Wand2, User, BookOpen, Film, Tv, Palette, Feather } from 'lucide-react';

export const STYLE_OPTIONS = [
  {
    id: ArtStyle.Disney,
    label: 'Disney Magic',
    description: 'Magical, vibrant, and full of wonder.',
    color: 'bg-blue-100',
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
  },
  {
    id: ArtStyle.Fantasy,
    label: 'Biblio Fantasy',
    description: 'Old paper textures, mystical aura.',
    color: 'bg-amber-100',
    icon: <BookOpen className="w-6 h-6 text-amber-600" />,
  },
  {
    id: ArtStyle.Pixar,
    label: '3D Animation',
    description: 'Soft lighting, cute features, 3D rendered.',
    color: 'bg-orange-100',
    icon: <Tv className="w-6 h-6 text-orange-500" />,
  },
  {
    id: ArtStyle.Anime,
    label: 'Anime Studio',
    description: 'Expressive eyes, dramatic lighting.',
    color: 'bg-pink-100',
    icon: <Film className="w-6 h-6 text-pink-500" />,
  },
  {
    id: ArtStyle.Comic,
    label: 'Comic Book',
    description: 'Bold lines, halftones, dynamic action.',
    color: 'bg-yellow-100',
    icon: <Wand2 className="w-6 h-6 text-yellow-600" />,
  },
  {
    id: ArtStyle.Portrait,
    label: 'AI Portrait',
    description: 'Polished, studio lighting, idealized.',
    color: 'bg-purple-100',
    icon: <User className="w-6 h-6 text-purple-500" />,
  },
  {
    id: ArtStyle.Cinematic,
    label: 'Cinematic',
    description: 'Realistic textures, movie-like depth.',
    color: 'bg-slate-100',
    icon: <Film className="w-6 h-6 text-slate-600" />,
  },
  {
    id: ArtStyle.Watercolor,
    label: 'Watercolor',
    description: 'Soft edges, artistic splashes, dreamy.',
    color: 'bg-green-100',
    icon: <Palette className="w-6 h-6 text-green-500" />,
  },
];
