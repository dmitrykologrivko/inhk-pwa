import { Card } from '../containers';
import styles from './news.module.css';

export function News({ news }) {
    return (
        <Card padding={'1em'}>
            <div className={styles.news}>
                <ul className={styles.news__list}>
                    {news.map((current, index) => <li key={index}>{current}</li>)}
                </ul>
            </div>
        </Card>
    );
}
