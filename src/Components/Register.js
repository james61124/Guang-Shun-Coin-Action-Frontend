import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { useNavigate } from 'react-router-dom';
import PopUpMessage from './PopUpMessage/PopUpMessage';



const Register = (props) => {
  const [realName, setRealName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPasswd, setconfirmPasswd] = useState('')
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { backendUrl } = config;
  const navigate = useNavigate();


  const closeModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Nickname": nickName,
      "Password": password,
      "PasswordConfirm": confirmPasswd,
      "Cellphone": phoneNumber,
      "RealName": realName
    };
  
    try {
      const response = await axios.post(`${backendUrl}/user/register`, data);
      if (response.data.Status === true) {
        setShowError(false);
        setShowModal(true);
      } else {
        const errorMessages = {
          'cellphone is empty': "請輸入電話",
          "password is empty": '請輸入密碼',
          "confirmed password is empty": '請輸入密碼驗證',
          'invalid password format': '密碼須包含大小寫英文及數字',
          'invalid phone number format': '手機號碼格式錯誤',
          'password is different from PasswordConfirm': '密碼驗證失敗',
          'cellphone already exists': '電話已經被註冊過'
        };
  
        const message = response.data.Message;
        // console.log('Message:', message);  
        if (errorMessages[message]) {
          setShowError(true);
          setErrorMessage(errorMessages[message]);
        } else {
          setShowError(true);
          setErrorMessage('資訊錯誤');
        }
      }

    } catch (error) {
      console.log('An error occurred during register: ', error);
      setShowError(true);
      setErrorMessage('資料庫連線錯誤');
    }
  };


  return (
    <div className={styles.mainContainer}>
      <Title />
      <Reminder />
      <PopUpMessage show={showModal} message={"註冊成功"} onClose ={closeModal}></PopUpMessage>
      <div className={styles.contentContainer} >
        <InputField label="姓名" value={realName} onChange={setRealName} inputType="text" />
        <InputField label="暱稱" value={nickName} onChange={setNickName} inputType="text" />
        <InputField label="手機" value={phoneNumber} onChange={setPhoneNumber} inputType="text" necessary={true}/>
        <InputField label="密碼" value={password} onChange={setPassword} inputType="text" placeholder="需含大小寫字母與數字" necessary={true}/>
        <InputField label="確認密碼" value={confirmPasswd} onChange={setconfirmPasswd} error={errorMessage} showError={showError} inputType="4w" necessary={true}/>
      </div>
      <SubmitButton onButtonClick={onButtonClick} />
    </div>
  )
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>註冊帳號</div>
    </div>
  )
}

const Reminder = () => {
  return (
    <div className={styles.reminderContainer}>
      <p>◎ 帳號、手機不可重複</p>
    </div>
  )
}

const InputField = ({ label, value, onChange, inputType, placeholder = '', error = '', showError = false, necessary = false }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel}>
          {label}
          <label className={styles.inputNecessary} style={{ visibility: necessary ? 'visible' : 'hidden'}}>*</label>
        </label>
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
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'註冊'} />
    </div>
  )
}

export default Register;