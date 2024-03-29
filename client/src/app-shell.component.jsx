import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TabView } from './shared/components/tab-view';
import { TabBarItem } from './shared/components/tab-bar';
import { ReactComponent as CalendarIcon } from './assets/icons/calendar-day-solid.svg';
import { ReactComponent as UsersIcon } from './assets/icons/users-solid.svg';
import { ReactComponent as HeartIcon } from './assets/icons/cards-heart.svg';

export function AppShell() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tabs = [
        {
            tabBarItem: <TabBarItem title={t('schedule')} icon={<CalendarIcon/>}/>,
            path: 'schedule'
        },
        {
            tabBarItem: <TabBarItem title={t('college')} icon={<UsersIcon/>}/>,
            path: 'college'
        },
        {
            tabBarItem: <TabBarItem title={t('favorites')} icon={<HeartIcon/>}/>,
            path: 'favorites'
        },
    ];

    return (
        <TabView navigate={navigate}
                 container={<Outlet/>}
                 tabs={tabs}/>
    );
}
