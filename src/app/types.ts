interface Pattern {
  rows: boolean[][];
}

interface GridSize {
  height: number;
  width: number;
}

type IncreaseOrDecrease = 'increase' | 'decrease';
type StitchChangePlace = 'left' | 'right' | 'bothEnds';
