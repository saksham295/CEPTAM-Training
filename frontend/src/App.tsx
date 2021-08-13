import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  useRoutes
} from "react-router-dom";

import { AppState } from './redux/store';
import { loadAuth } from './redux/actions/authActions';

import routes from './utils/routes';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );
  const routing = useRoutes(routes(isAuthenticated));
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadAuth());
    }
  }, [dispatch]);

  return (
    <HelmetProvider>
      {routing}
    </HelmetProvider>
  );
}

export default App;
