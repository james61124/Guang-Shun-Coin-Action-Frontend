import React, { useState } from 'react'
import styles from './Login.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')



  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Username": email,
      "Password": password
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:81/user/login', data);
      if (response.status === 200) {
        console.log('Login successful!');
      } else {
        console.error('Login failed!');
      }
    } catch (error) {
      console.error('An error occurred during login: ', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Title />
      <Username email={email} setEmail={setEmail} emailError={emailError} />
      <Password password={password} setPassword={setPassword} passwordError={passwordError} />
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

const Username = ({ email, setEmail, emailError }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel}>帳號</label>
        <div className={styles.inputBox}>
          <input value={email} onChange={(ev) => setEmail(ev.target.value)} className={styles.input} />
        </div>
      </div>
      <label className={styles.errorLabel}>{emailError}</label>
    </div>
  )
}

const Password = ({ password, setPassword, passwordError }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel}>密碼</label>
        <div className={styles.inputBox}>
          <input value={password} onChange={(ev) => setPassword(ev.target.value)} className={styles.input} />
        </div>
      </div>
      <label className={styles.errorLabel}>{passwordError}</label>
    </div>
  )
}

const Submit = ({ onButtonClick }) => {
  return (
    <div className={styles.loginBox}>
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'登入'} />
    </div>
  )
}

export default Login