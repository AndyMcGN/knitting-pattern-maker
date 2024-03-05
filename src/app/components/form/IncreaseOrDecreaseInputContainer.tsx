import { FunctionComponent, SetStateAction, useState } from 'react';
import IncreaseOrDecreaseInput from './IncreaseOrDecreaseInput';

interface IncreaseOrDecreaseInputContainerProps {
  currentNumberOfStitches: number;
}

const IncreaseOrDecreaseInputContainer: FunctionComponent<IncreaseOrDecreaseInputContainerProps> = (
  props: IncreaseOrDecreaseInputContainerProps,
) => {
  const { currentNumberOfStitches } = props;
  const [increaseOrDecrease, setIncreaseOrDecrease] = useState<IncreaseOrDecrease>('increase');
  const [numberStitchesToChange, setNumberStitchesToChange] = useState<number>(0);
  const [changeAtBeginningOrEnd, setChangeAtBeginningOrEnd] = useState<StitchChangePlace>('end');
  function addDifferentRow() {
    console.log({ increaseOrDecrease, numberStitchesToChange, changeAtBeginningOrEnd });
  }
  return (
    <IncreaseOrDecreaseInput
      increaseOrDecrease={increaseOrDecrease}
      numberStitchesToChange={numberStitchesToChange}
      setNumberStitchesToChange={setNumberStitchesToChange}
      currentNumberOfStitches={currentNumberOfStitches}
      changeAtBeginningOrEnd={changeAtBeginningOrEnd}
      setIncreaseOrDecrease={setIncreaseOrDecrease}
      setChangeAtBeginningOrEnd={setChangeAtBeginningOrEnd}
      addDifferentRow={addDifferentRow}
    />
  );
};

export default IncreaseOrDecreaseInputContainer;
