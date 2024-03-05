'use client';
import { useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import IncreaseOrDecreaseInput from './components/form/IncreaseOrDecreaseInput';
import InputsContainer from './components/form/AddIdenticalRowsInputsContainer';
import AddIdenticalRowsInputsContainer from './components/form/AddIdenticalRowsInputsContainer';
import IncreaseOrDecreaseInputContainer from './components/form/IncreaseOrDecreaseInputContainer';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  const [gridSize, setGridSize] = useState<GridSize>({ width: 51, height: 51 });
  return (
    <>
      {/* <GridSizeInput setGridSize={setGridSize} gridSize={gridSize} /> */}
      <AddIdenticalRowsInputsContainer
        gridSize={gridSize}
        setGridSize={setGridSize}
        pattern={pattern}
        setPattern={setPattern}
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
      />
      {pattern.rows.length !== 0 && (
        <>
          <IncreaseOrDecreaseInputContainer currentNumberOfStitches={currentNumberOfStitches} />
        </>
      )}
      <PatternDisplay pattern={pattern} setPattern={setPattern} gridSize={gridSize} />
    </>
  );
}
