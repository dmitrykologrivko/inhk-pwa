import styles from './try-again.module.css';

export function TryAgain({ children, onRequestAgain }) {
    return (
        <div className={styles.try_again}>
            <div>{children}</div>
            <br />
            <button onClick={onRequestAgain}>Try Again</button>
        </div>
    );
}
