import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISettingsType {
  theme: EThemes | string;
  lang: ELang;
}

export enum EThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ELang {
  RUS = 'ru',
  ENG = 'eng',
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
  theme: localStorage.getItem('theme') || EThemes.LIGHT,
  lang: (localStorage.getItem('lang') as ELang) || ELang.ENG,
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
      localStorage.setItem('theme', state.theme);
      console.log(localStorage.getItem('theme'));
    },
    changeLang: (state, action: PayloadAction<ELang>) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action: changeThemeAction) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleLang, toggleTheme, changeLang, changeTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
