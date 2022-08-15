import {Routes, Route} from 'react-router-dom';
import {
    TEACHER_USER_ROLE,
    STUDENT_USER_ROLE
} from '../auth';
import {Main} from './main.component';
import {MySchedulePage, UserSchedulePage} from '../schedule';
import {CollegePage} from '../college/college-page.component';

export function MainRoutes() {
    return (
        <Routes>
            <Route element={<Main/>}>
                <Route path='schedule' element={<MySchedulePage/>}/>
                <Route path='schedule/teacher/:id' element={<UserSchedulePage role={TEACHER_USER_ROLE}/>}/>
                <Route path='schedule/group/:id' element={<UserSchedulePage role={STUDENT_USER_ROLE}/>}/>
                <Route path='college' element={<CollegePage/>}/>
                <Route path='*' element={<div>Not found</div>}/>
            </Route>
        </Routes>
    );
}
