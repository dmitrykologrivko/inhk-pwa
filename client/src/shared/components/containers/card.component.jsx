import styles from './card.module.css';

export function Card({ children, padding, className, style, onClick }) {
    return (
        <div className={`${styles.card} ${className}`}
            style={{ ...style, padding }}
            onClick={onClick}>
            {children}
        </div>
    );
}
