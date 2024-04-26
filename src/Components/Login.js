import React, { useState } from 'react'
import './Login.css';
import Navbar from './Navbar';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {
    // You'll update this function later...
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>會員登入</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <div class="inputWrapper">
          <label className={'inputLabel'}>帳號</label>
          <div className={'inputBox'}>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className={'input'}
            />
          </div>
        </div>
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <div class="inputWrapper">
          <label className={'inputLabel'}>密碼</label>
          <div className={'inputBox'}>
            <input
              value={email}
              onChange={(ev) => setPassword(ev.target.value)}
              className={'input'}
            />
          </div>
        </div>
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <div className={'loginBox'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'登入'} />
        </div>
      </div>
    </div>
  )
}

export default Login