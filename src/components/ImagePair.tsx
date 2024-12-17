import React from 'react';

interface ImagePairProps {
  originalImage: string | null;
  maskImage: string | null;
}

export const ImagePair: React.FC<ImagePairProps> = ({ originalImage, maskImage }) => {
  if (!originalImage || !maskImage) return null;

  return (
    <div className="flex gap-8 mt-8">
      <div className="space-y-2">
        <h3 className="font-medium">Original Image</h3>
        <img
          src={originalImage}
          alt="Original"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Mask Image</h3>
        <img
          src={maskImage}
          alt="Mask"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};