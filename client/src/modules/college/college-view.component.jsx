import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {InhkService} from '../inhk';
import {useAsyncTask} from '../common/hooks';
import {Margin} from '../common/components/spacing';
import {PageHeading} from '../common/components/titles';
import {AsyncDataView} from '../common/components/views';
import {College} from './college.component';
import styles from './college-view.module.css';

export function CollegeView() {
    const {t} = useTranslation();

    const fetchData = useCallback(() => {
        const service = new InhkService();
        return Promise.all([service.getTeachers(), service.getGroups()])
            .then(data => ({ teachers: data[0], students: data[1] }));
    }, []);

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
