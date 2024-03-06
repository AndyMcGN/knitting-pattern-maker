import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import AddManyRowsInput from './AddManyRowsInput';
import { AddCustomRow } from './AddRowInput';
import AddIdenticalRow from './AddRowInput';
import IncreaseOrDecreaseInputContainer from './IncreaseOrDecreaseInputContainer';

interface AddRowsInputsContainerProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
  currentNumberOfStitches: number;
  setCurrentNumberOfStitches: Dispatch<SetStateAction<number>>;
}

const AddRowsInputsContainer: FunctionComponent<AddRowsInputsContainerProps> = (props: AddRowsInputsContainerProps) => {
  const { pattern, currentNumberOfStitches, setCurrentNumberOfStitches, setPattern } = props;
  const [numberOfSameRows, setNumberOfSameRows] = useState<number>(3);

  function addManyRows(numberOfRows: number) {
    for (let i = 0; i < numberOfRows; i++) {
      addIdenticalRow();
    }
  }
  function addIdenticalRow() {
    const lastRow = pattern.rows[pattern.rows.length - 1];
    updatePatternWithRow(lastRow);
  }
  function addRowWithIncreaseOrDecrease(changes: { changesLeft: number; changesRight: number }) {
    const lastRow = pattern.rows[pattern.rows.length - 1];
    const oldFirstStitch = lastRow.findIndex((val) => val === true);
    const oldLastStitch = lastRow.findLastIndex((val) => val === true);

    const newRow = [...lastRow];
    const newFirstStitch = oldFirstStitch - changes.changesLeft;
    const newLastStitch = oldLastStitch + changes.changesRight;
    for (let i = 0; i < lastRow.length; i++) {
      newRow[i] = newFirstStitch <= i && i <= newLastStitch ? true : false;
    }
    updatePatternWithRow(newRow);
  }

  function addCustomRow(numberOfStitches: number) {
    if (numberOfStitches === 0) return;

    const lastRow = pattern.rows[pattern.rows?.length - 1] || [];
    // adding identical row
    if (lastRow && numberOfStitches === lastRow.filter((stitch) => Boolean(stitch)).length) {
      // this is horrible, should probs save the last noOfStitches
      updatePatternWithRow(lastRow);
      return;
    }
    // if no rows yet or the row number is different
    let lengthOfNewRow = lastRow.length;
    if (numberOfStitches + 8 > lastRow.length) {
      lengthOfNewRow = numberOfStitches + 8;
      addExtraStitchesToPattern(lengthOfNewRow);
    }
    const middleColumn: number = Math.floor((lengthOfNewRow + 1) / 2);
    const startColumn: number = middleColumn - Math.floor(numberOfStitches / 2);

    const endColumn: number = startColumn + numberOfStitches - 1;

    const newRow = Array(lengthOfNewRow).fill(false);
    for (let i = startColumn; i <= endColumn; i++) {
      newRow[i - 1] = true;
    }
    updatePatternWithRow(newRow);
  }

  //   create row
  function addExtraStitchesToPattern(newRowLength: number) {
    const patternWithExtraStitches = pattern;
    for (const row of patternWithExtraStitches.rows) {
      if (row.length < newRowLength) {
        const extraStitchesOnEachEnd = Math.floor((newRowLength - row.length) / 2);
        for (let i = 0; i < extraStitchesOnEachEnd; i++) {
          row.unshift(false);
          row.push(false);
        }
      }
    }
    setPattern(() => patternWithExtraStitches);
  }
  function updatePatternWithRow(newRow: boolean[]) {
    setPattern((prevPattern: Pattern) => ({
      ...prevPattern,
      rows: [...prevPattern.rows, newRow],
    }));
  }

  return (
    <div>
      <AddCustomRow
        currentNumberOfStitches={currentNumberOfStitches}
        setCurrentNumberOfStitches={setCurrentNumberOfStitches}
        addCustomRow={addCustomRow}
        pattern={pattern}
      />
      <AddManyRowsInput
        numberOfSameRows={numberOfSameRows}
        setNumberOfSameRows={setNumberOfSameRows}
        currentNumberOfStitches={currentNumberOfStitches}
        addManyRows={addManyRows}
      />
      {pattern && pattern.rows.length > 0 && (
        <>
          <AddIdenticalRow addIdenticalRow={addIdenticalRow} />
          <IncreaseOrDecreaseInputContainer
            currentNumberOfStitches={currentNumberOfStitches}
            addRowWithIncreaseOrDecrease={addRowWithIncreaseOrDecrease}
          />
        </>
      )}
    </div>
  );
};

export default AddRowsInputsContainer;
