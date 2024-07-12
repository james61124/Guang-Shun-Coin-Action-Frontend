import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductPage.module.css';
import config from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Bid from './Bid';

const ProductPage = () => {
  const { productID } = useParams();
  const { backendUrl } = config;
  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ minBid, setMinBid ] = useState('');
  const [ startAt, setStartAt ] = useState('');
  const [ endAt, setEndAt ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ imageUrl, setImageUrl ] = useState([])
  const [ history, setHistory ] = useState([])

  const productInfo = {
    productName: "商品名稱商品名稱商品名稱2",
    time: "1天10時59分59秒",
    category: "世界錢幣",
    currentPrice: 15000,
    minBid: 1000,
    offset: 500,
    startAt: "2024-04-10 23:59:00",
    EndAt: "2024-04-10 23:59:00",
    description: "商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹"
  };

  const fetchProduct = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const data = {
      "ProductID": productID
    };
  
    try {
      const response = await axios.post(`${backendUrl}/shop/detail`, data, config);
      if (response.data.Status === true) {
        console.log(response)
        const updatedImageUrls = response.data.Data.imageUrl.map(url => backendUrl + url);
        setName(response.data.Data.name)
        setCategory(response.data.Data.category)
        setPrice(response.data.Data.price)
        setMinBid(response.data.Data.minBidPrice)
        setStartAt(response.data.Data.startTime)
        setEndAt(response.data.Data.endTime)
        setDescription(response.data.Data.description)
        setImageUrl(updatedImageUrls);
        setHistory(response.data.Data.history)
      } else {
        // setShowError(true);
        // setErrorMessage('帳號或密碼錯誤');
      }
    } catch (error) {
      // console.log('An error occurred during login: ', error);
      // setShowError(true);
      // setErrorMessage('資料庫連線錯誤');
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [productID]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <BackLink />
        <div className={styles.productInfoContainer}>
          <RenderPictures pictures={imageUrl}/>
          <div className={styles.detailContainer}>
            <ProductTitle productName={name} />
            <RenderTags productInfo={productInfo} category={category} />
            <RenderPriceDetails productID={productID} productInfo={productInfo} price={price} minBid={minBid} startAt={startAt} endAt={endAt} />
          </div>
        </div>
        <HistorySection history={history}/>
        <DescriptionSection productDescription={description} />
        <RenderPrecautions />
      </div>
    </div>
  );
};

const BackLink = () => (
  <div className={styles.TextContainer}>
    <Link to="/product">回上頁</Link>
  </div>
);

const ProductTitle = ({ productName }) => (
  <div className={styles.productTitle}>
    <p>{productName}</p>
  </div>
);

const RenderTags = ({ productInfo, category }) => (
  <div className={styles.tagContainer}>
    <div className={styles.tagBox}>
      <p className={styles.tag}>{productInfo.time}</p>
    </div>
    <div className={styles.tagBox}>
      <p className={styles.tag}>{category}</p>
    </div>
  </div>
);

const RenderPriceDetails = ({ productID, productInfo, price, minBid, startAt, endAt }) => {

  const [showModal, setShowModal] = useState(false);

  const onButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.priceContainer}>
      <p className={styles.currentPrice}>目前出價: NTD {productInfo.currentPrice}</p>
      <p>底價: NTD {price}</p>
      <p>出價增額: NTD {minBid}</p>
      <p>起價時間: {startAt}</p>
      <p>截標時間: {endAt}</p>
      <div className={styles.bidBox}>
        <button className={styles.bidButton} onClick={onButtonClick}>我要出價</button>
        <Bid show={showModal} productID={productID} onClose={closeModal}></Bid>
      </div>
    </div>
  );
};

const renderPrimaryPicture = (pictures) => (
  <label htmlFor="fileUpload" className={styles.primaryPic}>
    {pictures[0] ? 
      (<img src={pictures[0]} alt="Primary" className={styles.primaryPic}/>) : 
       (<div className={styles.primaryPic}></div>)}
  </label>
);

const renderSecondaryPictures = (pictures) => (
  <div className={styles.secondaryPics}>
    {[1, 2, 3, 4].map((index) => (
      <div key={index} className={styles.secondaryPic}>
        {pictures[index] && (
          <img src={pictures[index]} alt={`Secondary ${index}`} className={styles.uploadedImage} />
        )}
      </div>
    ))}
  </div>
);

const RenderPictures = ({ pictures }) => (
  <div className={styles.picContainter}>
    {renderPrimaryPicture(pictures)}
    {renderSecondaryPictures(pictures)}
  </div>
);

const HistorySection = ({ history }) => (
  <div>
    <div className={styles.subTitleContainer}>
      <div className={styles.subTitle}>歷史喊價紀錄</div>
    </div>
    <div className={styles.historyContainer}>
      <div className={styles.historyInfo}>
        <div className={styles.historyUsername}>帳號</div>
        <div className={styles.historyBidPrice}>出價金額</div>
        <div className={styles.historyBidTime}>出價時間</div>
      </div>
      {history.map((record, index) => (
        <div key={index} className={styles.historyInfo}>
          <div className={styles.historyUsername}>{record.username}</div>
          <div className={styles.historyBidPrice}>NTD {record.bidPrice}</div>
          <div className={styles.historyBidTime}>{new Date(record.bidTime).toLocaleString()}</div>
        </div>
      ))}
    </div>
  </div>
);

const DescriptionSection = ({ productDescription }) => (
  <div>
    <div className={styles.subTitleContainer}>
      <div className={styles.subTitle}>商品詳細資訊</div>
    </div>
    <div className={styles.descriptionContainer}>
      <p>{productDescription}</p>
    </div>
  </div>
);

const RenderPrecautions = () => (
  <div className={styles.precautions}>
    <p>注意事項</p>
    <ul>
      <li>起標價一定要超過底價</li>
      <li>出價要超過前一個人的出價</li>
    </ul>
  </div>
);

export default ProductPage;