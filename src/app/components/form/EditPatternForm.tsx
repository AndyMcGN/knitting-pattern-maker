import { FunctionComponent } from 'react';
import AddManyRowsInput from './AddManyRowsInput';
import { AddCustomRow } from './AddRowInput';
import AddIdenticalRow from './AddRowInput';
import IncreaseOrDecreaseInputContainer from './IncreaseOrDecreaseInput';
import { Button } from '@mui/material';
import AddRowsUpToNInput from './AddRowsUpToNInput';
import { usePatternStore } from '@/app/store';

const EditPatternForm: FunctionComponent = () => {
  const { pattern, setPattern } = usePatternStore((state) => state);

  function deleteLastRow(): void {
    setPattern({ rows: pattern.rows.slice(0, -1) });
  }

  function deletePattern(): void {
    setPattern({ rows: [] });
  }

  return (
    <div>
      <AddCustomRow />
      <AddManyRowsInput />
      <AddRowsUpToNInput />
      {pattern && pattern.rows.length > 0 && (
        <>
          <AddIdenticalRow />
          <IncreaseOrDecreaseInputContainer />
          <Button onClick={() => deleteLastRow()}>Undo Last Row</Button>
          <Button onClick={() => deletePattern()}>DELETE PATTERN</Button>
        </>
      )}
    </div>
  );
};

export default EditPatternForm;
