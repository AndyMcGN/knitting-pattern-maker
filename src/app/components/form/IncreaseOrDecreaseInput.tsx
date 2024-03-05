import { Box, MenuItem, Select } from '@mui/material';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IncreaseOrDecreaseInputProps {
  increaseOrDecrease: IncreaseOrDecrease;
  setIncreaseOrDecrease: Dispatch<SetStateAction<IncreaseOrDecrease>>;
  numberStitchesToChange: number;
  setNumberStitchesToChange: Dispatch<SetStateAction<number>>;
  currentNumberOfStitches: number;
  changeAtBeginningOrEnd: StitchChangePlace;
  setChangeAtBeginningOrEnd: Dispatch<SetStateAction<StitchChangePlace>>;
  addDifferentRow: Function;
}
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
const IncreaseOrDecreaseInput: FunctionComponent<IncreaseOrDecreaseInputProps> = (
  props: IncreaseOrDecreaseInputProps,
) => {
  const {
    changeAtBeginningOrEnd,
    increaseOrDecrease,
    setIncreaseOrDecrease,
    numberStitchesToChange,
    setNumberStitchesToChange,
    setChangeAtBeginningOrEnd,
    addDifferentRow,
  } = props;

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
        min={0}
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
        <MenuItem value={'beginning'}>beginning</MenuItem>
        <MenuItem value={'end'}>end</MenuItem>
        <MenuItem value={'bothEnds'}>both ends</MenuItem>
      </Select>
      <span>of the row</span>
      <CheckCircleIcon color="success" fontSize="large" sx={{ display: 'inline' }} onClick={() => addDifferentRow()} />
    </Box>
  );
};

export default IncreaseOrDecreaseInput;
