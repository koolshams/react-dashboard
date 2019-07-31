import { Action } from 'redux';
import {
  removeElement,
  updateElement,
} from '../../common/redux/reducer-helper';
import { Tab, Widget } from '../interfaces';
import * as constants from './dashboard-constants';

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
