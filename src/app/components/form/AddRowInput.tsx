import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface AddRowInputProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Dispatch<SetStateAction<number>>;
  gridSize: GridSize;
}

const AddRowInput: FunctionComponent<AddRowInputProps> = (props: AddRowInputProps) => {
  const {
    pattern,
    currentNumberOfStitches,
    setCurrentNumberOfStitches,
    setPattern,
    gridSize: { width: gridWidth, height: gridHeight },
  } = props;

  function addRow(numberOfStitches: number) {
    if (numberOfStitches === 0) return;

    const middleColumn: number = Math.floor((gridWidth + 1) / 2);
    const startColumn: number = middleColumn - Math.floor(numberOfStitches / 2);
    // if (startColumn < 0) {
    //   const extraSquaresNeeded = Math.abs(startColumn) + 4;
    //   const patternWithExtraRows = pattern.rows.map((row) => {
    //     for (let i = 0; i < extraSquaresNeeded; i++) {
    //       row.unshift(false);
    //       row.push(false);
    //       return row;
    //     }
    //   });
    //   setPattern((prevPattern) => ({
    //     ...prevPattern,
    //     rows: (patternWithExtraRows as boolean[][])
    //   }));
    // }

    // If numberOfStitches is odd, choose the right middle column
    const endColumn: number = startColumn + numberOfStitches - 1;
    console.log({ gridWidth, startColumn, endColumn, middleColumn });

    updatePattern(startColumn, endColumn);
  }

  function updatePattern(startColumn: number, endColumn: number) {
    const newRow = Array(gridWidth).fill(false);
    for (let i = startColumn; i <= endColumn; i++) {
      newRow[i - 1] = true;
    }

    setPattern((prevPattern) => ({
      ...prevPattern,
      rows: [...prevPattern.rows, newRow],
    }));
    console.log(pattern);
  }
  return (
    <div>
      {pattern.rows.length === 0 && (
        <>
          <p>How many stitches to start with?</p>
          <input
            type="number"
            value={currentNumberOfStitches}
            onChange={(val) => setCurrentNumberOfStitches(Number(val.target.value))}
            max={100}
          />
        </>
      )}
      <button
        onClick={() => {
          console.log(currentNumberOfStitches);
          addRow(currentNumberOfStitches);
        }}
      >
        {pattern.rows.length === 0 ? 'Create first row' : 'Add same length row'}
      </button>
    </div>
  );
};

export default AddRowInput;
