import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoginPage from 'app/modules/login/LoginPage';
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
import FeedPage from 'app/modules/feed/FeedPage';
import UserProfile from 'app/modules/user/UserProfile/UserProfile';
import SinglePost from 'app/modules/user/SinglePost';

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

const Routes: React.FC<RoutesProps> = ({ isAuthenticated }) => {
  return (
    <div className="view-routes">
      {isAuthenticated ? (
        <Switch>
          <ErrorBoundaryRoute path="/logout" component={Logout} />
          <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
          <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
          <ErrorBoundaryRoute path="/:user" exact component={UserProfile} />
          <ErrorBoundaryRoute path="/" exact component={FeedPage} />
          <ErrorBoundaryRoute path="/p/:id" exact component={SinglePost} />
          <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
      ) : (
        <Switch>
          <ErrorBoundaryRoute path="/" exact component={LoginPage} />
          <ErrorBoundaryRoute path="/account/register" exact component={Register} />
          <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
          <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
          <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
