import styles from './ProductCard.module.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({cards}) => {
  return (
      <div className={styles.productContainer}>
        {cards.map((productCard, i) => (
          <Card
            key={i}
            product={productCard.product}
            imgUrl={productCard.imgUrl}
            productID={productCard.productID}
          />
        ))}
      </div>

  );
}

const Card = ({key, product, imgUrl, productID}) => {
  const { backendUrl } = config;
  const [trackingImage, setTrackingImage] = useState(`/assets/untrack.png`);
  const [restTimeImage, setrestTimeImage] = useState(`/assets/restTimeIcon.png`);
  const navigate = useNavigate();

  const sendStarInfo = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    var data;

    if (trackingImage === `/assets/untrack.png`) {
      data = {
        "productID": productID,
        "isStar": true
      };
    } else {
      data = {
        "productID": productID,
        "isStar": false
      };
    }

    try {
      console.log(data)
      const response = await axios.post(`${backendUrl}/shop/star`, data, config);
    } catch (error) {
      console.error('Failed to give star info:', error);
    }
  };

  const handleClick = () => {
    sendStarInfo();
    setTrackingImage(trackingImage === `/assets/untrack.png` ? `/assets/track.png` : `/assets/untrack.png`);
  };

  const handleProduct = (id) => {
    navigate(`/detail/${id}`);
  };
  
  return (
    <div key={key} className={styles.productCard}>
      <div className={styles.productInfo} >
        <div className={styles.productPic} onClick={() => handleProduct(productID)}>
          <img src={imgUrl} alt={product} className={styles.image}></img>
        </div>
        <div className={styles.productTime}>
          <img className={styles.productTimeIcon} src={restTimeImage} alt="" />

        </div>
        <div>
          <button onClick={handleClick} className={styles.productTracking}>
            <img src={trackingImage} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.productTitleWrapper}>
        <div className={styles.productTitle}>{product}</div>
      </div>
      <div className={styles.currentPriceWrapper}>
        <div className={styles.currentPrice}>目前價格：NT$14,000,000</div>
      </div>
      <div className={styles.currentPriceWrapper}>
        <div className={styles.currentPrice}>出價次數：</div>
      </div>
      
    </div>
  )
}

export default ProductCard