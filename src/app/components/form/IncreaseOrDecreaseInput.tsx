import { FunctionComponent, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from 'styled-components';
import NumberInput from '../misc/NumberInput';

interface IncreaseOrDecreaseInputContainerProps {
  addRowWithIncreaseOrDecrease: (options: {
    increaseOrDecrease: IncreaseOrDecrease;
    changeAtBeginningOrEnd: StitchChangePlace;
    numberStitchesToChange: number;
  }) => void;
}
const IncreaseOrDecreaseInputContainer: FunctionComponent<IncreaseOrDecreaseInputContainerProps> = (
  props: IncreaseOrDecreaseInputContainerProps,
) => {
  const { addRowWithIncreaseOrDecrease } = props;
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
