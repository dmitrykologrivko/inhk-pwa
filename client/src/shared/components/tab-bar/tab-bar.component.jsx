import { SelectableList, SelectableListItem } from '../selectable-list';
import { Space } from '../spacing';
import styles from './tab-bar.module.css';

export function TabBarItem(props) {
    const render = () => (
        <div className={styles.item}>
            <div className={`${styles.item__icon} ${props.isActive ? styles.item__icon__active : ''}`}>
                {props.icon}
            </div>
            <Space size={5} />
            <span className={styles.item__title}
                style={{ color: props.isActive ? 'var(--primary-color)' : '' }}>
                {props.title}
            </span>
        </div>
    );

    return (
        <SelectableListItem {...props} render={render} />
    );
}

export function TabBar(props) {
    const render = (children) => (
        <div className={`${styles.bar} ${props.className}`}>
            {children}
        </div>
    );

    return (
        <SelectableList {...props} render={render} />
    );
}
