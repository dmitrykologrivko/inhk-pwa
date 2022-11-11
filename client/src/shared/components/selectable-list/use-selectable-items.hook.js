import { cloneElement, useState, useEffect } from 'react';

export function useSelectableItems(props) {
    let children = Array.isArray(props.children)
        ? props.children
        : [props.children];

    const [items, setItems] = useState(() => {
        const items = [];

        for (let i = 0; i < children.length; i++) {
            items.push({
                key: i,
                index: i,
                isActive: i === 0,
                isFirst: i === 0,
                isLast: i === children.length - 1
            });
        }

        return items;
    });

    useEffect(() => {
        if (props.selectedIndex === undefined) {
            return;
        }

        setItems(items => items.map(item => {
            return { ...item, isActive: item.index === props.selectedIndex };
        }));
    }, [props.selectedIndex]);

    const eventsDispatcher = {
        onClick: (index) => {
            setItems(items => items.map(item => {
                return { ...item, isActive: item.index === index };
            }));

            if (props.onItemSelected) {
                props.onItemSelected(index);
            }
        }
    };

    children = children.map((child, i) => cloneElement(child, {
        ...items[i],
        eventsDispatcher,
        primaryColor: props.primaryColor
    }))

    return {
        items,
        eventsDispatcher,
        children,
    };
}
