import React from 'react';

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  return (
    <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />
    </label>
  );
};