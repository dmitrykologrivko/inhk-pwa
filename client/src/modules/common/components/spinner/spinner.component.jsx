import './spinner-animation.css';
import styles from './spinner.module.css';

export function Spinner({duration = 1.5}) {
    return (
        <div className={styles.spinner}
             style={{animation: `spinner ${duration}s linear infinite`}}/>
    );
}
