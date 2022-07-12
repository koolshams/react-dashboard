import { createSlice } from '@reduxjs/toolkit';
import {
  removeElement,
  updateElement,
} from '../../common/redux/reducer-helper';
import { Tab, Widget } from '../interfaces';
import { CustomAction, DashboardState } from './dashboard-slice.types';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    tabs: [],
    widgets: [],
  } as DashboardState,
  reducers: {
    addTab: (state, action: CustomAction<Tab>) => {
      state.tabs = [...state.tabs, action.payload];
    },

    deleteTab: (state, action: CustomAction<string>) => {
      state.tabs = removeElement<Tab>(state.tabs, action.payload);
    },

    editTab: (state, action: CustomAction<Tab>) => {
      state.tabs = updateElement(state.tabs, action.payload);
    },

    addWidget: (state, action: CustomAction<Widget>) => {
      state.widgets = [...state.widgets, action.payload];
    },

    deleteWidget: (state, action: CustomAction<string>) => {
      state.widgets = removeElement(state.widgets, action.payload);
    },

    editWidget: (state, action: CustomAction<Widget>) => {
      state.widgets = updateElement(state.widgets, action.payload);
    },
  },
});

export const {
  addTab,
  deleteTab,
  editTab,
  addWidget,
  deleteWidget,
  editWidget,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
