import React, { useState } from 'react'
import styles from './NewProduct.module.css';
import { Link, useNavigate } from 'react-router-dom';
import RenderPictures from './RenderPictures';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';
import config from '../../config/config';


const NewProduct = (props) => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('世界錢幣')
  const [reservePrice, setReservePrice] = useState(0)
  const [bidIncrement, setBidIncrement] = useState(0)
  const [startTime, setStartTime] = useState(dayjs().toISOString())
  const [endTime, setEndTime] = useState(dayjs().toISOString())
  const [description, setDescription] = useState('')
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pictures, setPictures] = useState([]);
  const { backendUrl } = config;
  const navigate = useNavigate();

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleReservePriceChange = (value) => {
    const intValue = parseInt(value, 10);
    setReservePrice(isNaN(intValue) ? 0 : intValue);
  };

  const handleBidIncrementPriceChange = (value) => {
    const intValue = parseInt(value, 10);
    setBidIncrement(isNaN(intValue) ? 0 : intValue);
  };

  function base64ToBlob(base64, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }

  const uploadImage = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const uploadResponse = await axios.post(`${backendUrl}/member/addImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(uploadResponse.data)
      if (uploadResponse.data.Status === true) {
        navigate('/product');
      } else if (uploadResponse.data.Message === "File exceeds 10MB") {
        setShowError(true);
        setErrorMessage('檔案大小超過10M');
      }
    } catch (uploadError) {
      setShowError(true);
      setErrorMessage('資料庫連線錯誤');
    }
  }

  const uploadProductInfo = async () => {
    const data = {
      "name": productName,
      "category": category,
      "price": reservePrice,  
      "minBidPrice": bidIncrement,
      "startDate": startTime,
      "endDate": endTime,
      "productDescription": description 
    };
  
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post(`${backendUrl}/member/addProduct`, data, config);
      if (response.data.Status === true) {
        const productID = response.data.Data.productId;
        const formData = new FormData();
        formData.append('productID', productID);

        pictures.forEach((file, index) => {
          const base64Data = file.split(',')[1]; // get base64 data
          const blob = base64ToBlob(base64Data, 'image/png');
          formData.append('files', blob, `image${index}.png`);
        });

        uploadImage(formData);

      } else if (response.data.Message === "Authorization header is missing") {
        navigate('/login');
      } else if (response.data.Message === "productName is empty") {
        setShowError(true);
        setErrorMessage('請輸入商品名稱');
      } else if (response.data.Message === "endDate earlier than startDate") {
        setShowError(true);
        setErrorMessage('結標時間不能早於起標時間');
      } else {
        setShowError(true);
        setErrorMessage('資料庫連線錯誤');
      }

    } catch (error) {
      console.log('An error occurred during addProduct: ', error);
      setShowError(true);
      setErrorMessage('資料庫連線錯誤');
    }
  }

  const onButtonClick = async (e) => {
    e.preventDefault();
    uploadProductInfo();
  };

  return (
    <div className={styles.mainContainer}>
      <BackLink />
      <Title />
      <div className={styles.rowContainer}>
        <RenderPictures images={pictures} setImages={setPictures} />
        <div className={styles.basicInfoContainer}>
          <InputField label="商品名稱" value={productName} onChange={setProductName} />
          <CategoryField label="商品類型" value={category} onChange={handleCategory} />
          <InputField label="商品底價" value={reservePrice} onChange={handleReservePriceChange} />
          <InputField label="出價增額" value={bidIncrement} onChange={handleBidIncrementPriceChange} />
          <DateField label="起標時間" value={startTime} onChange={setStartTime} />
          <DateField label="截標時間" value={endTime} onChange={setEndTime} />
          <label className={styles.errorLabel} style={{ visibility: showError ? 'visible' : 'hidden' }}>{errorMessage}</label>
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
            inputProps={{ className: styles.input4wCursor }}
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
          <select id="category" value={value} onChange={onChange} className={styles.input4wCursor}>
            <option value="世界錢幣">世界錢幣</option>
            <option value="美國錢幣">美國錢幣</option>
            <option value="歐洲錢幣">歐洲錢幣</option>
            <option value="亞洲錢幣">亞洲錢幣</option>
            <option value="非洲錢幣">非洲錢幣</option>
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