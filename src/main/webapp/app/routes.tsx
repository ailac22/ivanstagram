import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

import UserProfile from 'app/modules/user/UserProfile/UserProfile';

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

interface RoutesProps {
  isAuthenticated: boolean;
}

// <ErrorBoundaryRoute path="/" exact component={Feed} />
// <ErrorBoundaryRoute path="/p/:id" exact component={SinglePost} />

// <ErrorBoundaryRoute path="/" exact component={LoginPage} />

const Routes: React.FC<RoutesProps> = ({ isAuthenticated }) => {
  return (
    <div className="view-routes">
      <Switch>
        {isAuthenticated ? (
          <>
            <ErrorBoundaryRoute path="/logout" component={Logout} />
            <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
            <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
            <ErrorBoundaryRoute path="/:user" exact component={UserProfile} />
            <ErrorBoundaryRoute component={PageNotFound} />
          </>
        ) : (
          <>
            <ErrorBoundaryRoute path="/account/register" exact component={Register} />
            <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
            <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
            <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
          </>
        )}
      </Switch>
    </div>
  );
};

export default Routes;
