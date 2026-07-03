import { create } from 'zustand';
import type { ThemePreference } from '@/types/domain';

type UiState = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

export const useUiStore = create<UiState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));

export const uiStore = {
  getSnapshot: () => useUiStore.getState(),
  subscribe: useUiStore.subscribe,
  setTheme: (theme: ThemePreference) => useUiStore.getState().setTheme(theme),
};
