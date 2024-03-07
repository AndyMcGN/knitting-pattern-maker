'use client';
import { useEffect, useState } from 'react';
import PatternDisplay from './components/PatternDisplay';
import EditPatternForm from './components/form/EditPatternForm';

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>({ rows: [] });

  useEffect(() => {
    console.log('pattern', pattern);
  }, [pattern]);
  return (
    <>
      <EditPatternForm pattern={pattern} setPattern={setPattern} />
      <PatternDisplay pattern={pattern} setPattern={setPattern} />
    </>
  );
}
