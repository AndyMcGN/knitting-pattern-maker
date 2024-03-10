import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import AddManyRowsInput from './AddManyRowsInput';
import { AddCustomRow } from './AddRowInput';
import AddIdenticalRow from './AddRowInput';
import IncreaseOrDecreaseInputContainer from './IncreaseOrDecreaseInput';
import { Button } from '@mui/material';
import AddRowsUpToNInput from './AddRowsUpToNInput';

interface EditPatternFormProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
}

const EditPatternForm: FunctionComponent<EditPatternFormProps> = (props: EditPatternFormProps) => {
  const { pattern, setPattern } = props;
  const [numberOfSameRows, setNumberOfSameRows] = useState<number>(3);
  const [currentNumberOfStitches, setCurrentNumberOfStitches] = useState<number>(5);

  function addManyRows(numberOfRows: number) {
    for (let i = 0; i < numberOfRows; i++) {
      addIdenticalRow();
    }
  }
  function addIdenticalRow() {
    const lastRow = pattern.rows[pattern.rows.length - 1].slice();
    updatePatternWithRow(lastRow);
  }

  function addRowWithIncreaseOrDecrease(options: {
    increaseOrDecrease: IncreaseOrDecrease;
    changeAtBeginningOrEnd: StitchChangePlace;
    numberStitchesToChange: number;
  }) {
    const { increaseOrDecrease, changeAtBeginningOrEnd, numberStitchesToChange } = options;
    let changesLeft = 0;
    let changesRight = 0;
    if (changeAtBeginningOrEnd === 'left' || changeAtBeginningOrEnd === 'bothEnds') {
      changesLeft = increaseOrDecrease === 'increase' ? numberStitchesToChange : -numberStitchesToChange;
    }
    if (changeAtBeginningOrEnd === 'right' || changeAtBeginningOrEnd === 'bothEnds') {
      changesRight = increaseOrDecrease === 'increase' ? numberStitchesToChange : -numberStitchesToChange;
    }

    const lastRow = pattern.rows[pattern.rows.length - 1];
    const firstColumnBeforeChange = lastRow.findIndex((val) => val === true);
    const lastColumnBeforeChange = lastRow.findLastIndex((val) => val === true);

    const newRow = [...lastRow];
    const firstStitch = firstColumnBeforeChange - changesLeft;
    const lastColumn = lastColumnBeforeChange + changesRight;
    // rename all these above to old/something not so similar to the below
    const { newEndColumn, newRowLength, newStartColumn } = adjustGridAndIndexesForExtraStitches({
      oldEndColumn: lastColumn,
      oldRowLength: newRow.length,
      oldStartColumn: firstStitch,
    });
    for (let i = 0; i < newRowLength; i++) {
      newRow[i] = newStartColumn <= i && i <= newEndColumn ? true : false;
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

    if (pattern.rows.length === 0) {
      const initialRow = Array(4).fill(false).concat(Array(numberOfStitches).fill(true)).concat(Array(4).fill(false));
      setPattern((prevPattern) => ({ ...prevPattern, rows: [initialRow] }));
      return;
    }
    // if no rows yet or the row number is different
    let lengthOfNewRow = lastRow.length;

    const middleColumn: number = Math.floor((lengthOfNewRow + 1) / 2);
    let startColumn: number = middleColumn - Math.floor(numberOfStitches / 2);

    let endColumn: number = startColumn + numberOfStitches - 1;
    const { newEndColumn, newRowLength, newStartColumn } = adjustGridAndIndexesForExtraStitches({
      oldStartColumn: startColumn,
      oldEndColumn: endColumn,
      oldRowLength: lengthOfNewRow,
    });
    const newRow = Array(newRowLength).fill(false);
    for (let i = newStartColumn; i <= newEndColumn; i++) {
      newRow[i - 1] = true;
    }
    updatePatternWithRow(newRow);
  }

  function adjustGridAndIndexesForExtraStitches(oldValues: {
    oldStartColumn: number;
    oldEndColumn: number;
    oldRowLength: number;
  }): {
    newStartColumn: number;
    newEndColumn: number;
    newRowLength: number;
  } {
    const { oldStartColumn, oldEndColumn, oldRowLength } = oldValues;
    const freeStitchesAtEnd = oldRowLength - oldEndColumn;
    let newStartColumn;
    let newEndColumn;
    let newRowLength;
    if (oldStartColumn < 5 || freeStitchesAtEnd < 2) {
      const extraStitchesNeededAtStart = 5 - oldStartColumn;
      const extraStitchesAtEnd = 5 - freeStitchesAtEnd;
      addExtraStitches({ left: extraStitchesNeededAtStart, right: extraStitchesAtEnd });
      newStartColumn = oldStartColumn + extraStitchesNeededAtStart;
      newEndColumn = oldEndColumn + extraStitchesNeededAtStart;
      newRowLength = oldRowLength + extraStitchesNeededAtStart + extraStitchesAtEnd;
    }

    return {
      newEndColumn: newEndColumn || oldEndColumn,
      newRowLength: newRowLength || oldRowLength,
      newStartColumn: newStartColumn || oldStartColumn,
    };
  }
  function addExtraStitches(extraStitches: { left: number; right: number }) {
    const newRows = pattern.rows.map((row) => {
      let newRow = row.slice();
      for (let i = 0; i < extraStitches.left; i++) {
        newRow.unshift(false);
      }
      for (let i = 0; i < extraStitches.right; i++) {
        newRow.push(false);
      }
      return newRow;
    });
    const patternWithExtraStitches = { ...pattern, rows: newRows };
    setPattern(() => patternWithExtraStitches);
  }

  function updatePatternWithRow(newRow: boolean[]) {
    setPattern((prevPattern: Pattern) => ({
      ...prevPattern,
      rows: [...prevPattern.rows, newRow],
    }));
  }

  function deleteLastRow(): void {
    setPattern((prevPattern) => ({ ...prevPattern, rows: prevPattern.rows.slice(0, -1) }));
  }

  function addRowsUpToN(targetRowNumber: number) {
    const rowsNeeded = targetRowNumber - pattern.rows.length;
    for (let i = 0; i < rowsNeeded; i++) addIdenticalRow();
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
      <AddRowsUpToNInput addRowsUpToN={addRowsUpToN} />
      {pattern && pattern.rows.length > 0 && (
        <>
          <AddIdenticalRow addIdenticalRow={addIdenticalRow} />
          <IncreaseOrDecreaseInputContainer addRowWithIncreaseOrDecrease={addRowWithIncreaseOrDecrease} />
          <Button onClick={() => deleteLastRow()}>Undo Last Row</Button>
        </>
      )}
    </div>
  );
};

export default EditPatternForm;
