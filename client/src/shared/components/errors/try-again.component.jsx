import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '../buttons';
import styles from './try-again.module.css';

export function TryAgain({ children, onRequestAgain }) {
    const {t} = useTranslation();

    return (
        <div className={styles.try_again}>
            <div>{children}</div>
            <br />
            <PrimaryButton title={t('buttons.tryAgain')}
                           onClick={onRequestAgain} />
        </div>
    );
}
