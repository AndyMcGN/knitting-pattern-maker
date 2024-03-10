import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import styled from 'styled-components';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { FunctionComponent, SetStateAction } from 'react';
interface NumberInputProps {
  value: any;
  onChange: (value: SetStateAction<number>) => void;
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
const NumberInput: FunctionComponent<NumberInputProps> = (props: NumberInputProps) => {
  const { onChange, value } = props;
  return (
    <BaseNumberInput
      min={1}
      value={value}
      onChange={(event, newValue) => onChange(newValue || 0)}
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
    />
  );
};

export default NumberInput;
