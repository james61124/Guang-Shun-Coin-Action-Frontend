import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fbAccount, setfbAccount] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddr, setShippingAddr] = useState('')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPasswd, setconfirmPasswd] = useState('')

  const onButtonClick = () => {
    // You'll update this function later...
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>註冊帳號</div>
      </div>
      <div className={styles.textContainer}>
        <p>◎ 帳號、手機、臉書帳號不可重複</p>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>姓名</label>
          <div className={styles.inputBox}>
            <input
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>手機</label>
          <div className={styles.inputBox}>
            <input
              value={phoneNumber}
              onChange={(ev) => setPhoneNumber(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>臉書帳號</label>
          <div className={styles.inputBox}>
            <input
              value={fbAccount}
              onChange={(ev) => setfbAccount(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>電子郵件</label>
          <div className={styles.inputBox}>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>收貨地址</label>
          <div className={styles.inputBox}>
            <input
              value={shippingAddr}
              onChange={(ev) => setShippingAddr(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>郵遞區號</label>
          <div className={styles.inputBox}>
            <input
              value={postcode}
              onChange={(ev) => setPostcode(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>帳號</label>
          <div className={styles.inputBox}>
            <input
              value={account}
              onChange={(ev) => setAccount(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
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
      </div>
      <br />
      <div className={styles.inputContainer}>
        <div class={styles.inputWrapper}>
          <label className={styles.inputLabel}>確認密碼</label>
          <div className={styles.inputBox}>
            <input
              value={confirmPasswd}
              onChange={(ev) => setconfirmPasswd(ev.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.loginBox}>
        <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'註冊'} />
      </div>
      <br />
    </div>
  )
}

export default Register;
