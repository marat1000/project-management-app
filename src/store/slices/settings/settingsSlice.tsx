import { createSlice } from '@reduxjs/toolkit';

export interface ISettingsType {
  theme: EThemes | null;
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
  theme: null,
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

export const { toggleLang, toggleTheme, changeLang, changeTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
