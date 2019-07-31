import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import {
  dashboard,
  DashboardState,
} from './modules/dashboard/redux/dashboard-reducer';

export interface StoreState {
  dashboard: DashboardState;
}

function storeReducer() {
  return combineReducers({
    dashboard,
  });
}

export function configureStore(
  preloadedState: any,
) {
  const store = createStore(
    storeReducer(),
    preloadedState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(createLogger({})),
    ),
  );

  return store;
}