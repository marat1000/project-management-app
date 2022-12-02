import React, { ReactNode } from 'react';
import { memo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Modals } from './Modals';
import ErrorBoundary from '../common/ErrorBoundary';

interface ILayoutProps {
  children: ReactNode;
}
export const Layout = memo<ILayoutProps>(({ children }) => {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <main className="main-content">
          <div className={`container`}>{children}</div>
        </main>
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <Modals />
    </>
  );
});
