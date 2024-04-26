import './Register.css';
import { useState } from 'react';



const Register = (props) => {
  const [UserName, setUserName] = useState('')

  const onButtonClick = () => {
    // You'll update this function later...
  }

  console.log('hello')
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>註冊帳號</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <div class="inputWrapper">
          <label className={'inputLabel'}></label>
          <input
            value={UserName}
            onChange={(ev) => setUserName(ev.target.value)}
            className={'inputBox'}
          />
        </div>

      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <br />
    </div>
  )
}

export default Register
