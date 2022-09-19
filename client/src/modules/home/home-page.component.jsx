import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../auth';
import { PortalHead } from '../common/components/head';
import { Start } from './start.component';
import { Install } from './install.component';
import { About } from './about.component';

function HomePageImpl() {
    const authService = useAuth();

    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    const content = isInstalled ? (
        <Navigate to='/login' replace={true}/>
    ) : (
        <div>
            <PortalHead>
                <style>{'body {background: white;}'}</style>
            </PortalHead>
            <Start />
            <Install />
            <About />
        </div>
    );

    return (
        authService.isAuthenticated() ? (
            <Navigate to='/schedule' replace={true}/>
        ) : (
            content
        )
    );
}

export function HomePage() {
    return (
        <AuthProvider>
            <HomePageImpl />
        </AuthProvider>
    );
}
