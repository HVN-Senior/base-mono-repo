import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type ILandingPageStore = {
  flag: boolean;
  setFlag: (value: boolean) => void;
};

const useBaseLandingPageStore = create<ILandingPageStore>((set) => ({
  flag: true,
  setFlag: (value: boolean) => set({ flag: value }),
}));

export const useLandingPageStore = createSelectorFunctions(useBaseLandingPageStore);
