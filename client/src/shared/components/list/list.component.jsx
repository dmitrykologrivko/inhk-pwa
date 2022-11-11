import { cloneElement } from 'react';

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

export function List(props) {
    let children = Array.isArray(props.children)
        ? props.children
        : [props.children];

    const eventsDispacther = {
        onClick: (index, object) => {
            if (props.onItemClicked) {
                props.onItemClicked(index, object);
            }
        }
    };

    children = children.map((child, index) => cloneElement(child, {
        key: index,
        isFirst: index === 0,
        isLast: index === props.children.length - 1,
        index,
        eventsDispacther
    }));

    return (
        <>
            {props.render ? props.render(children) : <div>{children}</div>}
        </>
    );
}
