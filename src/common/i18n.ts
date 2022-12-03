import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          signIn: `Sign In`,
          signUp: `Sign Up`,
          welcomeBack: `Welcome Back`,
          login: `Login`,
          password: `Password`,
          loginError: `Please enter the correct login`,
          nameError: `Please enter the correct name`,
          passwordError: `Please enter the correct password`,
          loginPasswordError: `Incorrect login or password`,
          unknownError: `Unknown error`,
          goToMainPage: `Go to the main page`,
          createNewBoard: `+ Create New Board`,
          profile: `Profile`,
          signOut: `Sign Out`,
          createBoard: `Create Board`,
          editBoard: `Edit Board`,
          create: `Create`,
          edit: `Edit`,
          boardName: `Board name`,
          description: `Description`,
          addUser: `Add user`,
          delete: `Delete`,
          createColumn: `Create Column`,
          columnName: `Column Name`,
          loading: `Loading...`,
          addColumn: `Add column`,
          editProfile: `Edit Profile`,
          name: `Name`,
          deleteUser: `Delete User`,
          boardNotFound: `There is no such board`,
          message404: `Error 404. Such a page does not exist on our site.`,
          thisLoginAlreadyExists: `This login already exists`,
          accessDenied: `Access denied`,
          youAreNotLoggedIn: `You are not logged in`,
          authorizationCheck: `Authorization check...`,
          somethingWentWrong: `Something went wrong.`,
          add: `Add +`,
          en: `Eng`,
          ru: `Rus`,
        },
      },
      ru: {
        translation: {
          signIn: `Войти`,
          signUp: `Зарегистрироваться`,
          welcomeBack: `Добро пожаловать назад`,
          login: `Логин`,
          password: `Пароль`,
          loginError: `Пожалуйста, введите корректный логин`,
          nameError: `Пожалуйста, введите корректное имя`,
          passwordError: `Пожалуйста, введите корректный пароль`,
          loginPasswordError: `Некорректный логин или пароль`,
          unknownError: `Неизвестная ошибка`,
          goToMainPage: `Перейти на главную`,
          createNewBoard: `+ Создать новую доску`,
          profile: `Профиль`,
          signOut: `Выйти`,
          createBoard: `Создать доску`,
          editBoard: `Редактировать доску`,
          create: `Создать`,
          edit: `Редактировать`,
          boardName: `Имя доски`,
          description: `Описание`,
          addUser: `Добавить пользователя`,
          delete: `Удалить`,
          createColumn: `Создать колонку`,
          columnName: `Имя колонки`,
          loading: `Загружаем...`,
          addColumn: `Добавить колонку`,
          editProfile: `Редактировать профиль`,
          name: `Имя`,
          deleteUser: `Удалить пользователя`,
          boardNotFound: `Такой доски не существует`,
          message404: `Ошибка 404. Такой страницы на нашем сайте не существует.`,
          thisLoginAlreadyExists: `Такой логин уже существует`,
          accessDenied: `Отказано в доступе`,
          youAreNotLoggedIn: `Вы не вошли в систему`,
          authorizationCheck: `Проверка авторизации...`,
          somethingWentWrong: `Что-то пошло не так.`,
          add: `Добавить +`,
          en: `Анг`,
          ru: `Рус`,
        },
      },
    },
  });

export default i18n;
