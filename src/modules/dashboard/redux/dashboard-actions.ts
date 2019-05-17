import {
  DASHBOARD_TAB_ADD,
  DASHBOARD_TAB_DELETE,
  DASHBOARD_TAB_EDIT,
  DASHBOARD_WIDGET_ADD,
  DASHBOARD_WIDGET_DELETE,
  DASHBOARD_WIDGET_EDIT,
} from './dashboard-constants';
import { Tab, Widget } from '../interfaces';

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

export const addWidget = (widget: Widget) => ({
  type: DASHBOARD_WIDGET_ADD,
  payload: widget,
});

export const removeWidget = (widgetId: string) => ({
  type: DASHBOARD_WIDGET_DELETE,
  payload: widgetId,
});

export const editWidget= (widget: Widget) => ({
  type: DASHBOARD_WIDGET_EDIT,
  payload: widget,
});
