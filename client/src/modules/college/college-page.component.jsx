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
            <Margin bottom={15}>
                <PageTitle>
                    {t('title', {ns: 'college'})}
                </PageTitle>
            </Margin>
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
