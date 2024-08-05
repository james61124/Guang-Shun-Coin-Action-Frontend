import styles from './ConfirmModal.module.css';
import React from 'react'

const ConfirmModal = ({ show, onClose, onButtonClick, text }) => {

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.confirmationContent}>{text}</div>
                <div className={styles.ButtonWrapper}>
                    <div className={styles.submitBox} onClick={onButtonClick}>
                        <div className={styles.submitButton}>確認</div>
                    </div>
                    <div className={styles.submitBox} onClick={onClose}>
                        <div className={styles.submitButton}>取消</div>
                    </div>
                </div>  
                <button onClick={onClose} className={styles.closeButton}>關閉</button>
            </div>
        </div>
    );
};

export default ConfirmModal;