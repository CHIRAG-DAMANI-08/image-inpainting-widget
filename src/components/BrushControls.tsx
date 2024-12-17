import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface BrushControlsProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const BrushControls: React.FC<BrushControlsProps> = ({
  brushSize,
  onBrushSizeChange,
}) => {
  const decreaseBrushSize = () => onBrushSizeChange(Math.max(1, brushSize - 5));
  const increaseBrushSize = () => onBrushSizeChange(Math.min(100, brushSize + 5));

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decreaseBrushSize}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Decrease brush size"
      >
        <Minus className="w-5 h-5" />
      </button>
      <span className="min-w-[3rem] text-center">{brushSize}px</span>
      <button
        onClick={increaseBrushSize}
        className="p-2 rounded hover:bg-gray-100"
        aria-label="Increase brush size"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};