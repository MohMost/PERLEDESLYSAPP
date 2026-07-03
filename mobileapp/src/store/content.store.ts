import { create } from 'zustand';

type State = {
  favorites: string[];
  history: string[];
  recentViewed: string[];
  offlineMode: boolean;
  toggleFavorite: (id: string) => void;
  trackViewed: (id: string) => void;
  setOfflineMode: (value: boolean) => void;
};

export const useContentStore = create<State>((set) => ({
  favorites: ['c-1'],
  history: ['c-2', 'c-5'],
  recentViewed: ['c-2'],
  offlineMode: false,
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((item) => item !== id)
      : [id, ...state.favorites],
  })),
  trackViewed: (id) => set((state) => ({
    history: [id, ...state.history.filter((item) => item !== id)].slice(0, 25),
    recentViewed: [id, ...state.recentViewed.filter((item) => item !== id)].slice(0, 6),
  })),
  setOfflineMode: (offlineMode) => set({ offlineMode }),
}));

export const contentStore = {
  getSnapshot: () => useContentStore.getState(),
  subscribe: useContentStore.subscribe,
  toggleFavorite: (id: string) => useContentStore.getState().toggleFavorite(id),
  trackViewed: (id: string) => useContentStore.getState().trackViewed(id),
  setOfflineMode: (value: boolean) => useContentStore.getState().setOfflineMode(value),
};
