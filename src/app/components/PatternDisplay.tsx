import { Dispatch, FunctionComponent, Key, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import Stitch from './Stitch';

interface PatternDisplayProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
}
const StyledPatternDisplay = styled.div`
  padding: 3rem 0;
  min-height: 60%;
  background-color: #dfdfdf;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const PatternDisplay: FunctionComponent<PatternDisplayProps> = (props) => {
  const { pattern, setPattern } = props;
  return (
    <StyledPatternDisplay>
      {/* {pattern.rows.map((row: boolean[], index: Key | null | undefined) => (
        <Row key={index} row={row} />
      ))} */}
      <Grid pattern={pattern} setPattern={setPattern} />
    </StyledPatternDisplay>
  );
};

interface GridProps {
  pattern: Pattern;
  setPattern: Dispatch<SetStateAction<Pattern>>;
}
const StyledRow = styled.div<{ $index: number }>`
  font-size: 0;
  white-space: nowrap;
  position: relative;
  &::after {
    content: '${(props) => props.$index + 1}';
    font-size: 10px;
    position: absolute;
    top: 4px;
    left: -15px;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

export const Grid: FunctionComponent<GridProps> = (props: GridProps) => {
  const { pattern, setPattern } = props;

  function toggleEmptyStitch(rowIndex: number, colIndex: number) {
    const updatedRows = pattern.rows;
    updatedRows[rowIndex][colIndex] = !updatedRows[rowIndex][colIndex];
    setPattern({ ...pattern, rows: updatedRows });
  }

  return (
    <StyledGrid>
      {pattern &&
        pattern.rows &&
        pattern.rows.map((row, rowIndex) => (
          <StyledRow key={rowIndex} $index={rowIndex}>
            {row.map((stitch, colIndex) => {
              return <Stitch isKnit={stitch} key={colIndex} onClick={() => toggleEmptyStitch(rowIndex, colIndex)} />;
            })}
          </StyledRow>
        ))}
    </StyledGrid>
  );
};

interface RowProps {
  row: boolean[];
}

export default PatternDisplay;
