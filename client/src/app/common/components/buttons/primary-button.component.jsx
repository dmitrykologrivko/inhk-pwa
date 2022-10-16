import styles from './primary-button.module.css';

export function PrimaryButton({title, onClick}) {
    return (
        <button className={styles.button}
                type='button'
                onClick={onClick}>
            {title}
        </button>
    );
}
