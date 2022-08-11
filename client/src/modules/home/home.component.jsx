import {Navigate, Link} from 'react-router-dom';
import {AuthService} from "../auth";

export function Home({authService = new AuthService()}) {
    return (
        authService.isAuthenticated() ? (
            <Navigate to='/schedule' replace={true}/>
        ) : (
            <div>
                Home <Link to='/login'>Login</Link>
            </div>
        )
    );
}
