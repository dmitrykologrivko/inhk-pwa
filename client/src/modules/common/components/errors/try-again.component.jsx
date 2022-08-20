import {PrimaryButton} from '../buttons';
import styles from './try-again.module.css';

export function TryAgain({ children, buttonLabel, onRequestAgain }) {
    return (
        <div className={styles.try_again}>
            <div>{children}</div>
            <br />
            <PrimaryButton title={buttonLabel || 'Try Again'}
                           onClick={onRequestAgain} />
        </div>
    );
}
