import styles from './Schedule.module.css';

export function Lesson(props) {
    const lesson = props.lesson;
    return (
        <div className={styles.lesson}>
            <div className={styles.lesson__number}>
                {lesson.number}
            </div>
            <div className={styles.lesson__info}>
                <span className={styles.lesson__info__subject}>
                    {lesson.subject}
                </span>
                <br />
                <span className={styles.lesson__info__teacher}>
                    {lesson.teacher}
                </span>
                <br />
                <span className={styles.lesson__info__place}>
                    {lesson.place}
                </span>
            </div>
        </div>
    );
}

export function Schedule(props) {
    return (
        <section>
            {props.lessons.map(lesson => <Lesson key={lesson.number} lesson={lesson} />)}
        </section>
    );
}
