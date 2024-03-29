import { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInhk, InhkProvider } from '../../data/inhk';
import {
    STUDENT_USER_ROLE,
    TEACHER_USER_ROLE,
    User,
    useAuth,
    AuthProvider
} from '../../data/auth';
import { FlexContainer } from '../../shared/components/containers';
import { Margin, Padding } from '../../shared/components/spacing';
import { PageTitle } from '../../shared/components/titles';
import { AsyncData } from '../../shared/components/async';
import { Spinner } from '../../shared/components/spinner';
import { TryAgain } from '../../shared/components/errors';
import {
    STUDENT_ROLE,
    TEACHER_ROLE,
    College
} from '../college';
import styles from './login-page.module.css';

function LoginPageImpl() {
    const {t} = useTranslation();
    const inhkService = useInhk();
    const authService = useAuth();
    const [user, setUser] = useState(authService.getUser());

    const fetchData = useCallback(() => {
        return Promise.all([inhkService.getTeachers(), inhkService.getGroups()])
            .then(data => ({ teachers: data[0], students: data[1] }));
    }, [inhkService]);

    const onUserSelected = (object, role) => {
        const user = new User(object.id, object.name, (() => {
            switch (role) {
                case STUDENT_ROLE:
                    return STUDENT_USER_ROLE;
                case TEACHER_ROLE:
                    return TEACHER_USER_ROLE;
                default:
                    return null;
            }
        })());

        authService.saveUser(user);
        setUser(user);
    }

    const inProgress = () => (
        <FlexContainer minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            <Spinner/>
        </FlexContainer>
    );

    const failed = ({error, restart}) => (
        <FlexContainer minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            <TryAgain onRequestAgain={() => restart()}>
                {error.message}
            </TryAgain>
        </FlexContainer>
    );

    const content = ({data}) => (
        <Padding top={16} right={16} bottom={8} left={16}>
            <Margin bottom={15}>
                <PageTitle>
                    {t('title', {ns: 'login'})}
                </PageTitle>
            </Margin>
            <College students={data?.students || []}
                     teachers={data?.teachers || []}
                     onItemSelected={onUserSelected}/>
        </Padding>
    );

    return (
        user ? (
            <Navigate to='/' replace={true} />
        ) : (
            <div className={styles.login_container}>
                <AsyncData asyncTask={fetchData}
                           failed={failed}
                           content={content}
                           inProgress={inProgress} />
            </div>
        )
    );
}

export function LoginPage() {
    return (
        <AuthProvider>
            <InhkProvider>
                <LoginPageImpl />
            </InhkProvider>
        </AuthProvider>
    );
}
