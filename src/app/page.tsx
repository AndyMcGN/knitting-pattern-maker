'use client';
import PatternDisplay from './components/PatternDisplay';
import EditPatternForm from './components/form/EditPatternForm';
import ColorPicker from './components/misc/ColorPicker';

export default function Home() {
  return (
    <>
      <ColorPicker />
      <EditPatternForm />
      <PatternDisplay />
    </>
  );
}
