import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
interface AppState {
  pattern: Pattern;
  setPattern: (pattern: Pattern) => void;
  currentColor: Color;
  updatePatternWithRow: (newRow: Row) => void;
  setCurrentColor: (color: Color) => void;
}

export const usePatternStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        pattern: { rows: [] },
        currentColor: { a: 0, h: 0, s: 0, v: 0 },
        setPattern: (newState) => set(() => ({ pattern: newState })),
        updatePatternWithRow: (newRow: Row) =>
          set((state) => {
            console.log(state.pattern);

            return {
              pattern: {
                ...state.pattern,
                rows: [...state.pattern.rows, newRow],
              },
            };
          }),

        setCurrentColor: (color: Color) => set(() => ({ currentColor: color }), false, 'setCurrentColor'),
      }),
      { name: 'knittingAppState' },
    ),
  ),
);
