import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { TEACHER_USER_ROLE } from '../auth';
import { useInhk, InhkProvider } from '../inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PullToRefresh } from '../common/components/pull-to-refresh';
import { PageHeading, PageHeadingSecondary } from '../common/components/titles';
import { AsyncData, STATUS_IN_PROGRESS } from '../common/components/async';
import { Spinner } from '../common/components/spinner';
import { TryAgain } from '../common/components/errors';
import { Alert } from '../common/components/modals';
import styles from './user-schedule.module.css';

function UserSchedulePageImpl({userId, role}) {
    const params = useParams();
    const {t} = useTranslation();
    const inhkService = useInhk();

    const fetchData = useCallback(() => {
        const id = userId || params.id;
        const isTeacher = role === TEACHER_USER_ROLE;

        const mapSchedule = data => ({
            ...data,
            lessons: data.schedule && data.schedule.length > 0
                ? data.schedule[0].lessons
                : [],
            isTeacher: isTeacher,
        });

        if (isTeacher) {
            return inhkService.getTeacherSchedule(id)
                .then(mapSchedule);
        } else {
            return inhkService.getGroupSchedule(id)
                .then(mapSchedule);
        }
    }, [params, userId, role, inhkService]);

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
        return (
            <PullToRefresh onRefresh={() => {restart(true)}}
                           showProgress={status === STATUS_IN_PROGRESS}>
                <Padding top={16} right={16} bottom={8} left={16}>
                    {/* Top */}
                    <Margin bottom={15}>
                        <FlexContainer alignItems='center' justifyContent='space-between'>
                            <div>
                                <PageHeading>
                                    {data.current}
                                </PageHeading>
                                <PageHeadingSecondary>
                                    {data.onDate}
                                </PageHeadingSecondary>
                            </div>
                        </FlexContainer>
                    </Margin>

                    {/* Content */}
                    <ScheduleFeed news={data.news}
                                  lessons={data.lessons}
                                  isTeacher={data.isTeacher}/>

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
        <div className={styles.user_schedule_container}>
            <AsyncData asyncTask={fetchData}
                       inProgress={inProgress}
                       failed={failed}
                       content={content}/>
        </div>
    );
}

export function UserSchedulePage({userId, role}) {
    return (
        <InhkProvider>
            <UserSchedulePageImpl userId={userId} role={role} />
        </InhkProvider>
    );
}
