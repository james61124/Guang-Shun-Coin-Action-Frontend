import React from 'react';
import styles from './EditMember.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';


const EditMember = (props) => {
  const { backendUrl } = config;
  const [realName, setRealName] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [account, setAccount] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const data = {
      "realName": realName,
      "nickName": nickName,
      "cellphone": phoneNumber,
    };

    try {
        const response = await axios.post(`${backendUrl}/user/updateUserInfo`, data, config);  
        if (response.data.Status === true) {
          setShowError(false);
          setShowModal(true);
        } else {
          const errorMessages = {
            'cellphone is empty': "請輸入電話",
            'the new cellphone already exists': '電話已經被註冊過'
          };
    
          const message = response.data.Message;
          if (errorMessages[message]) {
            setShowError(true);
            setErrorMessage(errorMessages[message]);
          } else {
            setShowError(true);
            setErrorMessage('資訊錯誤');
          }
        }
  
      } catch (error) {
        console.log('An error occurred during updating user info: ', error);
        setShowError(true);
        setErrorMessage('資料庫連線錯誤');
      }
    };

  
  const getUserInfo = async (e) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const data = {};

    try {
        const response = await axios.post(`${backendUrl}/user/getUserInfo`, data, config);
        if (response && response.data && response.data.Data) {
          setRealName(response.data.Data.realName);
          setNickName(response.data.Data.nickName);
          setPhoneNumber(response.data.Data.cellphone);
        }
    } catch (error) {
        // console.error('Failed to fetch products:', error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []); 


  return (
    <div className={styles.mainContainer}>
      <img src={`/assets/background.png`} alt="Background" className={styles.backgroundImage} />
      <div className={styles.body}>
        <Title />
        <Reminder />
        <div className={styles.contentContainer} >
          <PopUpMessage show={showModal} onClose={closeModal}></PopUpMessage>
          <InputField label="姓名" value={realName} onChange={setRealName} inputType="text" />
          <InputField label="暱稱" value={nickName} onChange={setNickName} inputType="text" />
          <InputField label="手機" value={phoneNumber} onChange={setPhoneNumber} inputType="text" />
          {/* <InputField label="臉書帳號" value={fbAccount} onChange={setfbAccount} inputType="4w" /> */}
          {/* <InputField label="電子郵件" value={email} onChange={setEmail} inputType="4w" /> */}
          {/* <InputField label="收貨地址" value={shippingAddr} onChange={setShippingAddr} inputType="4w" /> */}
          {/* <InputField label="郵遞區號" value={postcode} onChange={setPostcode} inputType="4w" /> */}
          {/* <InputField label="帳號" value={account} onChange={setAccount} inputType="text" error={errorMessage} showError={showError}/> */}
        </div>
        <SubmitButton onButtonClick={handleSubmit} />
      </div>
      
    </div>
  )
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>編輯資訊</div>
    </div>
  )
}

const Reminder = () => {
  return (
    <div className={styles.reminderContainer}>
      <p>◎ 帳號、手機、臉書帳號不可重複</p>
    </div>
  )
}

const InputField = ({ label, value, onChange, inputType, placeholder = '', error = '', showError = true }) => {
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

const SubmitButton = ({ onButtonClick }) => {
  return (
    <div className={styles.loginBox} onClick={onButtonClick}>
      <input className={styles.inputButton} type="button" value={'儲存資訊'} />
    </div>
  )
}

export default EditMember;