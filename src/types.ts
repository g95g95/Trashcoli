export type UrbexLocation = {
  id: string;
  name: string;
  municipality: string;
  coordinates: [number, number];
  originUse: string;
  description: string;
  accessInfo: string;
  abandonmentLevel: 'Lieve' | 'Moderato' | 'Avanzato' | 'Estremo' | string;
  photoGallery: string[];
  tips?: string;
};
