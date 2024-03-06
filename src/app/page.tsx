'use client';
import { useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import AddRowsInputsContainer from './components/form/AddIdenticalRowsInputsContainer';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  return (
    <>
      <AddRowsInputsContainer
        pattern={pattern}
        setPattern={setPattern}
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
      />
      <PatternDisplay pattern={pattern} setPattern={setPattern} />
    </>
  );
}
