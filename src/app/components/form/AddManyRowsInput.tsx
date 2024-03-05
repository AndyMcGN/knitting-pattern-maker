import { Dispatch, SetStateAction, FunctionComponent } from 'react';

interface AddManyRowsInputProps {
  numberOfSameRows: number;
  setNumberOfSameRows: Dispatch<SetStateAction<number>>;
  currentNumberOfStitches: number;
  addManyRows: (numberOfRows: number) => void;
}

const AddManyRowsInput: FunctionComponent<AddManyRowsInputProps> = (props: AddManyRowsInputProps) => {
  const { addManyRows, currentNumberOfStitches, numberOfSameRows, setNumberOfSameRows } = props;
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
