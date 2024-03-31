import { FunctionComponent, useState } from 'react';
import NumberInput from '../misc/NumberInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addIdenticalRow } from '@/app/EditPatternFunctions';
import { usePatternStore } from '@/app/store';

function addRowsUpToN(targetRowNumber: number) {
  const { pattern } = usePatternStore.getState();
  const rowsNeeded = targetRowNumber - pattern.rows.length;
  for (let i = 0; i < rowsNeeded; i++) addIdenticalRow();
}
const AddRowsUpToNInput: FunctionComponent = () => {
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
