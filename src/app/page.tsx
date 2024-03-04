'use client';
import { useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import AddRowInput from './components/form/AddRowInput';
import IncreaseOrDecreaseInput from './components/form/IncreaseOrDecreaseInput';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  const [gridSize, setGridSize] = useState<GridSize>({ width: 51, height: 51 });
  return (
    <>
      {/* <GridSizeInput setGridSize={setGridSize} gridSize={gridSize} /> */}
      <AddRowInput
        gridSize={gridSize}
        setGridSize={setGridSize}
        pattern={pattern}
        setPattern={setPattern}
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
      />
      {/* {pattern.rows.length !== 0 && (
        <>
          <IncreaseOrDecreaseInput currentNumberOfStitches={currentNumberOfStitches} />
        </>
      )} */}
      <PatternDisplay pattern={pattern} setPattern={setPattern} gridSize={gridSize} />
    </>
  );
}
