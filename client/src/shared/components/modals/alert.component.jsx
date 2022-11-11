import {Modal} from './modal.component';
import styles from './alert.module.css';

export function Alert(props) {
    const header = (
        <div className={styles.header}>
            {props.title}
        </div>
    );
    const body = (
        <div className={styles.body}>
            {props.message}
        </div>
    );
    const footer = (
        <div className={styles.footer}>
            {props.negativeButtonLabel ? (
                <button className={styles.button}
                        onClick={() => {
                            if (props.onNegativeButtonClick) {
                                props.onNegativeButtonClick();
                            }
                            if (props.onClose) {
                                props.onClose();
                            }
                        }}>
                    {props.negativeButtonLabel}
                </button>
            ) : ('')}
            {props.positiveButtonLabel ? (
                <button className={styles.button}
                        onClick={() => {
                            if (props.onPositiveButtonClick) {
                                props.onPositiveButtonClick();
                            }
                            if (props.onClose) {
                                props.onClose();
                            }
                        }}>
                    {props.positiveButtonLabel}
                </button>
            ) : ('')}
        </div>
    );

    return (
        <Modal {...props}
               contentClassName={styles.content}
               header={header}
               body={body}
               footer={footer}/>
    );
}
