import { Tab } from './dashboard-reducer';
import {
  DASHBOARD_TAB_ADD,
  DASHBOARD_TAB_DELETE,
  DASHBOARD_TAB_EDIT,
} from './dashboard-constants';

export const addTab = (tab: Tab) => ({
  type: DASHBOARD_TAB_ADD,
  payload: tab,
});

export const removeTab = (tabId: string) => ({
  type: DASHBOARD_TAB_DELETE,
  payload: tabId,
});

export const editTab = (tab: Tab) => ({
  type: DASHBOARD_TAB_EDIT,
  payload: tab,
});
