import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import AddManyRowsInput from './AddManyRowsInput';
import AddRowInput from './AddRowInput';

interface AddIdenticalRowsInputsContainerProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Dispatch<SetStateAction<number>>;
  gridSize: GridSize;
  setGridSize: Dispatch<SetStateAction<GridSize>>;
}

const AddIdenticalRowsInputsContainer: FunctionComponent<AddIdenticalRowsInputsContainerProps> = (
  props: AddIdenticalRowsInputsContainerProps,
) => {
  const {
    pattern,
    currentNumberOfStitches,
    setCurrentNumberOfStitches,
    setPattern,
    gridSize: { width: gridWidth },
    setGridSize,
  } = props;
  const [numberOfSameRows, setNumberOfSameRows] = useState<number>(3);

  function addManyRows(numberOfStitches: number, numberOfRows: number) {
    for (let i = 0; i < numberOfRows; i++) {
      addRow(numberOfStitches);
    }
  }

  function addRow(numberOfStitches: number) {
    if (numberOfStitches === 0) return;
    // Have a few empty stitches outside pattern.
    let correctGridWidth = gridWidth;
    if (numberOfStitches + 8 > gridWidth) {
      correctGridWidth = numberOfStitches + 8;

      setGridSize((prevGridSize: GridSize) => ({ ...prevGridSize, width: correctGridWidth }));
    }
    const middleColumn: number = Math.floor((correctGridWidth + 1) / 2);
    const startColumn: number = middleColumn - Math.floor(numberOfStitches / 2);

    // If numberOfStitches is odd, choose the right middle column
    const endColumn: number = startColumn + numberOfStitches - 1;
    console.log({ gridWidth, startColumn, endColumn, middleColumn });

    updatePatternWithRow(startColumn, endColumn, correctGridWidth);
  }

  function updatePatternWithRow(startColumn: number, endColumn: number, updatedGridLength: number) {
    const newRow = Array(updatedGridLength).fill(false);
    for (let i = startColumn; i <= endColumn; i++) {
      newRow[i - 1] = true;
    }

    setPattern((prevPattern: Pattern) => ({
      ...prevPattern,
      rows: [...prevPattern.rows, newRow],
    }));
  }

  return (
    <div>
      <AddRowInput
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
        addRow={addRow}
        pattern={pattern}
      />
      <AddManyRowsInput
        numberOfSameRows={numberOfSameRows}
        setNumberOfSameRows={setNumberOfSameRows}
        currentNumberOfStitches={currentNumberOfStitches}
        addManyRows={addManyRows}
      />
    </div>
  );
};

export default AddIdenticalRowsInputsContainer;
