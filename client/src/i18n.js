import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            search: 'Search',
            schedule: 'Schedule',
            college: 'College'
        },
        schedule: {
            timeLeft: '{{time}} minutes left',
            notAuthorized: 'To see your schedule you must be authorized',
            signIn: 'Sign In',
            signOut: 'Sign Out',
            signOutMessage: 'Do you want to sign out?'
        },
        college: {
            title: 'College',
            teachers: 'Teachers',
            groups: 'Groups'
        },
        login: {
            title: 'Select a user'
        }
    },
    ru: {
        translation: {
            search: 'Search',
            schedule: 'Расписание',
            college: 'Колледж'
        },
        schedule: {
            timeLeft: 'Осталось {{time}} минут',
            notAuthorized: 'Чтобы просмотреть ваше расписание вы должны быть авторизованы',
            signIn: 'Авторизоваться',
            signOut: 'Выход',
            signOutMessage: 'Вы действительно хотите выйти из учетной записи?'
        },
        college: {
            title: 'Колледж',
            teachers: 'Преподаватели',
            groups: 'Группы'
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
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;