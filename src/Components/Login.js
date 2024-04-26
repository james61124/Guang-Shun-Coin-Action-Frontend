import React, { useState } from 'react'
import './Login.css';
import Navbar from './Navbar';
import Register from './Register';
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
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className={'input'}
            />
          </div>
        </div>
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
        <div className={'loginBox'}>
          <input className='inputButton' type="button" onClick={onButtonClick} value={'登入'} />
        </div>
      <br />
       <Link to="/register">還不是會員? 註冊新帳號</Link>
     </div>
  )
}

export default Login