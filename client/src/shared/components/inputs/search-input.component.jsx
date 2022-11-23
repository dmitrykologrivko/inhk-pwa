import { useTranslation } from 'react-i18next';
import styles from './search-input.module.css';
import magnifyingGlassIcon from './magnifying-glass-solid.svg';

export function SearchInput({ onInputChange }) {
    const {t} = useTranslation();

    return (
        <div className={styles.input_wrapper}>
            <img className={styles.input_icon}
                src={magnifyingGlassIcon}
                alt="Magnifying glass icon" />
            <input className={styles.input}
                type='search'
                placeholder={t('inputs.search')}
                onChange={(e) => {
                    e.preventDefault();
                    if (onInputChange) {
                        onInputChange(e.target.value);
                    }
                }} />
        </div>
    );
}
