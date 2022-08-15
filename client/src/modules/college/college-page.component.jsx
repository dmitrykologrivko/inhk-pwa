import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
    TEACHER_USER_ROLE,
    STUDENT_USER_ROLE
} from '../auth';
import {InhkService} from '../inhk';
import {FlexContainer} from '../common/components/containers';
import {Margin, Padding} from '../common/components/spacing';
import {PageHeading} from '../common/components/titles';
import {AsyncData} from '../common/components/async';
import {Spinner} from '../common/components/spinner';
import {TryAgain} from '../common/components/errors';
import {College} from './college.component';

export function CollegePage({ inhkService = new InhkService() }) {
    const navigate = useNavigate();
    const {t} = useTranslation();

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
                <PageHeading>
                    {t('title', {ns: 'college'})}
                </PageHeading>
            </Margin>
            <College students={data?.students || []}
                     teachers={data?.teachers || []}
                     onItemSelected={onUserSelected}/>
        </Padding>
    );

    return (
        <AsyncData asyncTask={fetchData}
                   failed={failed}
                   success={content}
                   inProgress={inProgress} />
    );
}
