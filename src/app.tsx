import { HashRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import { configureStore } from './redux-config';
import { LoginPage } from './modules/login/login-page';
import { Manage } from './manage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './global.scss';

const store = configureStore({});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LoginPage} />
          <Route path="/manage" component={Manage}/>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
