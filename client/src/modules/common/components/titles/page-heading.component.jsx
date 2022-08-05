import styles from './page-heading.module.css';

export function PageHeading({ children }) {
    return (<h3 className={styles.page_heading}>{children}</h3>);
}

export function PageHeadingSecondary({ children }) {
    return (<h5 className={styles.page_heading_secondary}>{children}</h5>);
}
