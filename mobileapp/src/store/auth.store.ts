import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import type { AuthSession, User } from '@/types/domain';

type AuthState = {
  session: AuthSession | null;
  user: User | null;
  isHydrating: boolean;
  isAuthenticated: boolean;
  hydrate: () => Promise<void>;
  login: (input: { email: string; password: string; remember: boolean }) => Promise<AuthSession>;
  loginWithAccessCode: (input: { email: string; accessCode: string; remember: boolean }) => Promise<AuthSession>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

const sessionPatch = (session: AuthSession | null) => ({
  session,
  user: session?.user ?? null,
  isAuthenticated: Boolean(session),
});

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isHydrating: true,
  isAuthenticated: false,
  async hydrate() {
    set({ isHydrating: true });
    const session = await authService.restoreSession();
    set({ ...sessionPatch(session), isHydrating: false });
  },
  async login(input) {
    const session = await authService.login(input);
    set(sessionPatch(session));
    return session;
  },
  async loginWithAccessCode(input) {
    const session = await authService.loginWithAccessCode(input);
    set(sessionPatch(session));
    return session;
  },
  async logout() {
    await authService.logout();
    set(sessionPatch(null));
  },
  setUser(user) {
    const currentSession = get().session;
    const session = currentSession ? { ...currentSession, user } : null;
    set({ ...sessionPatch(session), user });
  },
}));

export const authStore = {
  getSnapshot: () => useAuthStore.getState(),
  subscribe: useAuthStore.subscribe,
  hydrate: () => useAuthStore.getState().hydrate(),
  login: (input: { email: string; password: string; remember: boolean }) => useAuthStore.getState().login(input),
  loginWithAccessCode: (input: { email: string; accessCode: string; remember: boolean }) => useAuthStore.getState().loginWithAccessCode(input),
  logout: () => useAuthStore.getState().logout(),
  setUser: (user: User) => useAuthStore.getState().setUser(user),
};
