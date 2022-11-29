import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { NavLink } from 'react-router-dom';
import { ERoutes } from '../ts/enums';
import { toggleEditBoardModal, toggleEditProfileModal } from '../store/slices/modals/modalsSlice';
import { Button } from './Button/Button';
import { logOut } from 'store/slices/auth/authThunks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

export const Nav = memo(() => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);
  const openEditProfileModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(toggleEditProfileModal(true));
  };
  const openCreatingBoardModal = () => {
    dispatch(toggleEditBoardModal(true));
  };
  const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <nav className={`nav`}>
      <Button color="add" onClick={openCreatingBoardModal}>
        + Create new board
      </Button>
      <NavLink to={ERoutes.profile} onClick={openEditProfileModal}>
        <ProfileSVG color={isDark ? '#D9D9D9' : '#1C1B1F'} />
        <span>Profile</span>
      </NavLink>
      <NavLink to={ERoutes.welcome} onClick={logout}>
        <SignOutSVG color={isDark ? '#D9D9D9' : '#1C1B1F'} />
        <span>Sign Out</span>
      </NavLink>
    </nav>
  );
});

const ProfileSVG = memo(({ color }: { color: string }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.87484 13.25C4.58317 12.7083 5.37484 12.2811 6.24984 11.9683C7.12484 11.6561 8.0415 11.5 8.99984 11.5C9.95817 11.5 10.8748 11.6561 11.7498 11.9683C12.6248 12.2811 13.4165 12.7083 14.1248 13.25C14.6109 12.6806 14.9896 12.0347 15.2607 11.3125C15.5312 10.5903 15.6665 9.81944 15.6665 9C15.6665 7.15278 15.0173 5.57972 13.719 4.28083C12.4201 2.9825 10.8471 2.33333 8.99984 2.33333C7.15262 2.33333 5.57984 2.9825 4.2815 4.28083C2.98261 5.57972 2.33317 7.15278 2.33317 9C2.33317 9.81944 2.46873 10.5903 2.73984 11.3125C3.01039 12.0347 3.38873 12.6806 3.87484 13.25ZM8.99984 9.83333C8.18039 9.83333 7.48928 9.55222 6.9265 8.99C6.36428 8.42722 6.08317 7.73611 6.08317 6.91666C6.08317 6.09722 6.36428 5.40611 6.9265 4.84333C7.48928 4.28111 8.18039 4 8.99984 4C9.81928 4 10.5104 4.28111 11.0732 4.84333C11.6354 5.40611 11.9165 6.09722 11.9165 6.91666C11.9165 7.73611 11.6354 8.42722 11.0732 8.99C10.5104 9.55222 9.81928 9.83333 8.99984 9.83333ZM8.99984 17.3333C7.84706 17.3333 6.76373 17.1144 5.74984 16.6767C4.73595 16.2394 3.854 15.6458 3.104 14.8958C2.354 14.1458 1.76039 13.2639 1.32317 12.25C0.885393 11.2361 0.666504 10.1528 0.666504 9C0.666504 7.84722 0.885393 6.76389 1.32317 5.75C1.76039 4.73611 2.354 3.85416 3.104 3.10416C3.854 2.35416 4.73595 1.76028 5.74984 1.3225C6.76373 0.885275 7.84706 0.666664 8.99984 0.666664C10.1526 0.666664 11.2359 0.885275 12.2498 1.3225C13.2637 1.76028 14.1457 2.35416 14.8957 3.10416C15.6457 3.85416 16.2393 4.73611 16.6765 5.75C17.1143 6.76389 17.3332 7.84722 17.3332 9C17.3332 10.1528 17.1143 11.2361 16.6765 12.25C16.2393 13.2639 15.6457 14.1458 14.8957 14.8958C14.1457 15.6458 13.2637 16.2394 12.2498 16.6767C11.2359 17.1144 10.1526 17.3333 8.99984 17.3333ZM8.99984 15.6667C9.73595 15.6667 10.4304 15.5592 11.0832 15.3442C11.7359 15.1286 12.3332 14.8194 12.8748 14.4167C12.3332 14.0139 11.7359 13.7047 11.0832 13.4892C10.4304 13.2742 9.73595 13.1667 8.99984 13.1667C8.26373 13.1667 7.56928 13.2742 6.9165 13.4892C6.26373 13.7047 5.6665 14.0139 5.12484 14.4167C5.6665 14.8194 6.26373 15.1286 6.9165 15.3442C7.56928 15.5592 8.26373 15.6667 8.99984 15.6667ZM8.99984 8.16666C9.36095 8.16666 9.65956 8.04861 9.89567 7.8125C10.1318 7.57639 10.2498 7.27778 10.2498 6.91666C10.2498 6.55555 10.1318 6.25694 9.89567 6.02083C9.65956 5.78472 9.36095 5.66666 8.99984 5.66666C8.63873 5.66666 8.34012 5.78472 8.104 6.02083C7.86789 6.25694 7.74984 6.55555 7.74984 6.91666C7.74984 7.27778 7.86789 7.57639 8.104 7.8125C8.34012 8.04861 8.63873 8.16666 8.99984 8.16666Z"
        fill={color}
      />
    </svg>
  );
});

const SignOutSVG = memo(({ color }: { color: string }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.16667 15.5C1.70833 15.5 1.31583 15.3369 0.989167 15.0108C0.663055 14.6842 0.5 14.2917 0.5 13.8333V2.16667C0.5 1.70833 0.663055 1.31583 0.989167 0.989167C1.31583 0.663055 1.70833 0.5 2.16667 0.5H8V2.16667H2.16667V13.8333H8V15.5H2.16667ZM11.3333 12.1667L10.1875 10.9583L12.3125 8.83333H5.5V7.16667H12.3125L10.1875 5.04167L11.3333 3.83333L15.5 8L11.3333 12.1667Z"
        fill={color}
      />
    </svg>
  );
});
