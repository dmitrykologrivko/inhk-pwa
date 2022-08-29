import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TabView } from '../common/components/tab-view';
import { TabBarItem } from '../common/components/tab-bar';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar-day-solid.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/users-solid.svg';

export function Main() {
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
            tabBarItem: <TabBarItem title={t('favorites')} icon={<UsersIcon/>}/>,
            path: 'favorites'
        },
    ];

    return (
        <TabView navigate={navigate}
                 container={<Outlet/>}
                 tabs={tabs}/>
    );
}
