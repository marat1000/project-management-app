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
      <main className="main-content">
        <div className={`container`}>{children}</div>
      </main>
      <Footer />
      <Modals />
    </>
  );
});
