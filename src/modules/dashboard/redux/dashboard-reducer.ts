import { Action } from 'redux';
import * as constants from './dashboard-constants';
import {
  removeElement,
  updateElement,
} from '../../common/redux/reducer-helper';

export interface Tab {
  id: string;
  name: string;
}

export enum WidgetTypes {
  PERFORMANCE = 'PERFORMANCE',
}

export interface Widget {
  id: string;
  tabId: string;
  type: WidgetTypes;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  props: {
    title: string;
    [key: string]: string | number | boolean;
  };
}

export interface DashboardState {
  tabs: Tab[];
  widgets: Widget[];
}

export interface DasboardAction extends Action<keyof typeof constants> {
  payload: any;
}

const initialState: DashboardState = {
  tabs: [],
  widgets: [],
};

export function dashboard(
  state = initialState,
  action: DasboardAction,
): DashboardState {
  switch (action.type) {
    case constants.DASHBOARD_TAB_ADD:
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    case constants.DASHBOARD_TAB_DELETE:
      return removeElement<DashboardState>(
        state,
        state.tabs,
        action.payload,
        'tabs',
      );

    case constants.DASHBOARD_TAB_EDIT:
      return updateElement<DashboardState>(
        state,
        state.tabs,
        action.payload as Tab,
        'tabs',
      );

    case constants.DASHBOARD_WIDGET_ADD:
      return {
        ...state,
        widgets: [...state.widgets, action.payload],
      };

    case constants.DASHBOARD_WIDGET_DELETE:
      return removeElement<DashboardState>(
        state,
        state.widgets,
        action.payload,
        'widgets',
      );

    case constants.DASHBOARD_WIDGET_EDIT:
      return updateElement<DashboardState>(
        state,
        state.widgets,
        action.payload,
        'widgets',
      );

    default:
      return state;
  }
}
