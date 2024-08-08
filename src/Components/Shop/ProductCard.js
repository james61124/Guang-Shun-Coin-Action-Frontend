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
            price={productCard.price}
            bidCount={productCard.bidCount}
            endedAt={productCard.endedAt}
            isStar={productCard.isStar}
          />
        ))}
      </div>

  );
}

const Card = ({ key, product, imgUrl, productID, price, bidCount, endedAt, isStar }) => {
  const { backendUrl } = config;
  const [trackingImage, setTrackingImage] = useState(`/assets/untrack.png`);
  const [restTimeImage, setRestTimeImage] = useState(`/assets/restTimeIcon.png`);
  const [timeRemaining, setTimeRemaining] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(isStar === true) {
      setTrackingImage(`/assets/track.png`);
    } else {
      setTrackingImage(`/assets/untrack.png`);
    }

    const calculateTimeRemaining = () => {
      const endTime = new Date(endedAt).getTime();
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeRemaining("已結束");
        return;
      }

      // Calculate time components
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}日${hours}時${minutes}分${seconds}秒`);
    };

    calculateTimeRemaining(); // Calculate initially
    const intervalId = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [endedAt]);

  const sendStarInfo = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const data = {
      productID: productID,
      isStar: trackingImage === `/assets/untrack.png`
    };

    try {
      await axios.post(`${backendUrl}/shop/star`, data, config);
    } catch (error) {
      // do something
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
    <div key={key} className={styles.productCard} onClick={() => handleProduct(productID)}>
      <div className={styles.productInfo}>
        <div className={styles.productPic}>
          <img src={imgUrl} alt={product} className={styles.image} />
        </div>
        <div className={styles.productTime}>
          <img className={styles.productTimeIcon} src={restTimeImage} alt="" />
          <div className={styles.productRemainTime}>{timeRemaining}</div>
        </div>
        <div>
          <button
              onClick={(e) => {
                  e.stopPropagation(); // Prevent handleProduct from being triggered
                  handleClick(); // Call handleClick
              }}
              className={styles.productTracking}
          >
              <img src={trackingImage} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.productTitleWrapper}>
        <div className={styles.productTitle}>{product}</div>
      </div>
      <div className={styles.currentPriceWrapper}>
        <div className={styles.currentPrice}>目前價格：NT${price}</div>
      </div>
      <div className={styles.currentPriceWrapper}>
        <div className={styles.currentPrice}>出價次數：{bidCount}</div>
      </div>
    </div>
  );
};


export default ProductCard