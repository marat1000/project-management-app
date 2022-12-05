import { RootState } from 'store';

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.lang;
export const selectIsDark = (state: RootState) => state.settings.theme === 'dark';
