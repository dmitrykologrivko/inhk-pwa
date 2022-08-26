import { createPortal } from 'react-dom';

export function ReactHead({ children }) {
    return (
        createPortal(children, document.head)
    );
}
