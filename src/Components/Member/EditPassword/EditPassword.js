import React from 'react';
import styles from './EditPassword.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import { useNavigate } from 'react-router-dom';


const EditMember = () => {
  const [originPassword, setOriginPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const { backendUrl } = config;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    setShowModal(false);
    navigate('/login');
    
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
        } else {
          const errorMessages = {
            "original password is empty": '請輸入原有密碼',
            "new password is empty": '請輸入新密碼',
            "confirmed password is empty": '請輸入密碼驗證',
            'invalid password format': '密碼須包含大小寫英文及數字',
            'password is different from PasswordConfirm': '密碼與二次密碼不符',
            'originalPassword is wrong': '原密碼輸入錯誤'

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
        setShowError(true);
        setErrorMessage('資料庫連線錯誤');
      }
    };
        


  return (
    <div className={styles.mainContainer}>
      <img src={`/assets/background.png`} alt="Background" className={styles.backgroundImage} />
      <div className={styles.body}>
        <Title />
        <Reminder />
        <div className={styles.contentContainer} >
          <PopUpMessage show={showModal} onClose={closeModal}></PopUpMessage>
          <InputField label="舊密碼" value={originPassword} onChange={setOriginPassword} inputType="3w" />
          <InputField label="新密碼" value={newPassword} onChange={setNewPassword} inputType="3w" />
          <InputField label="確認新密碼" value={confirmNewPassword} onChange={setConfirmNewPassword} inputType="5w" error={errorMessage} showError={showError}/>
        </div>
        <SubmitButton onButtonClick={handleSubmit} />
      </div>
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
      <p>◎ 密碼須包含大小寫英文及數字</p>
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
            className={inputType === '3w' ? styles.input3w : styles.input5w}
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
    <div className={styles.loginBox} onClick={onButtonClick}>
      <input className={styles.inputButton} type="button" value={'儲存資訊'} />
    </div>
  )
}

export default EditMember;