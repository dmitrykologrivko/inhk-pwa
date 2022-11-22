import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../data/auth';
import { PortalHead } from '../../shared/components/head';
import { Start } from './start.component';
import { Install } from './install.component';
import { About } from './about.component';

function HomePageImpl() {
    const authService = useAuth();
    const navigate = useNavigate();

    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    useEffect(() => {
        const onAppInstalledHandler = () => navigate('/login');

        window.addEventListener('appinstalled', onAppInstalledHandler);

        return () => {
            window.removeEventListener('appinstalled', onAppInstalledHandler);
        };
    }, [navigate]);

    const content = isInstalled ? (
        <Navigate to='/login' replace={true}/>
    ) : (
        <div>
            <PortalHead>
                <style>{'body {background: white;}'}</style>
                <meta name="theme-color" content="white" />
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
