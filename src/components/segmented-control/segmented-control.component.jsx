import { SelectableList, SelectableListItem } from '../selectable-list';
import styles from './segmented-control.module.css';

export function SegmentedControlItem(props) {
    const style = {
        borderRight: props.isLast ? '' : `1px solid ${props.primaryColor}`,
        ...props.isActive ? {
            backgroundColor: props.primaryColor,
            color: 'white',
            fontWeight: 'bold'
        } : {}
    };

    const render = () => (
        <div className={styles.item} style={style}>
            {props.title}
        </div>
    );

    return (
        <SelectableListItem {...props} render={render} />
    );
}

export function SegmentedControl(props) {
    const render = (children) => (
        <div className={styles.control} style={{ border: `1px solid ${props.primaryColor}` }}>
            {children}
        </div>
    );
    return (
        <SelectableList {...props} render={render} />
    );
}
