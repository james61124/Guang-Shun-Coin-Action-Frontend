import React from 'react';
import styles from './EditMember.module.css';
import { useState } from 'react';


const EditMember = (props) => {
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
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'儲存資訊'} />
    </div>
  )
}

export default EditMember;