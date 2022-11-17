import './App.css';
import React, { memo } from 'react';
import { useAppSelector, useFirstCheckAuth } from 'store/hooks';
import { authCheckingSelector, authSelector } from 'store/slices/authSlice';
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { AppCentral } from './components/app-central';
import { Welcome } from './components/welcome';
import { Page404 } from './components/page404';
import { Main } from './components/main';
import { ROUTES } from './common/constants';

const ProtectedRoute = memo(
  ({
    redirectPath = ROUTES.welcome,
    children,
  }: {
    redirectPath?: typeof ROUTES[keyof typeof ROUTES];
    children?: React.ReactNode;
  }) => {
    const isAuth = useAppSelector(authSelector);
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <>{children ? children : <Outlet />}</>;
  }
);

function App() {
  const isChecking = useAppSelector(authCheckingSelector);
  useFirstCheckAuth();

  if (isChecking) {
    return <div>authorization check</div>;
  }

  return (
    <BrowserRouter>
      {/*<nav>*/}
      {/*  <NavLink to={ROUTES.welcome}>Welcome</NavLink>*/}
      {/*  <NavLink to={ROUTES.main}>Main</NavLink>*/}
      {/*</nav>*/}
      <Routes>
        <Route path="/" element={<AppCentral />}>
          <Route path="/" element={<Navigate to={ROUTES.welcome} />} />
          <Route path={ROUTES.welcome} element={<Welcome />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.main} element={<Main />} />
          </Route>
          <Route path={ROUTES.page404} element={<Page404 />} />
          <Route path="*" element={<Navigate replace to={ROUTES.page404} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
