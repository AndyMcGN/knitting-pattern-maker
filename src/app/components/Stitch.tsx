import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface StitchProps {
  isKnit: boolean;
}

const StyledStitch = styled.div<{ $isKnit: boolean }>`
  height: 20px;
  width: 20px;
  background-color: ${(props) => (props.$isKnit ? 'blue' : 'white')};
  border: solid 1px black;
  display: inline-block;
`;

const Stitch: FunctionComponent<StitchProps> = (props: StitchProps) => {
  return <StyledStitch $isKnit={props.isKnit}></StyledStitch>;
};

export default Stitch;
