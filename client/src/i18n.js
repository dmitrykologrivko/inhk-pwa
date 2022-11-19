import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            search: 'Search',
            schedule: 'Schedule',
            college: 'College',
            favorites: 'Favorites',
            titles: {
                error: 'Error'
            },
            buttons: {
                ok: 'OK',
                yes: 'Yes',
                no: 'No'
            },
        },
        home: {
            start: {
                title: 'Online schedule of the\nNevinnomyssk College of Chemical Technology',
                install: 'Install',
                more: 'More'
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
            search: 'Search',
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
                no: 'Нет'
            },
        },
        home: {
            start: {
                title: 'Онлайн-расписание\nНевинномысского химико-технологического колледжа',
                install: 'Установить',
                more: 'Подробнее'
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
            title: 'Выберете пользователя'
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