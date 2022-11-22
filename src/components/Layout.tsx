import React, { ReactNode } from 'react';
import { memo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Modals } from './Modals';

interface ILayoutProps {
  children: ReactNode;
}
export const Layout = memo<ILayoutProps>(({ children }) => {
  return (
    <>
      <Header />
      <div className={`container`}>
        <main className="main-content">{children}</main>
        <Footer />
      </div>
      <Modals />
    </>
  );
});
