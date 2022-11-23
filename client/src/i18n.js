import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            schedule: 'Schedule',
            college: 'College',
            favorites: 'Favorites',
            titles: {
                error: 'Error'
            },
            buttons: {
                ok: 'OK',
                yes: 'Yes',
                no: 'No',
                tryAgain: 'Try Again'
            },
            inputs: {
                search: 'Search',
            }
        },
        home: {
            start: {
                title: 'Online schedule of the\nNevinnomyssk College of Chemical Technology',
                install: 'Install',
                more: 'More'
            },
            install: {
                desktop: {
                    step1: 'In browsers based on the Chromium project (Google Chrome, Yandex Browser, Brave Browser) ' +
                        'in the right top window, click the "install" button to install the PWA application on your computer',
                    step2: 'In the list of installed applications, find iNHK and launch it'
                },
                ios: {
                    step1: 'Open the site in the Safari browser and click the share button',
                    step2: 'Select "Add to Home Screen"',
                    step3: 'In the list of installed applications, find iNHK and launch it'
                },
                android: {
                    step1: 'Open the site in the Google Chrome browser and click the menu button',
                    step2: 'Select "Add to Home Screen"',
                    step3: 'In the list of installed applications, find iNHK and launch it'
                }
            },
            about: {
                description: 'This application is a "Progressive Web Application" (PWA). PWA is a technology in web ' +
                    'development that visually and functionally transforms a site into an application ' +
                    '(mobile application in a browser).'
            }
        },
        schedule: {
            timeLeft: '{{time}} minutes left',
            notAuthorized: 'To see your schedule you must be authorized',
            signIn: 'Sign In',
            signOut: 'Sign Out',
            signOutMessage: 'Do you want to sign out?',
            scheduleFor: 'Schedule for'
        },
        college: {
            title: 'College',
            teachers: 'Teachers',
            groups: 'Groups'
        },
        favorites: {
            title: 'Favorites',
            teachers: 'Teachers',
            groups: 'Groups',
            noFavoriteTeachers: 'No favorite teachers',
            noFavoriteGroups: 'No favorite groups'
        },
        login: {
            title: 'Select a user'
        }
    },
    ru: {
        translation: {
            schedule: 'Расписание',
            college: 'Колледж',
            favorites: 'Избранное',
            titles: {
                error: 'Ошибка',
                yes: 'Да',
                no: 'Нет'
            },
            buttons: {
                ok: 'OK',
                yes: 'Да',
                no: 'Нет',
                tryAgain: 'Повторить'
            },
            inputs: {
                search: 'Поиск'
            }
        },
        home: {
            start: {
                title: 'Онлайн-расписание\nНевинномысского химико-технологического колледжа',
                install: 'Установить',
                more: 'Подробнее'
            },
            install: {
                desktop: {
                    step1: 'В браузерах основанных на проекте Chromium (Google Chrome, Yandex Browser, Brave Browser) ' +
                        'в верхнем правом углу нажмите кнопку "Установить" чтобы установить PWA приложение на ваш компьютер',
                    step2: 'В списке установленных приложений найдите iNHK и запустите его'
                },
                ios: {
                    step1: 'Откройте сайт в браузере Safari и нажмите кнопку "Поделиться"',
                    step2: 'Выберите пункт "На экран Домой"',
                    step3: 'В списке установленных приложений найдите iNHK и запустите его'
                },
                android: {
                    step1: 'Откройте сайт в браузере Google Chrome и нажмите кнопку меню',
                    step2: 'Выберите пункт "Добавить на экран Домой"',
                    step3: 'В списке установленных приложений найдите iNHK и запустите его'
                }
            },
            about: {
                description: 'Данное приложение является "Прогрессивным веб-приложением" (PWA) PWA это технология ' +
                    'в web-разработке, которая визуально и функционально трансформирует сайт в приложение ' +
                    '(мобильное приложение в браузере).'
            }
        },
        schedule: {
            timeLeft: 'Осталось {{time}} минут',
            notAuthorized: 'Чтобы просмотреть ваше расписание вы должны быть авторизованы',
            signIn: 'Авторизоваться',
            signOut: 'Выход',
            signOutMessage: 'Вы действительно хотите выйти из учетной записи?',
            scheduleFor: 'Расписание для'
        },
        college: {
            title: 'Колледж',
            teachers: 'Преподаватели',
            groups: 'Группы'
        },
        favorites: {
            title: 'Избранное',
            teachers: 'Преподаватели',
            groups: 'Группы',
            noFavoriteTeachers: 'Нет избранных преподавателей',
            noFavoriteGroups: 'Нет избранных групп'
        },
        login: {
            title: 'Выберите пользователя'
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: window.navigator.language,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;