import { configureStore } from '@reduxjs/toolkit';
import { dashboardSlice } from './modules/dashboard/store/dashboard-slice';
import { DashboardState } from './modules/dashboard/store/dashboard-slice.types';

export interface AppState {
  dashboard: DashboardState
}

export function configureAppStore() {
  return configureStore<AppState>({
    reducer: {
      dashboard: dashboardSlice.reducer,
    } as any,
    preloadedState: {
      dashboard: dashboardSlice.getInitialState(),
    }
  });
}
