import { FunctionComponent } from "react";
import styled from "styled-components";

interface StitchProps {
    
}

const StyledStitch = styled.div`
    height: 20px;
    width: 20px;
    background-color: red;
`
 
const Stitch: FunctionComponent<StitchProps> = (props: StitchProps) => {
    return ( <StyledStitch></StyledStitch> );
}
 
export default Stitch;