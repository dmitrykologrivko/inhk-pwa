import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    TEACHER_USER_ROLE,
    STUDENT_USER_ROLE
} from '../../data/auth';
import { useInhk, InhkProvider } from '../../data/inhk';
import { FlexContainer } from '../../shared/components/containers';
import { Margin, Padding } from '../../shared/components/spacing';
import { PageTitle } from '../../shared/components/titles';
import { AsyncData } from '../../shared/components/async';
import { Spinner } from '../../shared/components/spinner';
import { TryAgain } from '../../shared/components/errors';
import { College } from './college.component';
import styles from './college-page.module.css';
import calendarIcon from '../../assets/icons/calendar-day-solid.svg';

function CollegePageImpl() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const inhkService = useInhk();

    const fetchData = useCallback(() => {
        return Promise.all([inhkService.getTeachers(), inhkService.getGroups()])
            .then(data => ({ teachers: data[0], students: data[1] }));
    }, [inhkService]);

    const onUserSelected = (object, role) => {
        if (role === TEACHER_USER_ROLE) {
            navigate(`/schedule/teacher/${object.id}`);
            return;
        }
        if (role === STUDENT_USER_ROLE) {
            navigate(`/schedule/group/${object.id}`);
        }
    };

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
            {/* Top */}
            <Margin bottom={15}>
                <FlexContainer alignItems='center' justifyContent='space-between'>
                    <PageTitle>
                        {t('title', {ns: 'college'})}
                    </PageTitle>
                    <img className={styles.date_icon}
                         src={calendarIcon}
                         alt='Date Icon'
                         onClick={() => navigate(`/schedule/date/${new Date().toISOString().split('T')[0]}`)}/>
                </FlexContainer>
            </Margin>

            {/* College */}
            <College students={data?.students || []}
                     teachers={data?.teachers || []}
                     onItemSelected={onUserSelected}/>
        </Padding>
    );

    return (
        <AsyncData asyncTask={fetchData}
                   failed={failed}
                   content={content}
                   inProgress={inProgress} />
    );
}

export function CollegePage() {
    return (
        <InhkProvider>
            <CollegePageImpl />
        </InhkProvider>
    );
}
