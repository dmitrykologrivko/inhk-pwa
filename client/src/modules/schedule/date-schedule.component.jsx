import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInhk, InhkProvider } from '../../data/inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../../shared/components/spacing';
import { FlexContainer, Card } from '../../shared/components/containers';
import { PullToRefresh } from '../../shared/components/pull-to-refresh';
import { STATUS_IN_PROGRESS, AsyncData } from '../../shared/components/async';
import { DatePicker, DAY_MONDAY } from '../../shared/components/date-picker';
import { Spinner } from '../../shared/components/spinner';
import { TryAgain } from '../../shared/components/errors';
import { Alert, Modal } from '../../shared/components/modals';
import styles from './date-schedule.module.css';

function DateScheduleImpl({ onDate }) {
    const params = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const inhkService = useInhk();

    const [selectedGroup, setSelectedGroup] = useState(0);
    const [showSelectGroupModal, setShowSelectGroupModal] = useState(false);

    const fetchData = useCallback(() => {
        setSelectedGroup(0);

        const date = onDate || new Date(params.date);

        const mapSchedule = data => ({
            ...data,
            groups: data.schedule.map(item => item.user)
        });

        return inhkService.getScheduleOnDate(date)
            .then(mapSchedule);
    }, [params, onDate, inhkService]);

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

    const content = ({status, data, error, isErrorHandled, onErrorHandled, refresh }) => {
        return (
            <div>
                <PullToRefresh onRefresh={() => refresh()}
                               showProgress={status === STATUS_IN_PROGRESS}>
                    <Padding top={16} right={16} bottom={8} left={16}>
                        {/* Top */}
                        <Margin bottom={15}>
                            <Card>
                                <Padding top={4} bottom={8}>
                                    {data.groups && data.groups.length > 0
                                        ? (
                                            <FlexContainer alignItems='center' justifyContent='center'>
                                                {t('scheduleFor', {ns: 'schedule'})}&nbsp;
                                                <div className={styles.group_select}
                                                     onClick={() => setShowSelectGroupModal(true)}>
                                                    {data.groups[selectedGroup]}
                                                </div>
                                            </FlexContainer>
                                        )
                                        : ('')}

                                    <DatePicker date={data.onDate}
                                                firstDayOfWeek={DAY_MONDAY}
                                                displayOnly={false}
                                                onChange={date => navigate(`/schedule/date/${date.toISOString().split('T')[0]}`)}/>
                                </Padding>
                            </Card>
                        </Margin>

                        {/* Content */}
                        <ScheduleFeed lessons={(data.schedule && data.schedule.length > 0
                                        ? data.schedule.filter(item => item.user === data.groups[selectedGroup])[0].lessons
                                        : [])}
                                      isTeacher={false}/>

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

                <Modal contentClassName={styles.modal_groups_list}
                       show={showSelectGroupModal}
                       onClose={() => setShowSelectGroupModal(false)}
                       body={(
                           <ul className={styles.groups_list}
                               onClick={e => {
                                   setSelectedGroup(data.groups.findIndex(group => group === e.target.innerText));
                                   setShowSelectGroupModal(false);
                               }}>
                               {data.groups.map((item, index) => (
                                   <li key={index} className={styles.groups_list__item}>
                                       {item}
                                   </li>
                               ))}
                           </ul>
                       )} />
            </div>
        );
    };

    return (
        <div className={styles.date_schedule_container}>
            <AsyncData asyncTask={fetchData}
                       inProgress={inProgress}
                       failed={failed}
                       content={content}/>
        </div>
    );
}

export function DateSchedule({ onDate }) {
    return (
        <InhkProvider>
            <DateScheduleImpl date={onDate} />
        </InhkProvider>
    );
}
