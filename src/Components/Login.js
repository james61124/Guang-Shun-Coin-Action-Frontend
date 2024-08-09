import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import config from '../config/config';
import PopUpMessage from './PopUpMessage/PopUpMessage';



const Login = (props) => {

  const { backendUrl } = config;
  const navigate = useNavigate();
  const [cellphone, setcellphone] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);


  const closeModal = () => {
    setShowModal(false);
    navigate('/product');
  };


  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Cellphone": cellphone,
      "Password": password
    };
  

    try {
      const response = await axios.post(`${backendUrl}/user/login`, data);
      if (response.data.Status === true) {
        setShowError(false);
        localStorage.setItem('token', response.data.Data.Token);
        setShowModal(true);
      } else {
        const errorMessages = {
          'cellphone is empty': "請輸入電話",
          "password is empty": '請輸入密碼',
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
      console.log('An error occurred during login: ', error);
      setShowError(true);
      setErrorMessage('資料庫連線錯誤');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Title />
      <PopUpMessage show={showModal} message={"登入成功"} onClose ={closeModal}></PopUpMessage>
      <InputField label="電話" value={cellphone} onChange={setcellphone} inputType="text" />
      <InputField label="密碼" value={password} onChange={setPassword} error={errorMessage} showError={showError} inputType="text" />
      <ForgetPasswd />
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

const ForgetPasswd = () => {
  return (
    <div className={styles.forgetPasswdContainer}>
      <Link to="/forgetPasswd">忘記密碼</Link>
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