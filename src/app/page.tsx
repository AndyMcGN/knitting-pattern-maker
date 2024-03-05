'use client';
import { useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import AddRowsInputsContainer from './components/form/AddIdenticalRowsInputsContainer';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  const [gridSize, setGridSize] = useState<GridSize>({ width: 9, height: 9 });
  return (
    <>
      {/* <GridSizeInput setGridSize={setGridSize} gridSize={gridSize} /> */}
      <AddRowsInputsContainer
        gridSize={gridSize}
        setGridSize={setGridSize}
        pattern={pattern}
        setPattern={setPattern}
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
      />
      <PatternDisplay pattern={pattern} setPattern={setPattern} gridSize={gridSize} />
    </>
  );
}
