import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {InhkService} from '../inhk';
import {Margin} from '../common/components/spacing';
import {PageHeading} from '../common/components/titles';
import {AsyncDataView} from '../common/components/views';
import {College} from './college.component';
import styles from './college-view.module.css';

export function CollegeView({ inhkService = new InhkService() }) {
    const {t} = useTranslation();

    const fetchData = useCallback(() => {
        return Promise.all([inhkService.getTeachers(), inhkService.getGroups()])
            .then(data => ({ teachers: data[0], students: data[1] }));
    }, [inhkService]);

    const render = data => (
        <>
            <Margin bottom={15}>
                <PageHeading>
                    {t('title', {ns: 'college'})}
                </PageHeading>
            </Margin>
            <College students={data?.students || []} teachers={data?.teachers || []}/>
        </>
    );

    return (
        <AsyncDataView className={styles.view_container}
                       asyncTask={fetchData}
                       render={render} />
    );
}
