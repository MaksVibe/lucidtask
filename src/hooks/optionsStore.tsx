import { create } from 'zustand';

export type SelectOptionType = {
  value: string;
  label: string;
};

export type OptionsStoreTypes = {
  options: SelectOptionType[];

  mutateOptions: (options: SelectOptionType[]) => void;
};

export const useOptionsStore = create<OptionsStoreTypes>(set => ({
  options: [],
  mutateOptions: options => set(() => ({ options: options })),
}));
