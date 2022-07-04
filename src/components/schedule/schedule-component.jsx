import styles from './schedule.module.css';
import userIcon from './user-solid.svg';
import locationIcon from './location-dot-solid.svg';

const LESSON_COMPLETED_COLOR = '#48dd7c';

export function Lesson({ lesson, primaryColor }) {
    const { timeInterval } = lesson;
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

    return (
        <div className={styles.lesson_wrapper} style={{
            border: `2px solid ${isActive ? primaryColor : isCompleted ? LESSON_COMPLETED_COLOR : 'none'}`
        }}>
            <div className={styles.lesson}>
                <div className={styles.lesson__time_interval}>
                    <span className={styles.lesson__time_interval__from}
                        style={{ color: primaryColor }}>
                        {localeTimeFrom}
                    </span>
                    <span className={styles.lesson__time_interval__to}
                        style={{ color: primaryColor }}>
                        {localeTimeTo}
                    </span>
                </div>

                <div className={styles.lesson__progress_bar}
                    style={{ backgroundColor: primaryColor }}>
                    <div className={styles.lesson__progress_bar__counter}
                        style={{ height: `${progress}%`, backgroundColor: LESSON_COMPLETED_COLOR }} />
                </div>

                <ul className={styles.lesson__info}>
                    {lesson.info.map((current, i) => ((
                        <li key={i}>
                            <span className={styles.lesson__info__subject}>
                                {current.subject}
                            </span>
                            <br />
                            <span className={styles.lesson__info__teacher}>
                                <img className={styles.lesson__info__teacher_icon}
                                    src={userIcon}
                                    alt='User icon' />
                                {current.teacher}
                            </span>
                            <br />
                            <span className={styles.lesson__info__classroom}>
                                <img className={styles.lesson__info__classroom_icon}
                                    src={locationIcon}
                                    alt='Location icon' />
                                {current.classRoom}
                            </span>
                            <br />
                        </li>
                    )))}
                </ul>
            </div >

            <div className={styles.lesson_time_left}
                style={{
                    backgroundColor: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    display: !isActive ? 'none' : ''
                }}>
                {isActive ? `осталось ${timeLeft} минут` : ''}
            </div>
        </div>
    );
}

export function Schedule({ lessons, primaryColor }) {
    return (
        <section>
            {lessons.map(lesson => <Lesson key={lesson.number} lesson={lesson} primaryColor={primaryColor} />)}
        </section>
    );
}
