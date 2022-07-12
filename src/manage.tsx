import React from 'react';
import { Header } from './modules/common/components/header/header';
import { Switch, Route } from 'react-router';
import DashboardPage from './modules/dashboard/dashboard-page';

export const Manage = () => (
  <>
    <Header />
    <div className="content container-fluid">
      <Switch>
        <Route path="/manage" exact={true} component={DashboardPage} />
      </Switch>
    </div>
  </>
);
