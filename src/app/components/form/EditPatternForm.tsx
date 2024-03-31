import { FunctionComponent, useState } from 'react';
import AddManyRowsInput from './AddManyRowsInput';
import { AddCustomRow } from './AddRowInput';
import AddIdenticalRow from './AddRowInput';
import IncreaseOrDecreaseInputContainer from './IncreaseOrDecreaseInput';
import { Button } from '@mui/material';
import AddRowsUpToNInput from './AddRowsUpToNInput';
import { usePatternStore } from '@/app/store';
import { EMPTY_STITCH_COLOR } from '@/app/constants';

const EditPatternForm: FunctionComponent = () => {
  const { pattern, setPattern, updatePatternWithRow } = usePatternStore((state) => state);
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
    const firstColumnBeforeChange = lastRow.findIndex((stitch) => stitch.isKnit);
    const lastColumnBeforeChange = lastRow.findLastIndex((stitch) => stitch.isKnit);

    const newRow = [...lastRow];
    const firstStitch = firstColumnBeforeChange - changesLeft;
    const lastColumn = lastColumnBeforeChange + changesRight;
    // rename all these above to old/something not so similar to the below
    const { newEndColumn, newRowLength, newStartColumn } = adjustGridAndIndexesForExtraStitches({
      oldEndColumn: lastColumn,
      oldRowLength: newRow.length,
      oldStartColumn: firstStitch,
    });
    const currentColor = usePatternStore.getState().currentColor;
    for (let i = 0; i < newRowLength; i++) {
      newRow[i] =
        newStartColumn <= i && i <= newEndColumn
          ? { color: currentColor, isKnit: true }
          : { color: EMPTY_STITCH_COLOR, isKnit: false };
    }
    updatePatternWithRow(newRow);
  }

  function addCustomRow(numberOfStitches: number) {
    if (numberOfStitches === 0) return;

    const lastRow = pattern.rows[pattern.rows?.length - 1] || [];
    // adding identical row
    if (lastRow && numberOfStitches === lastRow.filter((stitch) => stitch.isKnit).length) {
      // this is horrible, should probs save the last noOfStitches
      updatePatternWithRow(lastRow);
      return;
    }

    if (pattern.rows.length === 0) {
      const initialRow = Array(4).fill(false).concat(Array(numberOfStitches).fill(true)).concat(Array(4).fill(false));
      setPattern({ ...pattern, rows: [initialRow] });
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
    const newRow = Array(newRowLength).fill({ isKnit: false, color: EMPTY_STITCH_COLOR });
    const { currentColor } = usePatternStore.getState();
    for (let i = newStartColumn; i <= newEndColumn; i++) {
      newRow[i - 1] = { isKnit: true, color: currentColor };
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
        newRow.unshift({ isKnit: false, color: EMPTY_STITCH_COLOR });
      }
      for (let i = 0; i < extraStitches.right; i++) {
        newRow.push({ isKnit: false, color: EMPTY_STITCH_COLOR });
      }
      return newRow;
    });
    const patternWithExtraStitches = { ...pattern, rows: newRows };
    setPattern(patternWithExtraStitches);
  }

  function deleteLastRow(): void {
    setPattern({ rows: pattern.rows.slice(0, -1) });
  }

  function deletePattern(): void {
    setPattern({ rows: [] });
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
          <Button onClick={() => deletePattern()}>DELETE PATTERN</Button>
        </>
      )}
    </div>
  );
};

export default EditPatternForm;
