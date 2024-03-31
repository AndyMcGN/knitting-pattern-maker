import { EMPTY_STITCH_COLOR } from './constants';
import { usePatternStore } from './store';

export function addIdenticalRow() {
  const { pattern, updatePatternWithRow } = usePatternStore.getState();
  const lastRow = pattern.rows[pattern.rows.length - 1].slice();
  updatePatternWithRow(lastRow);
}

export function adjustGridAndIndexesForExtraStitches(oldValues: {
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
  const { pattern, setPattern } = usePatternStore.getState();
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

export function addCustomRow(numberOfStitches: number) {
  const { pattern, setPattern, updatePatternWithRow } = usePatternStore.getState();

  if (numberOfStitches === 0) return;
  const { currentColor } = usePatternStore.getState();

  const lastRow = pattern.rows[pattern.rows?.length - 1] || [];
  // adding identical row
  if (lastRow && numberOfStitches === lastRow.filter((stitch) => stitch.isKnit).length) {
    // this is horrible, should probs save the last noOfStitches
    updatePatternWithRow(lastRow);
    return;
  }
  if (pattern.rows.length === 0) {
    const initialRow = Array(4)
      .fill({ isKnit: false, color: EMPTY_STITCH_COLOR })
      .concat(Array(numberOfStitches).fill({ isKnit: true, color: currentColor }))
      .concat(Array(4).fill(false));
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
  for (let i = newStartColumn; i <= newEndColumn; i++) {
    newRow[i - 1] = { isKnit: true, color: currentColor };
  }
  updatePatternWithRow(newRow);
}
