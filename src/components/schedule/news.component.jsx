import styles from './news.module.css';

export function News({ news }) {
    return (
        <section className={styles.news}>
            <ul className={styles.news__list}>
                {news.map((current, index) => <li key={index}>{current}</li>)}
            </ul>
        </section>
    );
}
