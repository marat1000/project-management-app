import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

type ISettingsType = {
  theme: EThemes;
  lang: ELang;
};

enum EThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

enum ELang {
  RUS = 'russian',
  ENG = 'english',
}

const initialState: ISettingsType = {
  theme: EThemes.LIGHT,
  lang: ELang.ENG,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},

  extraReducers(builder) {},
});

export default settingsSlice.reducer;

export const settingsThemeSelector = (state: RootState) => state.settings.theme;
export const settingsLangSelector = (state: RootState) => state.settings.lang;
