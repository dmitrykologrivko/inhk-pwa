import { createPortal } from 'react-dom';

export function PortalHead({ children }) {
    return (
        createPortal(children, document.head)
    );
}
