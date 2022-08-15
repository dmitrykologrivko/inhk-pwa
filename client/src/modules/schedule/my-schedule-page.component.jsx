import {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {AuthService} from '../auth';
import {InhkService} from '../inhk';
import {ScheduleFeed} from './schedule-feed.component';
import {Margin, Padding} from '../common/components/spacing';
import {FlexContainer} from '../common/components/containers';
import {PageHeading, PageHeadingSecondary} from '../common/components/titles';
import {AsyncData} from '../common/components/async';
import {Spinner} from '../common/components/spinner';
import {TryAgain} from '../common/components/errors';
import styles from './my-schedule-page.module.css';
import logoutIcon from './arrow-right-from-bracket-solid.svg';

export function MySchedulePage({
    authService = new AuthService(),
    inhkService = new InhkService()
}) {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [user] = useState(authService.getUser());

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

    const failed = (error, restart) => (
        <FlexContainer minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            <TryAgain onRequestAgain={restart}>
                {error.message}
            </TryAgain>
        </FlexContainer>
    );

    const content = data => user ? (
        <Padding top={16} right={16} bottom={8} left={16}>
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
                    <img className={styles.logout_icon} src={logoutIcon} alt='Logout Icon'/>
                </FlexContainer>
            </Margin>
            <ScheduleFeed news={data.news}
                          lessons={data.lessons}
                          isTeacher={data.isTeacher}/>
        </Padding>
    ) : (
        <FlexContainer minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            <TryAgain buttonLabel={t('signIn', {ns: 'schedule'})}
                      onRequestAgain={() => navigate('/login')}>
                {t('notAuthorized', {ns: 'schedule'})}
            </TryAgain>
        </FlexContainer>
    );

    return (
        <AsyncData asyncTask={fetchData}
                   failed={failed}
                   success={content}
                   inProgress={inProgress}/>
    );
}
