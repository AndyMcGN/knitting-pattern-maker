import { addCustomRow, addIdenticalRow } from '@/app/EditPatternFunctions';
import { usePatternStore } from '@/app/store';
import { Button } from '@mui/material';
import { FunctionComponent, useState } from 'react';

export const AddCustomRow: FunctionComponent = (props) => {
  const { pattern } = usePatternStore.getState();
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  return (
    <>
      <p>How many stitches to start with?</p>
      <input
        type="number"
        value={currentNumberOfStitches}
        onChange={(val) => setCurrentNumberOfStitches(Number(val.target.value))}
      />

      <button
        onClick={() => {
          addCustomRow(currentNumberOfStitches);
        }}
      >
        {pattern.rows.length === 0 ? 'Create first row' : 'Add same length row'}
      </button>
    </>
  );
};

const AddIdenticalRow: FunctionComponent = () => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        addIdenticalRow();
      }}
    >
      Add Identical Row
    </Button>
  );
};

export default AddIdenticalRow;
