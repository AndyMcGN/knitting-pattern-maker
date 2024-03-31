interface Pattern {
  rows: Row[];
}

type Row = StitchConfig[];
interface StitchConfig {
  color: Color;
  isKnit: boolean;
}
interface GridSize {
  height: number;
  width: number;
}

type IncreaseOrDecrease = 'increase' | 'decrease';
type StitchChangePlace = 'left' | 'right' | 'bothEnds';

interface Color {
  h: number;
  s: number;
  v: number;
  a: number;
}
