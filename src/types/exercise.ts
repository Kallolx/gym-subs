export type Exercise = {
  title: string;
  description: string[];
  tips: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bodyPart: string;
  condition: string;
  imageUrl: string;
}; 