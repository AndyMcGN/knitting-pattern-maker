import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface AddRowInputProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Dispatch<SetStateAction<number>>;
  gridSize: GridSize;
  setGridSize: Dispatch<SetStateAction<GridSize>>;
}

const AddRowInput: FunctionComponent<AddRowInputProps> = (props: AddRowInputProps) => {
  const {
    pattern,
    currentNumberOfStitches,
    setCurrentNumberOfStitches,
    setPattern,
    gridSize: { width: gridWidth },
    setGridSize,
  } = props;

  function addRow(numberOfStitches: number) {
    if (numberOfStitches === 0) return;
    // Have a few empty stitches outside pattern.
    let correctGridWidth = gridWidth;
    if (numberOfStitches + 8 > gridWidth) {
      correctGridWidth = numberOfStitches + 8;

      setGridSize((prevGridSize) => ({ ...prevGridSize, width: correctGridWidth }));
    }
    const middleColumn: number = Math.floor((correctGridWidth + 1) / 2);
    const startColumn: number = middleColumn - Math.floor(numberOfStitches / 2);

    // If numberOfStitches is odd, choose the right middle column
    const endColumn: number = startColumn + numberOfStitches - 1;
    console.log({ gridWidth, startColumn, endColumn, middleColumn });

    updatePattern(startColumn, endColumn, correctGridWidth);
  }

  function updatePattern(startColumn: number, endColumn: number, updatedGridLength: number) {
    const newRow = Array(updatedGridLength).fill(false);
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
      <>
        <p>How many stitches to start with?</p>
        <input
          type="number"
          value={currentNumberOfStitches}
          onChange={(val) => setCurrentNumberOfStitches(Number(val.target.value))}
        />
      </>
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
function isEven(n: number) {
  n = Number(n);
  return n === 0 || !!(n && !(n % 2));
}
