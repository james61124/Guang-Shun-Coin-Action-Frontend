import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { useNavigate } from 'react-router-dom';


const Register = (props) => {
  const [realName, setRealName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fbAccount, setfbAccount] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddr, setShippingAddr] = useState('')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState('')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPasswd, setconfirmPasswd] = useState('')
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { backendUrl } = config;
  const navigate = useNavigate();

  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Username": account, 
      "Nickname": nickName,
      "Password": password,
      "PasswordConfirm": confirmPasswd,
      "Cellphone": phoneNumber,
      "FbAccount": fbAccount,
      "Email": email,
      "Address": shippingAddr,
      "Postcode": postcode,
      "RealName": realName
    };

    try {
      const response = await axios.post(`${backendUrl}/user/register`, data);
      console.log(response.data)
      if (response.data.Status === true) {
        setShowError(false);
        navigate('/login');
      } else if (response.data.Message === 'username is empty') {
        setShowError(true);
        setErrorMessage('請輸入帳號');
      } else if (response.data.Message === 'password is empty') {
        setShowError(true);
        setErrorMessage('請輸入密碼');
      } else if (response.data.Message === 'passwordConfirm is empty') {
        setShowError(true);
        setErrorMessage('請輸入確認密碼');
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
      } else if (response.data.Message === 'password and passwordConfirm is different') {
        setShowError(true);
        setErrorMessage('密碼與二次密碼不符');
      } else if (response.data.Message === 'invalid password format') {
        setShowError(true);
        setErrorMessage('密碼須包含大小寫及數字');
      } else {
        setShowError(true);
        setErrorMessage('訊息錯誤');
      }
    } catch (error) {
      console.log('An error occurred during login: ', error);
      setShowError(true);
      setErrorMessage('資料庫連線錯誤');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Title />
      <Reminder />
      <div className={styles.contentContainer} >
        <InputField label="姓名" value={realName} onChange={setRealName} inputType="text" />
        <InputField label="暱稱" value={nickName} onChange={setNickName} inputType="text" />
        <InputField label="手機" value={phoneNumber} onChange={setPhoneNumber} inputType="text" />
        <InputField label="臉書帳號" value={fbAccount} onChange={setfbAccount} inputType="4w" />
        <InputField label="電子郵件" value={email} onChange={setEmail} inputType="4w" />
        <InputField label="收貨地址" value={shippingAddr} onChange={setShippingAddr} inputType="4w" />
        <InputField label="郵遞區號" value={postcode} onChange={setPostcode} inputType="4w" />
        <InputField label="帳號" value={account} onChange={setAccount} inputType="text" />
        <InputField label="密碼" value={password} onChange={setPassword} inputType="text" placeholder="需含大小寫字母與數字" />
        <InputField label="確認密碼" value={confirmPasswd} onChange={setconfirmPasswd} error={errorMessage} showError={showError} inputType="4w" />
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
      <p>◎ 帳號、手機、臉書帳號不可重複</p>
    </div>
  )
}

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

const SubmitButton = ({ onButtonClick }) => {
  return (
    <div className={styles.loginBox}>
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'註冊'} />
    </div>
  )
}

export default Register;