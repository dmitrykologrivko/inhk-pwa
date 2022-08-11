import {Routes, Route} from 'react-router-dom';
import {Main} from './main.component';
import {MyScheduleView} from '../schedule/my-schedule-view.component';
import {CollegePage} from '../college/college-page.component';

export function MainRoutes() {
    return (
        <Routes>
            <Route element={<Main/>}>
                <Route path='schedule' element={<MyScheduleView/>}/>
                <Route path='college' element={<CollegePage/>}/>
                <Route path='*' element={<div>Not found</div>}/>
            </Route>
        </Routes>
    );
}
