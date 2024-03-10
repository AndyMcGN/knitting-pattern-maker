import { FunctionComponent, useState } from 'react';
import NumberInput from '../misc/NumberInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AddRowsUpToNInputProps {
  addRowsUpToN: (targetRowNumber: number) => void;
}

const AddRowsUpToNInput: FunctionComponent<AddRowsUpToNInputProps> = ({ addRowsUpToN }) => {
  const [targetRows, setTargetRows] = useState(0);
  return (
    <div>
      <span>Add identical rows up until row</span>
      <NumberInput value={targetRows} onChange={setTargetRows} />
      <CheckCircleIcon
        color="success"
        fontSize="large"
        sx={{ display: 'inline' }}
        onClick={() => addRowsUpToN(targetRows)}
      />
    </div>
  );
};

export default AddRowsUpToNInput;
