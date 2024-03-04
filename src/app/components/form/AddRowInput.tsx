import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';

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
  const [numberOfSameRows, setNumberOfSameRows] = useState<number>(3);

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
  function addManyRows(numberOfStitches: number, numberOfRows: number) {
    for (let i = 0; i < numberOfRows; i++) {
      addRow(numberOfStitches);
    }
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
          addRow(currentNumberOfStitches);
        }}
      >
        {pattern.rows.length === 0 ? 'Create first row' : 'Add same length row'}
      </button>

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
            addManyRows(currentNumberOfStitches, numberOfSameRows);
          }}
        >
          Add rows
        </button>
      </div>
    </div>
  );
};

export default AddRowInput;
