import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, AuthProvider } from '../auth';
import { useInhk, InhkProvider } from '../inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PullToRefresh } from '../common/components/pull-to-refresh';
import { PageHeading, PageHeadingSecondary } from '../common/components/titles';
import { STATUS_IN_PROGRESS, AsyncData } from '../common/components/async';
import { Spinner } from '../common/components/spinner';
import { TryAgain } from '../common/components/errors';
import { Alert } from '../common/components/modals';
import styles from './my-schedule-page.module.css';
import logoutIcon from './arrow-right-from-bracket-solid.svg';

function MySchedulePageImpl() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const inhkService = useInhk();
    const authService = useAuth();

    const [user] = useState(authService.getUser());
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const fetchData = useCallback(() => {
        if (!user) {
            return Promise.resolve({});
        }

        const mapSchedule = data => ({
            ...data,
            lessons: data.schedule && data.schedule.length > 0
                ? data.schedule[0].lessons
                : [],
            isTeacher: user.isTeacher(),
        });

        if (user.isTeacher()) {
            return inhkService.getTeacherSchedule(user.id)
                .then(mapSchedule);
        } else {
            return inhkService.getGroupSchedule(user.id)
                .then(mapSchedule);
        }
    }, [user, inhkService]);

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

    const content = ({status, data, error, isErrorHandled, onErrorHandled, restart }) => {
        if (!user) {
            return (
                <FlexContainer minHeight='inherit'
                               alignItems='center'
                               justifyContent='center'>
                    <TryAgain buttonLabel={t('signIn', {ns: 'schedule'})}
                              onRequestAgain={() => navigate('/login')}>
                        {t('notAuthorized', {ns: 'schedule'})}
                    </TryAgain>
                </FlexContainer>
            );
        }

        return (
            <PullToRefresh onRefresh={() => restart(true)}
                           showProgress={status === STATUS_IN_PROGRESS}>
                <Padding top={16} right={16} bottom={8} left={16}>
                    {/* Top */}
                    <Margin bottom={15}>
                        <FlexContainer alignItems='center' justifyContent='space-between'>
                            <div>
                                <PageHeading>
                                    {user.name}
                                </PageHeading>
                                <PageHeadingSecondary>
                                    {data.onDate}
                                </PageHeadingSecondary>
                            </div>
                            <img className={styles.logout_icon}
                                 src={logoutIcon}
                                 alt='Logout Icon'
                                 onClick={() => setShowSignOutModal(true)}/>
                        </FlexContainer>
                    </Margin>

                    {/* Content */}
                    <ScheduleFeed news={data.news}
                                  lessons={data.lessons}
                                  isTeacher={data.isTeacher}/>

                    {/* Sign Out Alert */}
                    <Alert show={showSignOutModal}
                           onClose={() => {
                               setShowSignOutModal(false);
                           }}
                           onPositiveButtonClick={() => {
                               authService.clear();
                               navigate('/login');
                           }}
                           title={t('signOut', {ns: 'schedule'})}
                           message={t('signOutMessage', {ns: 'schedule'})}
                           negativeButtonLabel={t('buttons.no')}
                           positiveButtonLabel={t('buttons.yes')}/>

                    {/* Error Alert */}
                    <Alert show={!isErrorHandled}
                           onClose={() => {
                               onErrorHandled();
                           }}
                           title={t('titles.error')}
                           message={error?.message}
                           positiveButtonLabel={t('buttons.ok')}/>
                </Padding>
            </PullToRefresh>
        );
    };

    return (
        <AsyncData asyncTask={fetchData}
                   inProgress={inProgress}
                   failed={failed}
                   content={content}/>
    );
}

export function MySchedulePage() {
    return (
        <AuthProvider>
            <InhkProvider>
                <MySchedulePageImpl />
            </InhkProvider>
        </AuthProvider>
    );
}
