interface Exercise {
  id: string;
  title: string;
  description: string;
  bodyPart: 'ankle' | 'foot';
  conditions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  instructions: string[];
}

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Ankle Dorsiflexion Stretch',
    description: 'Improve ankle mobility and correct dorsiflexed position',
    bodyPart: 'ankle',
    conditions: ['dorsiflexed'],
    difficulty: 'beginner',
    imageUrl: '/images/exercises/ankle-dorsiflexion.jpg',
    instructions: [
      'Sit on the floor with your legs extended',
      'Point your toes forward and down',
      'Hold for 15-30 seconds',
      'Repeat 3 times'
    ]
  },
  {
    id: '2',
    title: 'Plantar Flexion Exercise',
    description: 'Strengthen ankle muscles and improve plantar flexed position',
    bodyPart: 'ankle',
    conditions: ['plantar flexed'],
    difficulty: 'beginner',
    imageUrl: '/images/exercises/plantar-flexion.jpg',
    instructions: [
      'Stand on the edge of a step',
      'Lower your heels below the step level',
      'Rise up on your toes',
      'Hold for 2 seconds',
      'Repeat 15 times'
    ]
  },
  {
    id: '3',
    title: 'Foot Supination Correction',
    description: 'Balance foot position and reduce supination',
    bodyPart: 'foot',
    conditions: ['supinated'],
    difficulty: 'intermediate',
    imageUrl: '/images/exercises/foot-supination.jpg',
    instructions: [
      'Stand with feet hip-width apart',
      'Roll your feet inward slightly',
      'Hold for 5 seconds',
      'Release and repeat 10 times'
    ]
  },
  {
    id: '4',
    title: 'Pronation Control Exercise',
    description: 'Improve foot alignment and reduce pronation',
    bodyPart: 'foot',
    conditions: ['pronated'],
    difficulty: 'intermediate',
    imageUrl: '/images/exercises/pronation-control.jpg',
    instructions: [
      'Stand on one foot',
      'Focus on lifting your arch',
      'Hold for 10 seconds',
      'Switch feet and repeat 10 times each'
    ]
  },
  {
    id: '5',
    title: 'Ankle Stability Exercise',
    description: 'Maintain neutral ankle position and improve balance',
    bodyPart: 'ankle',
    conditions: ['neutral'],
    difficulty: 'beginner',
    imageUrl: '/images/exercises/ankle-stability.jpg',
    instructions: [
      'Stand on one foot',
      'Maintain neutral ankle position',
      'Hold for 30 seconds',
      'Switch feet and repeat 3 times each'
    ]
  },
  {
    id: '6',
    title: 'Foot Alignment Exercise',
    description: 'Maintain proper foot alignment and strengthen arch',
    bodyPart: 'foot',
    conditions: ['neutral'],
    difficulty: 'beginner',
    imageUrl: '/images/exercises/foot-alignment.jpg',
    instructions: [
      'Stand with feet parallel',
      'Press all four corners of feet into ground',
      'Hold for 10 seconds',
      'Repeat 10 times'
    ]
  }
]; 