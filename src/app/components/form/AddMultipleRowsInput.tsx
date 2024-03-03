import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface AddManyRowsInputProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
  currentNumberOfStitches: number;
  numberOfSameRows: number;
  setNumberOfSameRows: Dispatch<SetStateAction<number>>;
}

const AddManyRowsInput: FunctionComponent<AddManyRowsInputProps> = (props: AddManyRowsInputProps) => {
  const { pattern, setPattern, currentNumberOfStitches, numberOfSameRows, setNumberOfSameRows } = props;
  function addMultipleRows(numberOfStitches: number, numberOfSameRows: number) {
    console.log({ numberOfSameRows, numberOfStitches, pattern });
    const newRows: any = [];
    for (let i = 0; i < numberOfSameRows; i++) {
      newRows.push(Array(numberOfStitches).fill(true));
    }
    setPattern((prevPattern) => {
      return {
        ...prevPattern,
        rows: [...prevPattern.rows, ...newRows],
      };
    });
    console.log({ pattern });
  }

  return (
    <div>
      <span>Create</span>
      <input
        type="number"
        value={numberOfSameRows}
        onChange={(val) => setNumberOfSameRows(Number(val.target.value))}
      ></input>
      <span> identical rows with {currentNumberOfStitches} stitches</span>
      <button
        onClick={() => {
          addMultipleRows(currentNumberOfStitches, numberOfSameRows);
        }}
      >
        Add rows
      </button>
    </div>
  );
};

export default AddManyRowsInput;
