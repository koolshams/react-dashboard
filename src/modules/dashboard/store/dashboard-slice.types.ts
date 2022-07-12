import { Tab, Widget } from '../interfaces';

export interface DashboardState {
  tabs: Tab[];
  widgets: Widget[];
}

export interface CustomAction<T> {
  payload: T;
}
