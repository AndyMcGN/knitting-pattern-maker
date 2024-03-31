import React from 'react';
import Colorful from '@uiw/react-color-colorful';
import { usePatternStore } from '@/app/store';

export default function ColorPicker() {
  const { currentColor, setCurrentColor } = usePatternStore((state) => state);
  return (
    <>
      <Colorful
        color={currentColor}
        onChange={(color) => {
          setCurrentColor(color.hsva);
        }}
      />
    </>
  );
}
