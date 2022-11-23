import { useEffect } from 'react';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { checkAuth } from 'store/slices/auth/authThunks';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFirstCheckAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
};
