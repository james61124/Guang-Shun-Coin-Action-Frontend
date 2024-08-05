import styles from './SuccessModal.module.css';
import React from 'react'

const SuccessModal = ({ show, onClose, text }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.confirmationContent}>{text}</div>
              <button onClick={onClose} className={styles.closeButton}>關閉</button>
            </div>
        </div>
    );
};

export default SuccessModal;