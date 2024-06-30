import React, { useState } from 'react'
import styles from './NewProduct.module.css';
import { Link } from 'react-router-dom';


const NewProduct = (props) => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [reservePrice, setReservePrice] = useState('')
  const [bidIncrement, setBidIncrement] = useState()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')



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
          <InputField label="商品類別" value={category} onChange={setCategory} />
          <InputField label="商品底價" value={reservePrice} onChange={setReservePrice} />
          <InputField label="出價增額" value={bidIncrement} onChange={setBidIncrement} />
          <InputField label="起標時間" value={startTime} onChange={setStartTime} />
          <InputField label="截標時間" value={endTime} onChange={setEndTime} />
        </div>
      </div>
      <DescriptionSection label="商品細節" value={description} setDescription={setDescription}/>
      <SubmitButton onButtonClick={onButtonClick} />
    </div>
  )
}

const BackLink = () => (
  <div className={styles.TextContainer}>
    <Link to="/product">回上頁</Link>
  </div>
);


const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div>新增商品</div>
    </div>
  )
}

const RenderPictures = () => (
  <div className={styles.picContainter}>
    <div className={styles.primaryPic}></div>
    <div className={styles.secondaryPics}>
      <div className={styles.secondaryPic}></div>
      <div className={styles.secondaryPic}></div>
      <div className={styles.secondaryPic}></div>
      <div className={styles.secondaryPic}></div>
    </div>
  </div>
);



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