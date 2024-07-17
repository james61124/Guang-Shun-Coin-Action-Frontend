import styles from './SubmitSuccess.module.css';
import React from 'react'

const SubmitSuccess = ({ show, onClose }) => {

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitle}> 修改成功 </div>
                {/* <InputField label="出價金額" value={bidPrice} onChange={handleBidPriceChange} inputType="text" error={errorMessage} showError={showError}/> */}
                <div className={styles.submitBox}>
                    <input className={styles.submitButton} type="submit" onClick={onClose} value={'確認'} />
                </div>
                {/* <button onClick={onClose} className={styles.closeButton}>Close</button> */}
            </div>
        </div>
    );
};

export default SubmitSuccess;