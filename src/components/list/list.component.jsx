import { cloneElement } from 'react';
import styles from './list.module.css';
import angleRightSolidIcon from './angle-right-solid.svg';

export function ListItem(props) {
    const onClickHandler = (e) => {
        e.preventDefault();

        if (props.eventsDispacther) {
            props.eventsDispacther.onClick(props.index, props.object);
        }

        if (props.onClick) {
            props.onClick();
        }
    };

    return cloneElement(props.children, { onClick: onClickHandler });
}

export function SimpleListItem(props) {
    return (
        <ListItem {...props}>
            <div className={`${styles.simple_list_item} ${props.isLast ? '' : styles.simple_list_item__bottom_line}`}>
                <span className={styles.simple_list_item__text}>{props.object.text}</span>
                <img className={styles.simple_list_item__icon}
                    src={angleRightSolidIcon}
                    alt='Angle Right Solid Icon' />
            </div>
        </ListItem>
    );
}

export function List(props) {
    const eventsDispacther = {
        onClick: (index, object) => {
            if (props.onItemClicked) {
                props.onItemClicked(index, object);
            }
        }
    };

    const items = props.children
        ? props.children.map((child, index) => cloneElement(child, {
            key: index,
            isFirst: index === 0,
            isLast: index === props.children.length - 1,
            index,
            eventsDispacther
        }))
        : props.items.map((item, index) => <SimpleListItem key={index}
            index={index}
            isFirst={index === 0}
            isLast={index === props.items.length - 1}
            eventsDispacther={eventsDispacther}
            object={item} />
        );

    return (
        <div>
            {items}
        </div>
    );
}
