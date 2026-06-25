import { create } from 'zustand';

interface DashboardState {
  period: '7days' | '30days' | 'year';
  setPeriod: (period: '7days' | '30days' | 'year') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  period: '7days',
  setPeriod: (period) => set({ period }),
}));
