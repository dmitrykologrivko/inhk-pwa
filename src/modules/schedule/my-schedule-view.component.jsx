import { useState, useEffect } from 'react';
import { ScheduleFeed } from './schedule-feed.component';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PageHeading, PageHeadingSecondary } from '../common/components/titles';
import { Spinner } from '../common/components/spinner';
import { TryAgain } from '../common/components/errors';
import styles from './my-schedule-view.module.css';
import logoutIcon from './arrow-right-from-bracket-solid.svg';

const newsCache = ["Today's lessons will be shorter on 10 mins"];
const lessonsCache = [
    {
        number: 1,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() - 3);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() - 2);
                return now;
            })(),
        },
        info: [
            {
                subject: 'Physics (practice)',
                teacher: 'John Smith',
                classRoom: '5'
            },
            {
                subject: 'Physics (practice)',
                teacher: 'Kate Smith',
                classRoom: '6'
            }
        ]
    },
    {
        number: 2,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() - 1);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 1);
                return now;
            })(),
        },
        info: [
            {
                subject: 'English',
                teacher: 'Lisa Williams',
                classRoom: '425'
            }
        ]
    },
    {
        number: 3,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 4);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 5);
                return now;
            })(),
        },
        info: [
            {
                subject: 'Mathematics',
                teacher: 'Eva Johnson',
                classRoom: '405'
            }
        ]
    },
    {
        number: 4,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 6);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 7);
                return now;
            })(),
        },
        info: [
            {
                subject: 'Informatics',
                teacher: 'John Smith',
                classRoom: '5'
            }
        ]
    },
    {
        number: 5,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 6);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 7);
                return now;
            })(),
        },
        info: [
            {
                subject: 'Informatics',
                teacher: 'John Smith',
                classRoom: '5'
            }
        ]
    },
    {
        number: 6,
        timeInterval: {
            from: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 6);
                return now;
            })(),
            to: (() => {
                const now = new Date();
                now.setHours(now.getHours() + 7);
                return now;
            })(),
        },
        info: [
            {
                subject: 'Informatics',
                teacher: 'John Smith',
                classRoom: '5'
            }
        ]
    },
];
const primaryColor = '#4da7fe';

export function MyScheduleView() {
    const [news, setNews] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(new Date().toLocaleDateString());
    const [isLoading, setIsLoading] = useState(true);
    const [errorMesssage, setErrorMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setErrorMessage('');
            setNews(newsCache);
            setLessons(lessonsCache);
        }, 1000);
    }, [isLoading]);

    const content = errorMesssage ? (
        <FlexContainer className={styles.view_container}
            alignItems='center'
            justifyContent='center'>
            <TryAgain onRequestAgain={() => { }}>
                {errorMesssage}
            </TryAgain>
        </FlexContainer>
    ) : (
        <div className={styles.view_container}>
            <Padding top={16} right={16} bottom={8} left={16}>
                <Margin bottom={15}>
                    <FlexContainer alignItems='center' justifyContent='space-between'>
                        <div>
                            <PageHeading>
                                ЭВМ-52
                            </PageHeading>
                            <PageHeadingSecondary>
                                {scheduleDate}
                            </PageHeadingSecondary>
                        </div>
                        <img className={styles.logout_icon} src={logoutIcon} alt='Logout Icon' />
                    </FlexContainer>
                </Margin>
                <ScheduleFeed news={news}
                    lessons={lessons}
                    primaryColor={primaryColor} />
            </Padding>
        </div>
    );

    return (
        isLoading ? (
            <FlexContainer className={styles.view_container}
                alignItems='center'
                justifyContent='center'>
                <Spinner color={primaryColor}
                    secondaryColor='#f3f3f3' />
            </FlexContainer>
        ) : (content)
    );
}
