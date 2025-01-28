import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { ProgressPhoto } from '../lib/supabase';
import { CameraIcon} from '@heroicons/react/24/outline';

export default function ProgressPhotos() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'front' | 'back' | 'side' | 'all'>('all');

  useEffect(() => {
    fetchProgressPhotos();
  }, [user]);

  const fetchProgressPhotos = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('user_id', user.id)
        .order('taken_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching progress photos:', error);
      setError('Failed to load progress photos');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhoto = async (file: File, type: 'front' | 'back' | 'side', notes: string | null) => {
    try {
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}${fileExt ? `.${fileExt}` : ''}`;
      const filePath = `progress-photos/${fileName}`;

      // Upload photo to storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // Save photo record
      const { error: dbError } = await supabase
        .from('progress_photos')
        .insert([
          {
            user_id: user.id,
            photo_url: publicUrl,
            photo_type: type,
            taken_at: new Date().toISOString(),
            notes,
          },
        ]);

      if (dbError) throw dbError;
      fetchProgressPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError('Failed to upload photo');
    }
  };

  const filteredPhotos = selectedType === 'all' 
    ? photos 
    : photos.filter(photo => photo.photo_type === selectedType);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="main-wrapper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Progress Photos</h1>
            <input 
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadPhoto(file, 'front', null);
              }}
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <button
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold"
              >
                <CameraIcon className="w-5 h-5" />
                <span>Add Photo</span>
              </button>
            </label>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 mb-8">
            {(['all', 'front', 'back', 'side'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50"
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.photo_url}
                    alt={`Progress photo - ${photo.photo_type}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20">
                      {photo.photo_type}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(photo.taken_at).toLocaleDateString()}
                    </span>
                  </div>
                  {photo.notes && (
                    <p className="text-sm text-gray-400 italic">
                      {photo.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 