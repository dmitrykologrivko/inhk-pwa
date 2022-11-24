import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, AuthProvider } from '../../data/auth';
import { useInhk, InhkProvider } from '../../data/inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../../shared/components/spacing';
import { FlexContainer, Card } from '../../shared/components/containers';
import { PullToRefresh } from '../../shared/components/pull-to-refresh';
import { PageTitle } from '../../shared/components/titles';
import { STATUS_IN_PROGRESS, AsyncData } from '../../shared/components/async';
import { DatePicker, DAY_MONDAY } from '../../shared/components/date-picker';
import { Spinner } from '../../shared/components/spinner';
import { TryAgain } from '../../shared/components/errors';
import { Alert } from '../../shared/components/modals';
import styles from './my-schedule-page.module.css';
import logoutIcon from './icons/arrow-right-from-bracket-solid.svg';

function MySchedulePageImpl() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const inhkService = useInhk();
    const authService = useAuth();

    const [user] = useState(authService.getUser());
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const fetchData = useCallback(({ force }) => {
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
            return inhkService.getTeacherSchedule(user.id, force)
                .then(mapSchedule);
        } else {
            return inhkService.getGroupSchedule(user.id, force)
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
            <TryAgain onRequestAgain={() => restart({ force: false })}>
                {error.message}
            </TryAgain>
        </FlexContainer>
    );

    const content = ({status, data, error, isErrorHandled, onErrorHandled, refresh }) => {
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
            <PullToRefresh onRefresh={() => refresh({ force: true })}
                           showProgress={status === STATUS_IN_PROGRESS}>
                <Padding top={16} right={16} bottom={8} left={16}>
                    <div>v2</div>
                    {/* Top */}
                    <Margin bottom={15}>
                        <FlexContainer alignItems='center' justifyContent='space-between'>
                            <PageTitle>
                                {user.name}
                            </PageTitle>
                            <img className={styles.logout_icon}
                                 src={logoutIcon}
                                 alt='Logout Icon'
                                 onClick={() => setShowSignOutModal(true)}/>
                        </FlexContainer>
                    </Margin>

                    {/* Date Picker */}
                    <Margin bottom={15}>
                        <Card>
                            <Padding top={4} bottom={8}>
                                <DatePicker date={data.onDate} firstDayOfWeek={DAY_MONDAY} />
                            </Padding>
                        </Card>
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
                   taskArgs={{ force: false }}
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
