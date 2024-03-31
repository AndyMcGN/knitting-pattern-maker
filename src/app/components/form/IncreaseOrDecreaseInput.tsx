import { FunctionComponent, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NumberInput from '../misc/NumberInput';
import { EMPTY_STITCH_COLOR } from '@/app/constants';
import { usePatternStore } from '@/app/store';
import { adjustGridAndIndexesForExtraStitches } from '@/app/EditPatternFunctions';

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
  const { pattern, updatePatternWithRow } = usePatternStore.getState();
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

const IncreaseOrDecreaseInputContainer: FunctionComponent = () => {
  const [increaseOrDecrease, setIncreaseOrDecrease] = useState<IncreaseOrDecrease>('increase');
  const [numberStitchesToChange, setNumberStitchesToChange] = useState<number>(1);
  const [changeAtBeginningOrEnd, setChangeAtBeginningOrEnd] = useState<StitchChangePlace>('left');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Select
        value={increaseOrDecrease}
        variant="standard"
        onChange={(event) => setIncreaseOrDecrease(event.target.value as IncreaseOrDecrease)}
      >
        <MenuItem value={'increase'}>Increase</MenuItem>
        <MenuItem value={'decrease'}>Decrease</MenuItem>
      </Select>
      <NumberInput onChange={setNumberStitchesToChange} value={numberStitchesToChange} />
      <span>stitches at the </span>
      <Select
        value={changeAtBeginningOrEnd}
        variant="standard"
        sx={{ marginLeft: '10px' }}
        onChange={(event) => setChangeAtBeginningOrEnd(event.target.value as StitchChangePlace)}
      >
        <MenuItem value={'left'}>left</MenuItem>
        <MenuItem value={'right'}>right</MenuItem>
        <MenuItem value={'bothEnds'}>both ends</MenuItem>
      </Select>
      <span>of the row</span>
      <CheckCircleIcon
        color="success"
        fontSize="large"
        sx={{ display: 'inline' }}
        onClick={() =>
          addRowWithIncreaseOrDecrease({ increaseOrDecrease, changeAtBeginningOrEnd, numberStitchesToChange })
        }
      />
    </Box>
  );
};

export default IncreaseOrDecreaseInputContainer;
