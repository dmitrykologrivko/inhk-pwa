import { cloneElement } from 'react';
import { useSelectableItems } from './use-selectable-items.hook';

export function SelectableListItem(props) {
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
        <>
            {cloneElement(props.children || props.render(), { onClick: onClickHandler })}
        </>
    );
}

export function SelectableList(props) {
    const { children } = useSelectableItems(props);
    return (
        <>
            {props.render(children)}
        </>
    );
}
