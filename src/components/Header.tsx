import React, { memo, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ERoutes } from 'ts/enums';
import { Nav } from './Nav';
import { LangSelect } from './LangSelect';
import ThemeSwitcher from './ThemeSwitcher';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
import { toggleTheme } from 'store/slices/settings/settingsSlice';
import ErrorBoundary from '../common/ErrorBoundary';
import { Button } from './Button/Button';

export const Header = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  // const [value, setValue] = useState(false);
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<HTMLElement>(null);

  // handle scroll event
  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.scrollY > 0) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  // add/remove scroll event listener
  useEffect(() => {
    let handleScrollEvent: {
      (): void;
      (this: Window, ev: Event): unknown;
      (this: Window, ev: Event): unknown;
    };
    if (isAuth) {
      const header = headerRef.current?.getBoundingClientRect();
      handleScrollEvent = () => {
        handleScroll(header?.top as number, header?.height as number);
      };
      window.addEventListener('scroll', handleScrollEvent);
    }
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);
  let titleName = 'header';
  if (isDark && sticky.isSticky) {
    titleName = 'header-sticky-dark';
  } else if (isDark && !sticky.isSticky) {
    titleName = 'header-dark';
  } else if (!isDark && sticky.isSticky) {
    titleName = 'header-sticky';
  }

  return (
    <header className={titleName} ref={headerRef}>
      <div className="container">
        <div className={`header__wrapper`}>
          <NavLink className={`header__logo logo`} to={ERoutes.welcome}>
            <Logo color={isDark ? '#D9D9D9' : '#1C1B1F'} />
            <span>Boardello</span>
          </NavLink>
          <ErrorBoundary>{isAuth && <Nav />}</ErrorBoundary>
          <ErrorBoundary>
            <LangSelect />
          </ErrorBoundary>
          <ErrorBoundary>
            <ThemeSwitcher
              isOn={isDark}
              handleToggle={() => dispatch(toggleTheme())}
              onColor="#EF476F"
            />
          </ErrorBoundary>
        </div>
      </div>
    </header>
  );
});

export const Logo = memo(({ color }: { color: string }) => {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 22.5C1.8125 22.5 1.22375 22.2554 0.73375 21.7663C0.244583 21.2763 0 20.6875 0 20V2.5C0 1.8125 0.244583 1.22375 0.73375 0.73375C1.22375 0.244583 1.8125 0 2.5 0H20C20.6875 0 21.2763 0.244583 21.7663 0.73375C22.2554 1.22375 22.5 1.8125 22.5 2.5V20C22.5 20.6875 22.2554 21.2763 21.7663 21.7663C21.2763 22.2554 20.6875 22.5 20 22.5H2.5ZM2.5 20H10V2.5H2.5V20ZM12.5 20H20V11.25H12.5V20ZM12.5 8.75H20V2.5H12.5V8.75Z"
        fill={color}
      />
    </svg>
  );
});
