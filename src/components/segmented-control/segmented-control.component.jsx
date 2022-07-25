import { SelectableList, SelectableListItem } from '../selectable-list';
import styles from './segmented-control.module.css';

export function SegmentedControlItem(props) {
    const render = () => (
        <div className={`${styles.item} ${props.isActive ? styles.item__active : ''}`}>
            {props.title}
        </div>
    );

    return (
        <SelectableListItem {...props} render={render} />
    );
}

export function SegmentedControl(props) {
    const render = (children) => (
        <div className={styles.control}>
            {children}
        </div>
    );
    return (
        <SelectableList {...props} render={render} />
    );
}
