import {useNavigate, Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {TabView} from '../common/components/tab-view';
import {TabBarItem} from '../common/components/tab-bar';
import {ReactComponent as CalendarIcon} from '../../assets/icons/calendar-day-solid.svg';
import {ReactComponent as UsersIcon} from '../../assets/icons/users-solid.svg';

export function Main() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tabs = [
        {
            tabItem: <TabBarItem title={t('schedule')} icon={<CalendarIcon/>}/>,
            bgColor: 'var(--primary-bg-color)',
            path: 'schedule'
        },
        {
            tabItem: <TabBarItem title={t('college')} icon={<UsersIcon/>}/>,
            bgColor: 'var(--primary-bg-color)',
            path: 'college'
        }
    ];

    return (
        <TabView navigate={navigate}
                 defaultView={<Outlet/>}
                 tabs={tabs}/>
    );
}
