import type { Exercise } from '../types/exercise';

export const exerciseDatabase: Record<string, Record<string, Exercise[]>> = {
    spine: {
      lordosis: [
        {
          title: 'Childs Pose',
          description: [
            '1. Start by kneeling on your mat',
            '2. Sit back on your heels',
            '3. Stretch your arms forward on the mat',
            '4. Hold for 30 seconds while breathing deeply',
            '5. Repeat 3-5 times'
          ],
          tips: 'Keep your back relaxed and focus on deep breathing',
          duration: '5 minutes',
          difficulty: 'beginner',
          bodyPart: 'spine',
          condition: 'lordosis',
          imageUrl: 'https://images.unsplash.com/photo-1485727749690-d091e8284ef3?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Cat-Cow Stretch',
          description: [
            '1. Start on hands and knees',
            '2. Inhale: Look up and arch your back',
            '3. Exhale: Round your spine and look down',
            '4. Move slowly between positions',
            '5. Repeat 10 times'
          ],
          tips: 'Keep your movements slow and controlled',
          duration: '3-5 minutes',
          difficulty: 'beginner',
          bodyPart: 'spine',
          condition: 'lordosis',
          imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Bridge Pose',
          description: [
            '1. Lie on your back with knees bent and feet flat',
            '2. Lift hips toward the ceiling',
            '3. Hold for 5 seconds and lower back down',
            '4. Repeat 10-15 times'
          ],
          tips: 'Engage your glutes and avoid overarching your lower back',
          duration: '4 minutes',
          difficulty: 'intermediate',
          bodyPart: 'spine',
          condition: 'lordosis',
          imageUrl: 'https://images.unsplash.com/photo-1599058917217-a12d52e8a874?q=80&w=1780&auto=format&fit=crop'
        }
      ],
      kyphosis: [
        {
          title: 'Thoracic Foam Rolling',
          description: [
            '1. Place foam roller under upper back',
            '2. Support head with hands',
            '3. Gently roll up and down',
            '4. Pause on tight spots',
            '5. Roll for 1-2 minutes'
          ],
          tips: 'If you feel pain, reduce pressure by supporting more weight with your feet',
          duration: '5 minutes',
          difficulty: 'intermediate',
          bodyPart: 'spine',
          condition: 'kyphosis',
          imageUrl: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Wall Angels',
          description: [
            '1. Stand with your back flat against a wall',
            '2. Raise arms to shoulder height',
            '3. Slowly slide arms up and down against the wall',
            '4. Keep your back and head in contact with the wall',
            '5. Repeat 10 times'
          ],
          tips: 'Focus on keeping your movements smooth and controlled',
          duration: '4 minutes',
          difficulty: 'beginner',
          bodyPart: 'spine',
          condition: 'kyphosis',
          imageUrl: 'https://images.unsplash.com/photo-1599058917657-c1086f742150?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Reverse Tabletop Stretch',
          description: [
            '1. Sit on the floor with your hands behind you and feet flat',
            '2. Push through your hands and lift hips toward the ceiling',
            '3. Hold for 10 seconds',
            '4. Lower back down slowly',
            '5. Repeat 8-10 times'
          ],
          tips: 'Keep your shoulders relaxed and avoid locking your elbows',
          duration: '5 minutes',
          difficulty: 'intermediate',
          bodyPart: 'spine',
          condition: 'kyphosis',
          imageUrl: 'https://images.unsplash.com/photo-1599058920014-961e4ebc9a68?q=80&w=1780&auto=format&fit=crop'
        }
      ]
    },
    neck: {
      'forward head': [
        {
          title: 'Neck Rotations',
          description: [
            '1. Sit or stand with good posture',
            '2. Slowly turn head to the right',
            '3. Hold for 5 seconds',
            '4. Return to center',
            '5. Repeat on left side',
            '6. Do 10 repetitions each side'
          ],
          tips: 'Keep movements gentle and stop if you feel pain',
          duration: '3 minutes',
          difficulty: 'beginner',
          bodyPart: 'neck',
          condition: 'forward head',
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Chin Tucks',
          description: [
            '1. Sit up straight and look forward',
            '2. Gently pull your chin toward your chest',
            '3. Hold for 5 seconds',
            '4. Return to starting position',
            '5. Repeat 10 times'
          ],
          tips: 'Keep your shoulders relaxed and avoid tilting your head up or down',
          duration: '2 minutes',
          difficulty: 'beginner',
          bodyPart: 'neck',
          condition: 'forward head',
          imageUrl: 'https://images.unsplash.com/photo-1557332190-d6fd65c125ae?q=80&w=1780&auto=format&fit=crop'
        },
        {
          title: 'Upper Trapezius Stretch',
          description: [
            '1. Sit or stand with good posture',
            '2. Tilt head toward your right shoulder',
            '3. Hold for 10-15 seconds',
            '4. Repeat on the left side',
            '5. Perform 3-5 repetitions per side'
          ],
          tips: 'Avoid shrugging your shoulders; keep them relaxed',
          duration: '5 minutes',
          difficulty: 'intermediate',
          bodyPart: 'neck',
          condition: 'forward head',
          imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1780&auto=format&fit=crop'
        }
      ]
    }
  }; 