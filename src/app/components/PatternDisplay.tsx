import { FunctionComponent } from "react";
import styled from "styled-components";
import Stitch from "./Stitch";

interface PatternDisplayProps {
    
}
const StyledPatternDisplay = styled.div`
    padding: 3rem 0 ;
    min-height: 60%;
    width: 50%;
    background-color: #dfdfdf;
    display: flex;
    justify-content: center;

`
 
const PatternDisplay: FunctionComponent<PatternDisplayProps> = () => {
    return ( 
    <StyledPatternDisplay >
        <Stitch>
        </Stitch>
    </StyledPatternDisplay > );
}
 
export default PatternDisplay;