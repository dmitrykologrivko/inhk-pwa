import { Routes, Route } from 'react-router-dom';
import {
    TEACHER_USER_ROLE,
    STUDENT_USER_ROLE
} from './data/auth';
import { AppShell } from './app-shell.component';
import { MySchedulePage, UserSchedulePage } from './modules/schedule';
import { CollegePage } from './modules/college';
import { FavoritesPage } from './modules/favorites';
import { HomePage } from './modules/home';
import { LoginPage } from './modules/login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/*' element={<AppShell/>}>
                <Route path='schedule' element={<MySchedulePage/>}/>
                <Route path='schedule/teacher/:id' element={<UserSchedulePage role={TEACHER_USER_ROLE}/>}/>
                <Route path='schedule/group/:id' element={<UserSchedulePage role={STUDENT_USER_ROLE}/>}/>
                <Route path='college' element={<CollegePage/>}/>
                <Route path='favorites' element={<FavoritesPage/>}/>
                <Route path='*' element={<div>Not found</div>}/>
            </Route>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    );
}
