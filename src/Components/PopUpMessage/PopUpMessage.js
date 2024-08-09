import styles from './PopUpMessage.module.css';
import React from 'react';

const PopUpMessage = ({ show, message="修改成功", onClose}) => {

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitle}> {message} </div>
                <div className={styles.submitBox}>
                    <input className={styles.submitButton} type="submit" onClick={onClose} value={'確認'} />
                </div>
            </div>
        </div>
    );
};

export default PopUpMessage;