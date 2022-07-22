import styles from './card.module.css';

export function Card({ children, padding, className, style }) {
    return (
        <div className={`${styles.card} ${className}`}
            style={{ ...style, padding }}>
            {children}
        </div>
    );
}
