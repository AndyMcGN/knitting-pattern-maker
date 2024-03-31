import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { usePatternStore } from '../store';
import { hsvaToRgbString } from '@uiw/color-convert';

interface StitchProps {
  isKnit: boolean;
  onClick: () => void;
}

const StyledStitch = styled.div<{ $isKnit: boolean; $currentColor: Color }>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.$isKnit ? hsvaToRgbString(props.$currentColor) : 'white')};
  border: solid 1px black;
  display: inline-block;
`;

const Stitch: FunctionComponent<StitchProps> = (props: StitchProps) => {
  const { isKnit, onClick } = props;
  const { currentColor } = usePatternStore((state) => state);
  return <StyledStitch $isKnit={isKnit} onClick={onClick} $currentColor={currentColor}></StyledStitch>;
};

export default Stitch;
