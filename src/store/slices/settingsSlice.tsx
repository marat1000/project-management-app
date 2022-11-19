import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface ISettingsType {
  theme: EThemes;
  lang: ELang;
}

export enum EThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ELang {
  RUS = 'russian',
  ENG = 'english',
}

type changeLangAction = {
  type?: string;
  payload: ELang;
};

type changeThemeAction = {
  type?: string;
  payload: EThemes;
};

const initialState: ISettingsType = {
  theme: EThemes.LIGHT,
  lang: ELang.ENG,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.lang = state.lang === ELang.ENG ? ELang.RUS : ELang.ENG;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === EThemes.LIGHT ? EThemes.DARK : EThemes.LIGHT;
    },
    changeLang: (state, action: changeLangAction) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action: changeThemeAction) => {
      state.theme = action.payload;
    },
  },
});

export const settingsThemeSelector = (state: RootState) => state.settings.theme;
export const settingsLangSelector = (state: RootState) => state.settings.lang;

export default settingsSlice.reducer;
