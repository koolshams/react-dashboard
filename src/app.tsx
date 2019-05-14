import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import { configureStore, history } from './redux-config';
import { LoginPage } from './modules/login/login-page';
import { Manage } from './manage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './global.scss';

const store = configureStore({}, history);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="/" component={LoginPage} />
          <Route path="/manage" component={Manage}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
