import styles from './page-title.module.css';

export function PageTitle({ children }) {
    return (<h3 className={styles.title}>{children}</h3>);
}

export function PageTitleSecondary({ children }) {
    return (<h5 className={styles.title_secondary}>{children}</h5>);
}
