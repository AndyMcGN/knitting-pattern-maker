import { Box } from '@mui/material';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface GridSizeInputProps {
  setGridSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  gridSize: {
    width: number;
    height: number;
  };
}

const GridSizeInput: FunctionComponent<GridSizeInputProps> = (props: GridSizeInputProps) => {
  const {
    gridSize: { width, height },
    setGridSize,
  } = props;
  const updateGrid = (newValue: number, propertyToUpdate: 'width' | 'height') => {
    const newGrid = { ...props.gridSize };
    newGrid[propertyToUpdate] = newValue;
    setGridSize(newGrid);
  };

  return (
    <Box>
      <p>How big should the grid be?</p>
      <span>Width: </span>
      <input type="number" value={width} step={2} onChange={(e) => updateGrid(Number(e.target.value), 'width')}></input>
      <span>Height: </span>
      <input type="number" value={height} onChange={(e) => updateGrid(Number(e.target.value), 'height')}></input>
    </Box>
  );
};

export default GridSizeInput;
