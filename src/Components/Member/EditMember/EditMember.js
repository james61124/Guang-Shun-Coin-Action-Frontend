import React from 'react';
import styles from './EditMember.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import SubmitSuccess from './SubmitSuccess';


const EditMember = (props) => {
  const [realName, setRealName] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fbAccount, setfbAccount] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddr, setShippingAddr] = useState('')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState('')
  const { backendUrl } = config;
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
      "fbAccount": fbAccount,
      "email": email,
      "shippingAddr": shippingAddr,
      "postcode": postcode,
      "username": account,
    };

    try {
        const response = await axios.post(`${backendUrl}/user/updateUserInfo`, data, config);  
        if (response.data.Status === true) {
          setShowError(false);
          setShowModal(true);
        } else if (response.data.Message === 'username is empty') {
          setShowError(true);
          setErrorMessage('請輸入帳號');
        } else if (response.data.Message === 'address is empty') {
          setShowError(true);
          setErrorMessage('請輸入地址');
        } else if (response.data.Message === 'cellphone is empty') {
          setShowError(true);
          setErrorMessage('請輸入手機號碼');
        } else if (response.data.Message === 'username already exists') {
          setShowError(true);
          setErrorMessage('帳號名稱已存在');
        } else if (response.data.Message === 'invalid email address') {
          setShowError(true);
          setErrorMessage('信箱格式錯誤');
        } else if (response.data.Message === 'invalid phone number format') {
          setShowError(true);
          setErrorMessage('手機號碼格式錯誤');
        } else if (response.data.Message === 'cellphone already exists') {
          setShowError(true);
          setErrorMessage('該手機號碼已註冊過');
        } else {
          setShowError(true);
          setErrorMessage('訊息錯誤');
        }
    } catch (error) {
      console.log('An error occurred during updating info: ', error);
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
          setfbAccount(response.data.Data.fbAccount);
          setEmail(response.data.Data.email);
          setShippingAddr(response.data.Data.shippingAddr);
          setPostcode(response.data.Data.postcode);
          setAccount(response.data.Data.username);
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
      <Title />
      <Reminder />
      <div className={styles.contentContainer} >
        <SubmitSuccess show={showModal} onClose={closeModal}></SubmitSuccess>
        <InputField label="姓名" value={realName} onChange={setRealName} inputType="text" />
        <InputField label="暱稱" value={nickName} onChange={setNickName} inputType="text" />
        <InputField label="手機" value={phoneNumber} onChange={setPhoneNumber} inputType="text" />
        <InputField label="臉書帳號" value={fbAccount} onChange={setfbAccount} inputType="4w" />
        <InputField label="電子郵件" value={email} onChange={setEmail} inputType="4w" />
        <InputField label="收貨地址" value={shippingAddr} onChange={setShippingAddr} inputType="4w" />
        <InputField label="郵遞區號" value={postcode} onChange={setPostcode} inputType="4w" />
        <InputField label="帳號" value={account} onChange={setAccount} inputType="text" error={errorMessage} showError={showError}/>
      </div>
      <SubmitButton onButtonClick={handleSubmit} />
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
    <div className={styles.loginBox}>
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'儲存資訊'} />
    </div>
  )
}

export default EditMember;