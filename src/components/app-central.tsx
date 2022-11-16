import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

export default function AppCentral() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
