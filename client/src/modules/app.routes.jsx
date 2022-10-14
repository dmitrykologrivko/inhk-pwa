import { Routes, Route } from 'react-router-dom';
import {
    TEACHER_USER_ROLE,
    STUDENT_USER_ROLE
} from './core/auth';
import { MainShell } from './core/main-shell.component';
import { MySchedulePage, UserSchedulePage } from './schedule';
import { CollegePage } from './college';
import { FavoritesPage } from './favorites';
import { HomePage } from './home';
import { LoginPage } from './login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/*' element={<MainShell/>}>
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