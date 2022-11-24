import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { RootState } from 'store';
import { IUser, IEditUserParams } from 'ts/interfaces';
import { toggleEditProfileModal } from '../modals/modalsSlice';

export const loadUserData = createAsyncThunk('user/dataFetch', async (id: string) => {
  const response = await UserService.getUser(id);
  return response.data.name;
});

export const editUser = createAsyncThunk<IUser, IEditUserParams, { state: RootState }>(
  'user/editUser',
  async (body, { getState, dispatch }) => {
    const id = getState().user.id;
    const response = await UserService.editUser(id, body);
    dispatch(toggleEditProfileModal(false));
    return response;
  }
);

export const deleteUser = createAsyncThunk('user/delete', async (id: string, { dispatch }) => {
  const status = await UserService.deleteUser(id);
  dispatch(toggleEditProfileModal(false));
  return status;
});
