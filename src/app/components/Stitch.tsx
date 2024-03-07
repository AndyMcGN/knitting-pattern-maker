import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface StitchProps {
  isKnit: boolean;
  onClick: () => void;
}

const StyledStitch = styled.div<{ $isKnit: boolean }>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.$isKnit ? 'blue' : 'white')};
  border: solid 1px black;
  display: inline-block;
`;

const Stitch: FunctionComponent<StitchProps> = (props: StitchProps) => {
  const { isKnit, onClick } = props;
  return <StyledStitch $isKnit={isKnit} onClick={onClick}></StyledStitch>;
};

export default Stitch;
