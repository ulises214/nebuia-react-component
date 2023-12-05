import { create } from 'zustand';

import { FaceState } from './state';

interface FaceStore {
  state: FaceState;
  setState: (state: FaceState) => void;
}
export const useFaceStore = create<FaceStore>((set) => ({
  state: { type: 'idle' },
  setState(state) {
    set({ state });
  },
}));
