type TLangConfigItem = {
  ru: string;
  eng: string;
};

export const langConfig: { [key: string]: TLangConfigItem } = {
  signIn: { ru: 'Войти', eng: 'Sign In' },
  signUp: { ru: 'Зарегистрироваться', eng: 'Sign Up' },
  nameError: { eng: 'Please enter a correct name', ru: 'Некорректное имя' },
  welcomeBack: { ru: 'Рады Вас видеть!', eng: 'Welcome Back' },
  login: { ru: 'Логин', eng: 'Login' },
  password: { ru: 'Пароль', eng: 'Password' },
  loginError: { ru: 'Некорректный логин', eng: 'Please enter a correct login' },
  passwordError: {
    ru: 'Некорректный пароль',
    eng: 'Please enter the correct password',
  },
  loginPasswordError: { ru: 'Некорректный логин или пароль', eng: 'Incorrect login or password' },
  unknownError: { ru: 'Неизвестная ошибка', eng: 'Unknown error' },
  goToMainPage: { ru: 'Перейти на главную', eng: 'Go to the main page' },
  createNewBoard: { ru: '+ Создать новую доску', eng: '+ Create New Board' },
  profile: { ru: 'Профиль', eng: 'Profile' },
  signOut: { ru: 'Выйти', eng: 'Sign Out' },
  createBoard: { ru: 'Создать доску', eng: 'Create Board' },
  editBoard: { ru: 'Редактировать доску', eng: 'Edit Board' },
  create: { ru: 'Создать', eng: 'Create' },
  edit: { ru: 'Редактировать', eng: 'Edit' },
  boardName: { ru: 'Имя доски', eng: 'Board name' },
  description: { ru: 'Описание', eng: 'Description' },
  addUser: { ru: 'Добавить пользователя', eng: 'Add user' },
  delete: { ru: 'Удалить', eng: 'Delete' },
  deleteConfirm: { ru: 'Вы уверены?', eng: 'Are you sure?' },
  cancel: { ru: 'Отменить', eng: 'Cancel' },
  createColumn: { ru: 'Создать колонку', eng: 'Create Column' },
  columnName: { ru: 'Имя колонки', eng: 'Column Name' },
  loading: { ru: 'Загружаем...', eng: 'Loading...' },
  addColumn: { ru: 'Добавить колонку', eng: 'Add column' },
  editProfile: { ru: 'Редактировать профиль', eng: 'Edit Profile' },
  name: { ru: 'Имя', eng: 'Name' },
  deleteUser: { ru: 'Удалить пользователя', eng: 'Delete User' },
  boardNotFound: { ru: 'Такой доски не существует', eng: 'There is no such board' },
  message404: {
    ru: 'Ошибка 404. Такой страницы на нашем сайте не существует.',
    eng: 'Error 404. Such a page does not exist on our site.',
  },
  loginAlreadyExists: { ru: 'Такой логин уже существует', eng: 'This login already exists' },
  accessDenied: { ru: 'Отказано в доступе', eng: 'Access denied' },
  youAreNotLoggedIn: { ru: 'Вы не вошли в систему', eng: 'You are not logged in' },
  authorizationCheck: { ru: 'Проверка авторизации...', eng: 'Authorization check...' },
  somethingWentWrong: { ru: 'Что-то пошло не так.', eng: 'Something went wrong.' },
  add: { ru: 'Добавить +', eng: 'Add +' },
  eng: { ru: 'Анг', eng: 'Eng' },
  ru: { ru: 'Рус', eng: 'Rus' },
  welcome: { ru: 'Добро пожаловать', eng: 'Welcome' },
  deleteColumn: { ru: 'Удалить колонку?', eng: 'Delete column?' },
};
