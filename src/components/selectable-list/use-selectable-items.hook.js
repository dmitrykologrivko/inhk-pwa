import { cloneElement, useState } from 'react'; 

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
                isActive: i === 0 ? true : false,
                isFirst: i === 0 ? true : false,
                isLast: i === children.length - 1 ? true : false
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
