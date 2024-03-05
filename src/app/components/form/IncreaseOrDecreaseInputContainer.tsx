import { FunctionComponent, SetStateAction, useState } from 'react';
import IncreaseOrDecreaseInput from './IncreaseOrDecreaseInput';

interface IncreaseOrDecreaseInputContainerProps {
  currentNumberOfStitches: number;
  addRowWithIncreaseOrDecrease: (changes: { changesLeft: number; changesRight: number }) => void;
}

const IncreaseOrDecreaseInputContainer: FunctionComponent<IncreaseOrDecreaseInputContainerProps> = (
  props: IncreaseOrDecreaseInputContainerProps,
) => {
  const { currentNumberOfStitches, addRowWithIncreaseOrDecrease } = props;
  const [increaseOrDecrease, setIncreaseOrDecrease] = useState<IncreaseOrDecrease>('increase');
  const [numberStitchesToChange, setNumberStitchesToChange] = useState<number>(0);
  const [changeAtBeginningOrEnd, setChangeAtBeginningOrEnd] = useState<StitchChangePlace>('left');

  return (
    <IncreaseOrDecreaseInput
      increaseOrDecrease={increaseOrDecrease}
      numberStitchesToChange={numberStitchesToChange}
      setNumberStitchesToChange={setNumberStitchesToChange}
      currentNumberOfStitches={currentNumberOfStitches}
      changeAtBeginningOrEnd={changeAtBeginningOrEnd}
      setIncreaseOrDecrease={setIncreaseOrDecrease}
      setChangeAtBeginningOrEnd={setChangeAtBeginningOrEnd}
      addRowWithIncreaseOrDecrease={addRowWithIncreaseOrDecrease}
    />
  );
};

export default IncreaseOrDecreaseInputContainer;
