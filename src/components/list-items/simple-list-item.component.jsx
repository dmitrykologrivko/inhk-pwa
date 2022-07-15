import { ListItem } from '../list';
import styles from './simple-list-item.module.css';
import angleRightSolidIcon from './angle-right-solid.svg';

export function SimpleListItem(props) {
    return (
        <ListItem {...props}>
            <div className={`${styles.simple_list_item} ${props.isLast ? '' : styles.simple_list_item__bottom_line}`}>
                <span className={styles.simple_list_item__text}>{props.object[props.textKey || 'text']}</span>
                <img className={styles.simple_list_item__icon}
                    src={angleRightSolidIcon}
                    alt='Angle Right Solid Icon' />
            </div>
        </ListItem>
    );
}
