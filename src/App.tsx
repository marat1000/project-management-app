import './App.css';
import React, { memo } from 'react';
import { useAppSelector, useFirstCheckAuth } from 'store/hooks';
import { authCheckingSelector, authSelector } from 'store/slices/authSlice';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Page404 } from './pages/Page404';
import { Main } from './pages/Main';
import { ERoutes } from 'ts/enums';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Layout } from 'components/Layout';
import { Profile } from 'pages/Profile';

const AuthRoutes = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path={ERoutes.main} element={<Navigate to={'/'} />} />
      <Route path={ERoutes.welcome} element={<Welcome />} />
      <Route path={ERoutes.profile} element={<Profile />} />

      {/* redirect because user logged  */}
      <Route path={ERoutes.singIn} element={<Navigate to={'/'} />} />
      <Route path={ERoutes.singUp} element={<Navigate to={'/'} />} />
    </Routes>
  );
});

const NonAuthRoutes = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ERoutes.welcome} />} />
      <Route path={ERoutes.main} element={<Navigate to={ERoutes.welcome} />} />
      <Route path={ERoutes.welcome} element={<Welcome />} />
      <Route path={ERoutes.singIn} element={<SignIn />} />
      <Route path={ERoutes.singUp} element={<SignUp />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});

function App() {
  const isChecking = useAppSelector(authCheckingSelector);
  const isAuth = useAppSelector(authSelector);

  useFirstCheckAuth();

  if (isChecking) {
    return <div>authorization check</div>;
  }

  return (
    <BrowserRouter>
      <Layout> {isAuth ? <AuthRoutes /> : <NonAuthRoutes />}</Layout>
    </BrowserRouter>
  );
}

export default App;
