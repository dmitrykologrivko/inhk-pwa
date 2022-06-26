import { cloneElement, useState } from 'react';
import styles from './BottomNavigationBar.module.css';

class BottomNavigationBarError extends Error { }

export function BottomNavigationBarItem(props) {
    const onClickHandler = (e) => {
        e.preventDefault();

        if (props.eventsDispatcher) {
            props.eventsDispatcher.onClick(props.index);
        }

        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <div className={styles.item} onClick={onClickHandler}>
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
}

export function BottomNavigationBar(props) {
    if (!props.children) {
        throw new BottomNavigationBarError('Bottom Navigation Bar must contain at least one item');
    }

    const children = Array.isArray(props.children)
        ? props.children
        : [props.children];

    const [items, setItems] = useState(() => {
        const items = [];

        for (let i = 0; i < children.length; i++) {
            items.push({
                key: i,
                index: i,
                isActive: i === 0 ? true : false,
            });
        }

        return items;
    });

    const eventsDispatcher = {
        onClick: (index) => {
            setItems(items => items.map(item => {
                return { ...item, isActive: item.index === index ? true : false };
            }));

            if (props.onItemSelected) {
                props.onItemSelected(index);
            }
        }
    };

    const style = {
        primaryColor: props.primaryColor,
        backgroundColor: `${props.backgroundColor}`,
        borderTop: `1px solid ${props.borderTopColor}`
    };

    return (
        <section className={styles.bar} style={style}>
            {children.map((child, i) => cloneElement(child, {
                ...items[i],
                eventsDispatcher,
                primaryColor: props.primaryColor
            }))}
        </section>
    );
}
