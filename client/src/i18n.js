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
            timeLeft: '{{time}} minutes left'
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
            timeLeft: 'Осталось {{time}} минут'
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