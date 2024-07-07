import React, { useState } from 'react'
import styles from './NewProduct.module.css';
import { Link } from 'react-router-dom';
import RenderPictures from './RenderPictures';

import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const NewProduct = (props) => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const [reservePrice, setReservePrice] = useState('')
  const [bidIncrement, setBidIncrement] = useState()
  // const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')

  const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));



  const onButtonClick = async (e) => {
  };

  return (
    <div className={styles.mainContainer}>
      <BackLink />
      <Title />
      <div className={styles.rowContainer}>
        <RenderPictures />
        <div className={styles.basicInfoContainer}>
          <InputField label="商品名稱" value={productName} onChange={setProductName} />
          <InputField label="商品底價" value={reservePrice} onChange={setReservePrice} />
          <InputField label="出價增額" value={bidIncrement} onChange={setBidIncrement} />
          <CategoryField label="商品類型" value={category} onChange={handleCategory} />
          <DateField label="起標時間" value={startTime} onChange={setStartTime} />
          <DateField label="截標時間" value={endTime} onChange={setEndTime} />
        </div>
      </div>
      <DescriptionSection label="商品細節" value={description} setDescription={setDescription}/>
      <SubmitButton onButtonClick={onButtonClick} />
    </div>
  )
}

const BackLink = () => (
  <div className={styles.TextContainer}>
    <Link to="/member">回上頁</Link>
  </div>
);


const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>新增商品</div>
    </div>
  )
}

const DateField = ({ label, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputLabel}>{label}</div>
        <div className={styles.inputBox}>
            <DateTime
            value={moment(value)}
            onChange={(date) => onChange(date.toISOString())}
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm:ss"
            inputProps={{ className: styles.input4w }}
          />
        </div>
      </div>
    </div>
  );
};

const CategoryField = ({ label, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputLabel}>{label}</div>
        <div className={styles.inputBox}>
          <select id="category" value={value} onChange={onChange} className={styles.input4w}>
            <option value="World">世界錢幣</option>
            <option value="America">美國錢幣</option>
            <option value="Europe">歐洲錢幣</option>
            <option value="Asia">亞洲錢幣</option>
            <option value="Africa">非洲錢幣</option>
          </select>
        </div>
      </div>
    </div>
  );
};


const InputField = ({ label, value, onChange, inputType, placeholder = '' }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel}>{label}</label>
        <div className={styles.inputBox}>
          <input
            value={value}
            onChange={(ev) => onChange(ev.target.value)}
            className={inputType=styles.input4w}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}

const DescriptionSection = ({ description, setDescription }) => (
  <div>
    <div className={styles.subTitleContainer}>
      <div className={styles.subTitle}>商品詳細資訊</div>
    </div>
    <div className={styles.descriptionContainer}>
      <textarea
        className={styles.descriptionInput}
        placeholder="填寫商品資訊..."
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        rows={5}
      />

    </div>
  </div>
);

const SubmitButton = ({ onButtonClick }) => {
  return (
    <div className={styles.loginBox}>
      <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'儲存資訊'} />
    </div>

  )
}


export default NewProduct