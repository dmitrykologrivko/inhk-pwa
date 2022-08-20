import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { TEACHER_USER_ROLE } from '../auth';
import { useInhk, InhkProvider } from '../inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PageHeading, PageHeadingSecondary } from '../common/components/titles';
import { AsyncData } from '../common/components/async';
import { Spinner } from '../common/components/spinner';
import { TryAgain } from '../common/components/errors';

function UserSchedulePageImpl({userId, role}) {
    const params = useParams();
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

    const failed = (error, restart) => (
        <FlexContainer minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            <TryAgain onRequestAgain={restart}>
                {error.message}
            </TryAgain>
        </FlexContainer>
    );

    const content = data => (
        <Padding top={16} right={16} bottom={8} left={16}>
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
            <ScheduleFeed news={data.news}
                          lessons={data.lessons}
                          isTeacher={data.isTeacher}/>
        </Padding>
    );

    return (
        <AsyncData asyncTask={fetchData}
                   failed={failed}
                   success={content}
                   inProgress={inProgress}/>
    );
}

export function UserSchedulePage({userId, role}) {
    return (
        <InhkProvider>
            <UserSchedulePageImpl userId={userId} role={role} />
        </InhkProvider>
    );
}
