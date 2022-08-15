import styles from './try-again.module.css';

export function TryAgain({ children, buttonLabel, onRequestAgain }) {
    return (
        <div className={styles.try_again}>
            <div>{children}</div>
            <br />
            <button onClick={onRequestAgain}>{buttonLabel || 'Try Again'}</button>
        </div>
    );
}
