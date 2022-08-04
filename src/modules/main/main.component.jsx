import {useNavigate, Outlet} from 'react-router-dom';
import {TabView} from '../common/components/tab-view';
import {TabBarItem} from '../common/components/tab-bar';
import {ReactComponent as CalendarIcon} from '../../assets/icons/calendar-day-solid.svg';
import {ReactComponent as UsersIcon} from '../../assets/icons/users-solid.svg';

export function Main() {
    const navigate = useNavigate();

    const tabs = [
        {
            tabItem: <TabBarItem title='Schedule' icon={<CalendarIcon/>}/>,
            path: 'schedule'
        },
        {
            tabItem: <TabBarItem title='College' icon={<UsersIcon/>}/>,
            path: 'college'
        }
    ];

    return (
        <TabView navigate={navigate}
                 defaultView={<Outlet/>}
                 tabs={tabs}/>
    );
}
