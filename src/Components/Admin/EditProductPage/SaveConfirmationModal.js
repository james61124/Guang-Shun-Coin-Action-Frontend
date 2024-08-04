import styles from './SaveConfirmationModal.module.css';
import React, { useState } from 'react'
import config from '../../../config/config';
import axios from 'axios';

const Bid = ({ show, onClose, productID }) => {

    const [ bidPrice, setBidPrice ] = useState(0)
    const { backendUrl } = config;
    const [ errorMessage, setErrorMessage ] = useState('');
    const [showError, setShowError] = useState(false);

    const handleBidPriceChange = (value) => {
        const intValue = parseInt(value, 10);
        setBidPrice(isNaN(intValue) ? 0 : intValue);
    };

    const bid = async () => {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const data = {
          "ProductID": productID,
          "BidPrice": bidPrice
        };
      
        try {
          const response = await axios.post(`${backendUrl}/shop/bid`, data, config);
          if (response.data.Status === true) {
            // console.log(response)
          } else if (response.data.Message === 'bidPrice is smaller or equal than highest bidPrice') {
            setShowError(true);
            setErrorMessage('出價金額須高於目前最高金額');
          } else {
            setShowError(true);
            setErrorMessage('資料庫連線錯誤');
          }
        } catch (error) {
          setShowError(true);
          setErrorMessage('資料庫連線錯誤');
        }
      }

    const onButtonClick = async (e) => {
        bid();
    }

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.confirmationContent}>確認修改！</div>
              <button onClick={onClose} className={styles.closeButton}>關閉</button>
            </div>
        </div>
    );
};

const InputField = ({ label, value, onChange, inputType, placeholder = '', error = '', showError = false }) => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                <label className={styles.inputLabel}>{label}</label>
                <div className={styles.inputBox}>
                <input
                    value={value}
                    onChange={(ev) => onChange(ev.target.value)}
                    className={inputType === '4w' ? styles.input4w : styles.input}
                    placeholder={placeholder}
                />
                </div>
            </div>
            <label className={styles.errorLabel} style={{ visibility: showError ? 'visible' : 'hidden' }}>{error}</label>
        </div>
    )
}

export default Bid;