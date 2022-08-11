import {Routes, Route} from 'react-router-dom';
import {Home} from './home';
import {LoginPage} from './login';
import {MainRoutes} from './main';
import '../assets/styles/colors.css';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/*' element={<MainRoutes/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    );
}

export default App;
