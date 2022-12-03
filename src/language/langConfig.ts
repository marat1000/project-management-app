type TLangConfigItem = {
  ru: string;
  eng: string;
};

export const langConfig: { [key: string]: TLangConfigItem } = {
  ru: {
    ru: 'Рус',
    eng: 'Рус',
  },
  eng: {
    ru: 'ENG',
    eng: 'ENG',
  },
  createBoard: {
    ru: 'Создать новую доску',
    eng: 'Create new board',
  },

  profile: {
    eng: 'Profile',
    ru: 'Профиль',
  },

  signOut: {
    ru: 'Выйти',
    eng: 'SignOut',
  },
};
