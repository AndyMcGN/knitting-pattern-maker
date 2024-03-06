'use client';
import { useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import EditPatternForm from './components/form/EditPatternForm';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });

  return (
    <>
      <EditPatternForm
        pattern={pattern}
        setPattern={setPattern}
      />
      <PatternDisplay pattern={pattern} setPattern={setPattern} />
    </>
  );
}
