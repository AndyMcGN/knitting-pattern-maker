import { addIdenticalRow } from '@/app/EditPatternFunctions';
import { usePatternStore } from '@/app/store';
import { FunctionComponent, useState } from 'react';


  function addManyRows(numberOfRows: number) {
    for (let i = 0; i < numberOfRows; i++) {
      addIdenticalRow();
    }
  }
const AddManyRowsInput: FunctionComponent = () => {
  const [numberOfSameRows, setNumberOfSameRows] = useState<number>(3);
  const { pattern } = usePatternStore((state) => state);
  const currentNumberOfStitches = pattern.rows[pattern.rows.length - 1]?.filter((stitch) => stitch.isKnit).length || 0;
  return (
    <div>
      <span>Create</span>
      <input
        type="number"
        value={numberOfSameRows}
        onChange={(event) => setNumberOfSameRows(Number(event.target.value))}
      ></input>
      <span> identical rows with {currentNumberOfStitches} stitches</span>
      <button
        onClick={() => {
          addManyRows(numberOfSameRows);
        }}
      >
        Add rows
      </button>
    </div>
  );
};

export default AddManyRowsInput;
