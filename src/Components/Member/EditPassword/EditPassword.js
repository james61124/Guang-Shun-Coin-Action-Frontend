import React from 'react';
import styles from './EditPassword.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import SubmitSuccess from './SubmitSuccess';


const EditMember = (props) => {
  const [originPassword, setOriginPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

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
      "originPassword": originPassword,
      "newPassword": newPassword,
      "confirmNewPassword": confirmNewPassword
    };

    try {
        const response = await axios.post(`${backendUrl}/user/updatePassword`, data, config);
        
        if (response.data.Status === true) {
          setShowError(false);
          setShowModal(true);
        } else if (response.data.Message === 'originalPassword is empty') {
          setShowError(true);
          setErrorMessage('請輸入舊密碼');
        } else if (response.data.Message === 'newPassword is empty') {
          setShowError(true);
          setErrorMessage('請輸入新密碼');
        } else if (response.data.Message === 'confirmNewPassword is empty') {
          setShowError(true);
          setErrorMessage('請確認新密碼');
        } else if (response.data.Message === 'originalPassword is wrong') {
          setShowError(true);
          setErrorMessage('舊密碼錯誤');
        } else if (response.data.Message === 'newPassword is different from confirmNewPassword') {
          setShowError(true);
          setErrorMessage('密碼與二次密碼不符');
        } else if (response.data.Message === 'invalid newPassword format') {
          setShowError(true);
          setErrorMessage('密碼須包含大小寫英文及數字');
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


  return (
    <div className={styles.mainContainer}>
      <Title />
      <Reminder />
      <div className={styles.contentContainer} >
        <SubmitSuccess show={showModal} onClose={closeModal}></SubmitSuccess>
        <InputField label="舊密碼" value={originPassword} onChange={setOriginPassword} inputType="4w" />
        <InputField label="新密碼" value={newPassword} onChange={setNewPassword} inputType="4w" />
        <InputField label="確認新密碼" value={confirmNewPassword} onChange={setConfirmNewPassword} inputType="4w" error={errorMessage} showError={showError}/>
      </div>
      <SubmitButton onButtonClick={handleSubmit} />
    </div>
  )
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>修改密碼</div>
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