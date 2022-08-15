import {Routes, Route} from 'react-router-dom';
import {Main} from './main.component';
import {MySchedulePage} from '../schedule/my-schedule-page.component';
import {CollegePage} from '../college/college-page.component';

export function MainRoutes() {
    return (
        <Routes>
            <Route element={<Main/>}>
                <Route path='schedule' element={<MySchedulePage/>}/>
                <Route path='college' element={<CollegePage/>}/>
                <Route path='*' element={<div>Not found</div>}/>
            </Route>
        </Routes>
    );
}
