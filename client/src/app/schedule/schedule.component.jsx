import { useTranslation } from 'react-i18next';
import styles from './schedule.module.css';
import userIcon from './icons/user-solid.svg';
import locationIcon from './icons/location-dot-solid.svg';

export function Lesson({lesson, isTeacher}) {
    const {t} = useTranslation();

    const {timeInterval} = lesson;
    const timeFrom = timeInterval.from.getTime();
    const timeTo = timeInterval.to.getTime();
    const timeNow = new Date().getTime();
    const timeLeft = Math.trunc((timeTo - timeNow) / (1000 * 60)) // mins
    const localeTimeFrom = timeInterval.from.toLocaleTimeString(
        navigator.language,
        {
            hour: 'numeric',
            minute: 'numeric'
        }
    );
    const localeTimeTo = timeInterval.to.toLocaleTimeString(
        navigator.language,
        {
            hour: 'numeric',
            minute: 'numeric'
        }
    );
    const isActive = timeNow >= timeFrom && timeNow <= timeTo;
    const isCompleted = timeNow > timeTo;
    const progress = isCompleted ? 100 : Math.trunc(100 - ((timeTo - timeNow) / ((timeTo - timeFrom) / 100)));

    const lessonWrapperClasses = `${styles.lesson_wrapper}
        ${isActive ? styles.lesson__active : isCompleted ? styles.lesson__completed : ''}`;

    return (
        <div className={lessonWrapperClasses}>
            <div className={styles.lesson}>
                <div className={styles.lesson__time_interval}>
                    <span className={styles.lesson__time_interval__from}>
                        {localeTimeFrom}
                    </span>
                    <span className={styles.lesson__time_interval__to}>
                        {localeTimeTo}
                    </span>
                </div>

                <div className={styles.lesson__progress_bar}>
                    <div className={styles.lesson__progress_bar__counter}
                         style={{height: `${progress}%`}}/>
                </div>

                <ul className={styles.lesson__details}>
                    {lesson.details.map((current, i) => ((
                        <li key={i}>
                            <span className={styles.lesson__details__subject}>
                                {current.subject}
                            </span>
                            <br/>
                            <span className={styles.lesson__details__teacher}>
                                <img className={styles.lesson__details__teacher_icon}
                                     src={userIcon}
                                     alt='User icon'/>
                                {isTeacher ? current.group : current.teacher}
                            </span>
                            <br/>
                            <span className={styles.lesson__details__classroom}>
                                <img className={styles.lesson__details__classroom_icon}
                                     src={locationIcon}
                                     alt='Location icon'/>
                                {current.classRoom}
                            </span>
                            <br/>
                        </li>
                    )))}
                </ul>
            </div>

            <div className={styles.lesson_time_left}
                 style={{display: !isActive ? 'none' : ''}}>
                {isActive ? t('timeLeft', {ns: 'schedule', time: timeLeft}) : ''}
            </div>
        </div>
    );
}

export function Schedule({lessons, isTeacher}) {
    return (
        <div>
            {lessons.map(lesson => <Lesson key={lesson.number}
                                           lesson={lesson}
                                           isTeacher={isTeacher}/>)}
        </div>
    );
}
