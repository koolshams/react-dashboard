import { Action } from 'redux';
import * as constants from './dashboard-constants';

export interface Tab {
  id: string;
  name: string;
}

export interface Widget {
  id: string;
  tabId: string;
  title: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  props: any;
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

export function dashboard(state = initialState, action: DasboardAction) {
  switch (action.type) {
    case constants.DASHBOARD_TAB_ADD:
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    case constants.DASHBOARD_TAB_DELETE:
      const deleteIndex = state.tabs.findIndex(
        tab => tab.id === action.payload,
      );
      if (deleteIndex === -1) {
        return state;
      }
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, deleteIndex),
          ...state.tabs.slice(deleteIndex),
        ],
      };

    case constants.DASHBOARD_TAB_EDIT:
      const editIndex = state.tabs.findIndex(
        tab => tab.id === action.payload.id,
      );
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, editIndex),
          action.payload,
          ...state.tabs.slice(editIndex),
        ],
      };

    default:
      return state;
  }
}
