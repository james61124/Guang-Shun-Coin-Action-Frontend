import React, { useState } from 'react'
import styles from './Login.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // const onButtonClick = () => {
  //   // You'll update this function later...
  // }

  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = { 
      "username": email, 
      "password": password 
    };

    try {
      const response = await axios.post('http://127.0.0.1:81/user/login', data);
      if (response.status === 200) {
        console.log('登入成功！');
      } else {
        console.error('登入失敗！');
      }
    } catch (error) {
      console.error('發生錯誤：', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>會員登入</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>帳號</label>
          <div className={styles.inputBox}>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>密碼</label>
          <div className={styles.inputBox}>
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <label className={styles.errorLabel}>{passwordError}</label>
      </div>
      <br />
        <div className={styles.loginBox}>
          <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'登入'} />
        </div>
      <br />
       <Link className={styles.textWrapper} to="/register">還不是會員? 註冊新帳號</Link>
     </div>
  )
}

export default Login