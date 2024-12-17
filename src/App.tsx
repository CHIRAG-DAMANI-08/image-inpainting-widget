import React, { useState } from 'react';
import { Canvas } from './components/Canvas';
import { ImagePair } from './components/ImagePair';
import { Brush } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);

  const handleMaskGenerated = (maskDataUrl: string, originalImageUrl: string) => {
    setOriginalImage(originalImageUrl);
    setMaskImage(maskDataUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <Brush className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Image Inpainting Widget</h1>
          </div>

          <Canvas onMaskGenerated={handleMaskGenerated} />
          
          <ImagePair
            originalImage={originalImage}
            maskImage={maskImage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;