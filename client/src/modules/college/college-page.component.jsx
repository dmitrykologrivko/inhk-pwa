import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {InhkService} from '../inhk';
import {FlexContainer} from '../common/components/containers';
import {Margin, Padding} from '../common/components/spacing';
import {PageHeading} from '../common/components/titles';
import {AsyncData} from '../common/components/async';
import {Spinner} from '../common/components/spinner';
import {TryAgain} from '../common/components/errors';
import {College} from './college.component';

export function CollegePage({ inhkService = new InhkService() }) {
    const {t} = useTranslation();

    const fetchData = useCallback(() => {
        return Promise.all([inhkService.getTeachers(), inhkService.getGroups()])
            .then(data => ({ teachers: data[0], students: data[1] }));
    }, [inhkService]);

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
            <College students={data?.students || []} teachers={data?.teachers || []}/>
        </Padding>
    );

    return (
        <AsyncData asyncTask={fetchData}
                   failed={failed}
                   success={content}
                   inProgress={inProgress} />
    );
}
