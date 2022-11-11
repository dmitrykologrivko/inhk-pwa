import styles from './search-input.module.css';
import magnifyingGlassIcon from './magnifying-glass-solid.svg';

export function SearchInput({ placeholder='Search', onInputChange }) {
    return (
        <div className={styles.input_wrapper}>
            <img className={styles.input_icon}
                src={magnifyingGlassIcon}
                alt="Magnifying glass icon" />
            <input className={styles.input}
                type='search'
                placeholder={placeholder}
                onChange={(e) => {
                    e.preventDefault();
                    if (onInputChange) {
                        onInputChange(e.target.value);
                    }
                }} />
        </div>
    );
}
