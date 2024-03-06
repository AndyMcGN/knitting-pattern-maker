import { FunctionComponent, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import styled from 'styled-components';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface IncreaseOrDecreaseInputContainerProps {
  currentNumberOfStitches: number;
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

  const StyledButton = styled.button`
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `;
  const StyledInputRoot = styled.div`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
  `;
  const StyledInput = styled.input`
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 4rem;
    text-align: center;
  `;
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
      <BaseNumberInput
        min={1}
        value={numberStitchesToChange}
        onChange={(event, newValue) => setNumberStitchesToChange(newValue || 0)}
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <AddIcon fontSize="small" />,
            className: 'increment',
          },
          decrementButton: {
            children: <RemoveIcon fontSize="small" />,
          },
        }}
        {...props}
      />

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
