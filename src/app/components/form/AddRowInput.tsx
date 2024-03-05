import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface AddCustomRowProps {
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Dispatch<SetStateAction<number>>;
  addCustomRow: (numberOfStitches: number) => void;
  pattern: Pattern;
}

export const AddCustomRow: FunctionComponent<AddCustomRowProps> = (props) => {
  const { currentNumberOfStitches, addCustomRow, pattern, setCurrentNumberOfStitches } = props;
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

interface AddIdenticalRowProps {
  addIdenticalRow: () => void;
}

const AddIdenticalRow: FunctionComponent<AddIdenticalRowProps> = (props: AddIdenticalRowProps) => {
  const { addIdenticalRow } = props;
  return (
    <button
      onClick={() => {
        addIdenticalRow();
      }}
    >
      Add Identical Row
    </button>
  );
};

export default AddIdenticalRow;
