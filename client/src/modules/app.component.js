import { Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { LoginPage } from './login';
import { MainRoutes } from './main';
import '../assets/styles/fonts.css';
import '../assets/styles/colors.css';
import './app.css';

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/*' element={<MainRoutes/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    );
}

export default App;
