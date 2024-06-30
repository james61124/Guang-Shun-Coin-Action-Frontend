import React, { useState } from 'react'
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { backendUrl } = config;

  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Username": email,
      "Password": password
    };
  
    try {
      const response = await axios.post(`${backendUrl}/user/login`, data);
      if (response.data.Status === true) {
        setShowError(false);
        navigate('/product');
      } else {
        setShowError(true);
        setErrorMessage('帳號或密碼錯誤');
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
      <InputField label="帳號" value={email} onChange={setEmail} inputType="text" />
      <InputField label="密碼" value={password} onChange={setPassword} error={errorMessage} showError={showError} inputType="text" />
      <Submit onButtonClick={onButtonClick} />
      <Link className={styles.textWrapper} to="/register">還不是會員? 註冊新帳號</Link>
    </div>
  )
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>會員登入</div>
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

const Submit = ({ onButtonClick }) => {
  return (
    <div className={styles.loginBox}>
      <input className={styles.inputButton} type="submit" onClick={onButtonClick} value={'登入'} />
    </div>
  )
}

export default Login