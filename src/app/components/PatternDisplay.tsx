import { Dispatch, FunctionComponent, Key, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import Stitch from './Stitch';
import { hsvaToHex } from '@uiw/color-convert';
import { usePatternStore } from '../store';

const StyledPatternDisplay = styled.div`
  padding: 3rem 0;
  min-height: 60%;
  background-color: #dfdfdf;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const PatternDisplay: FunctionComponent = (props) => {
  const { currentColor } = usePatternStore((state) => state);
  return (
    <StyledPatternDisplay>
      <Grid />{' '}
      <div style={{ background: hsvaToHex(currentColor), marginTop: 30, padding: 10 }}>
        {JSON.stringify(currentColor)}
      </div>
    </StyledPatternDisplay>
  );
};

interface GridProps {}
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
  cursor: crosshair;
`;

export const Grid: FunctionComponent<GridProps> = (props: GridProps) => {
  const { pattern, setPattern } = usePatternStore((state) => state);

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

export default PatternDisplay;
