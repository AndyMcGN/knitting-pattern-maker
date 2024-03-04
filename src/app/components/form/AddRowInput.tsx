import { FunctionComponent } from 'react';

interface AddRowInputProps {
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Function;
  addRow: Function;
  pattern: Pattern;
}

const AddRowInput: FunctionComponent<AddRowInputProps> = (props) => {
  const { currentNumberOfStitches, addRow, pattern, setCurrentNumberOfStitches } = props;
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
          addRow(currentNumberOfStitches);
        }}
      >
        {pattern.rows.length === 0 ? 'Create first row' : 'Add same length row'}
      </button>
    </>
  );
};

export default AddRowInput;
