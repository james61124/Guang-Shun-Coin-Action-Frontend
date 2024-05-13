import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import axios from 'axios';


const Register = (props) => {
  const [realName, setRealName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fbAccount, setfbAccount] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddr, setShippingAddr] = useState('')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPasswd, setconfirmPasswd] = useState('')

  const onButtonClick = async (e) => {
    e.preventDefault();
    const data = {
      "Username": account, 
      "Password": password,
      "Cellphone": phoneNumber,
      "FbAccount": fbAccount,
      "Email": email,
      "Address": shippingAddr,
      "Postcode": postcode,
      "RealName": realName
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:81/user/register', data);
      if (response.status === 200) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
        console.error('An error occured during registration: ', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Title />
      <Reminder />
      <div className={styles.contentContainer} >
        <InputField label="姓名" value={realName} onChange={setRealName} inputType="text" />
        <InputField label="手機" value={phoneNumber} onChange={setPhoneNumber} inputType="text" />
        <InputField label="臉書帳號" value={fbAccount} onChange={setfbAccount} inputType="4w" />
        <InputField label="電子郵件" value={email} onChange={setEmail} inputType="4w" />
        <InputField label="收貨地址" value={shippingAddr} onChange={setShippingAddr} inputType="4w" />
        <InputField label="郵遞區號" value={postcode} onChange={setPostcode} inputType="4w" />
        <InputField label="帳號" value={account} onChange={setAccount} inputType="text" />
        <InputField label="密碼" value={password} onChange={setPassword} inputType="text" placeholder="需含大小寫字母與數字" />
        <InputField label="確認密碼" value={confirmPasswd} onChange={setconfirmPasswd} inputType="4w" />
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

const InputField = ({ label, value, onChange, inputType, placeholder = '' }) => {
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