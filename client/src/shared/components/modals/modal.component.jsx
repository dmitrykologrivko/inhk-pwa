import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export function Modal(props) {
    if (!props.show) {
        return <></>;
    }

    return (
        createPortal(
            <div className={styles.modal} onClick={props.onClose}>
                <div className={props.contentClassName} onClick={e => e.stopPropagation()}>
                    <div>{props.header}</div>
                    <div>{props.body}</div>
                    <div>{props.footer}</div>
                </div>
            </div>,
            document.getElementById('root')
        )
    );
}
