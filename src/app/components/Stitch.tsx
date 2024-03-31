import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { hsvaToRgbString } from '@uiw/color-convert';
import { EMPTY_STITCH_COLOR } from '../constants';

interface StitchProps {
  isKnit: boolean;
  onClick: () => void;
  color: Color;
}

const StyledStitch = styled.div<{ $isKnit: boolean; $color: Color }>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.$isKnit ? hsvaToRgbString(props.$color) : EMPTY_STITCH_COLOR)};
  border: solid 1px black;
  display: inline-block;
`;

const Stitch: FunctionComponent<StitchProps> = (props: StitchProps) => {
  const { isKnit, onClick, color } = props;
  return <StyledStitch $isKnit={isKnit} onClick={onClick} $color={color}></StyledStitch>;
};

export default Stitch;
