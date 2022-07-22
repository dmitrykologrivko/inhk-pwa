import { SelectableList, SelectableListItem } from '../selectable-list';
import styles from './tab-bar.module.css';

export function TabBarItem(props) {
    const render = () => (
        <div className={styles.item}>
            <img className={styles.item__icon}
                src={props.isActive ? props.icon_active : props.icon}
                alt={props.alt} />
            <br />
            <span className={styles.item__title}
                style={{ color: props.isActive ? props.primaryColor : '' }}>
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
        <div className={`${styles.bar} ${props.className}`}
            style={{
                ...props.style,
                primaryColor: props.primaryColor,
                backgroundColor: `${props.backgroundColor}`,
                borderTop: `1px solid ${props.borderTopColor}`
            }}>
            {children}
        </div>
    );

    return (
        <SelectableList {...props} render={render} />
    );
}
