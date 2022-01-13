import React, { useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  );
};

export default Logout;
