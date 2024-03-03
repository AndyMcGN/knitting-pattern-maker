import { FunctionComponent, Key, useEffect } from 'react';
import styled from 'styled-components';
import Stitch from './Stitch';

interface PatternDisplayProps {
  pattern: Pattern;
  gridSize: GridSize;
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
  const { pattern, gridSize } = props;
  return (
    <StyledPatternDisplay>
      {/* {pattern.rows.map((row: boolean[], index: Key | null | undefined) => (
        <Row key={index} row={row} />
      ))} */}
      <Grid gridSize={gridSize} pattern={pattern} />
    </StyledPatternDisplay>
  );
};

interface GridProps {
  gridSize: GridSize;
  pattern: Pattern;
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
  const {
    gridSize: { width, height },
    pattern,
  } = props;
  console.log(pattern);
  return (
    <StyledGrid>
      {pattern &&
        pattern.rows &&
        pattern.rows.map((row, rowIndex) => (
          <StyledRow key={rowIndex} $index={rowIndex}>
            {row.map((stitch, colIndex) => {
              return <Stitch isKnit={stitch} key={colIndex} />;
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
