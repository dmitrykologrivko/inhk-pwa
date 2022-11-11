import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { TEACHER_USER_ROLE } from '../../data/auth';
import {
    useInhk,
    InhkProvider,
    useFavorites,
    FavoritesProvider
} from '../../data/inhk';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../../shared/components/spacing';
import { FlexContainer } from '../../shared/components/containers';
import { PullToRefresh } from '../../shared/components/pull-to-refresh';
import { PageTitle, PageTitleSecondary } from '../../shared/components/titles';
import { AsyncData, STATUS_IN_PROGRESS } from '../../shared/components/async';
import { Spinner } from '../../shared/components/spinner';
import { TryAgain } from '../../shared/components/errors';
import { Alert } from '../../shared/components/modals';
import styles from './user-schedule.module.css';
import heartIcon from './icons/cards-heart.svg';
import heartOutlineIcon from './icons/cards-heart-outline.svg';

function UserSchedulePageImpl({ userId, role }) {
    const params = useParams();
    const {t} = useTranslation();
    const inhkService = useInhk();
    const favoritesService = useFavorites();

    const [isFavorite, setIsFavorite] = useState(false);

    const fetchData = useCallback(({ force }) => {
        const id = userId || Number.parseInt(params.id);
        const isTeacher = role === TEACHER_USER_ROLE;

        const mapSchedule = data => ({
            ...data,
            id,
            lessons: data.schedule && data.schedule.length > 0
                ? data.schedule[0].lessons
                : [],
            isTeacher: isTeacher,
        });

        const promises = [];

        if (isTeacher) {
            promises.push(
                inhkService.getTeacherSchedule(id, force),
                favoritesService.isTeacherFavorite(id)
            );
        } else {
            promises.push(
                inhkService.getGroupSchedule(id, force),
                favoritesService.isGroupFavorite(id)
            );
        }

        return Promise.all(promises)
            .then(values => {
                setIsFavorite(values[1]);
                return mapSchedule(values[0]);
            });
    }, [params, userId, role, inhkService, favoritesService]);

    const onFavoritesIconClick = data => {
        if (isFavorite && data.isTeacher) {
            favoritesService.removeFavoriteTeacher(data.id)
                .then();
        } else if (!isFavorite && data.isTeacher) {
            favoritesService.saveFavoriteTeacher(data.id, data.current)
                .then();
        }

        if (isFavorite && !data.isTeacher) {
            favoritesService.removeFavoriteGroup(data.id)
                .then();
        } else if (!isFavorite && !data.isTeacher) {
            favoritesService.saveFavoriteGroup(data.id, data.current)
                .then();
        }

        setIsFavorite(isFavorite => !isFavorite);
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
            <TryAgain onRequestAgain={() => restart({ force: false })}>
                {error.message}
            </TryAgain>
        </FlexContainer>
    );

    const content = ({status, data, error, isErrorHandled, onErrorHandled, refresh }) => {
        return (
            <PullToRefresh onRefresh={() => refresh({ force: true })}
                           showProgress={status === STATUS_IN_PROGRESS}>
                <Padding top={16} right={16} bottom={8} left={16}>
                    {/* Top */}
                    <Margin bottom={15}>
                        <FlexContainer alignItems='center' justifyContent='space-between'>
                            <div>
                                <PageTitle>
                                    {data.current}
                                </PageTitle>
                                <PageTitleSecondary>
                                    {data.onDate}
                                </PageTitleSecondary>
                            </div>
                            <img className={styles.favorites_icon}
                                 src={isFavorite ? heartIcon : heartOutlineIcon}
                                 alt='Favorites Icon'
                                 onClick={() => onFavoritesIconClick(data)}/>
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
                       taskArgs={{ force: false }}
                       inProgress={inProgress}
                       failed={failed}
                       content={content}/>
        </div>
    );
}

export function UserSchedulePage({userId, role}) {
    return (
        <InhkProvider>
            <FavoritesProvider>
                <UserSchedulePageImpl userId={userId} role={role} />
            </FavoritesProvider>
        </InhkProvider>
    );
}
