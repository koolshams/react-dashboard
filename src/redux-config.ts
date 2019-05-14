import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { dashboard, DashboardState } from './modules/dashboard/redux/dashboard-reducer';

export interface StoreState {
  router: RouterState,
  dashboard: DashboardState
}

function storeReducer(historyObject: History<any>) {
  return combineReducers({
    dashboard,
    router: connectRouter(historyObject),
  });
}

const logger = createLogger({});

export const history = createBrowserHistory();

export function configureStore(preloadedState: any, historyObject: History<any>) {
  const store = createStore(
    storeReducer(historyObject),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(thunk),
      applyMiddleware(logger),
    ),
  );

  return store;
}
