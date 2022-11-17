import React, { ReactNode } from 'react';
import { memo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface ILayoutProps {
  children: ReactNode;
}
export const Layout = memo<ILayoutProps>(({ children }) => {
  return (
    <div className="container">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
});
