import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductPage.module.css';
import config from '../../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Bid from './Bid';
import Pagination from './Pagination';
import SuccessModal from './SuccessModal'


const pageRangeDisplayed = 5;

const ProductPage = () => {
  const { productID } = useParams();
  const { backendUrl } = config;
  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ currentPrice, setCurrentPrice ] =useState(0);
  const [ price, setPrice ] = useState('');
  const [ minBid, setMinBid ] = useState('');
  const [ startAt, setStartAt ] = useState('');
  const [ endAt, setEndAt ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ imageUrl, setImageUrl ] = useState([]);
  const [ history, setHistory ] = useState([]);
  const [ timeRemaining, setTimeRemaining ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalNumberOfPage, setTotalNumberOfPage ] = useState(1);
  const [ trackImage, setTrackImage ] = useState(`/assets/track.png`);
  const [ trackMessage, setTrackMessage ] = useState('加入最愛');

  useEffect(() => {

    const calculateTimeRemaining = () => {
      const endTime = new Date(endAt).getTime();
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
  }, [endAt]);

  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  const fetchProduct = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const data = {
      "ProductID": productID,
      "HistoryPage": currentPage
    };
  
    try {
      const response = await axios.post(`${backendUrl}/shop/detail`, data, config);
      if (response.data.Status === true) {
        const updatedImageUrls = response.data.Data.imageUrl.map(url => backendUrl + url);
        setName(response.data.Data.name);
        setCategory(response.data.Data.category);
        setPrice(response.data.Data.price);
        setMinBid(response.data.Data.minBidPrice);
        setStartAt(response.data.Data.startTime);
        setEndAt(response.data.Data.endTime);
        setDescription(response.data.Data.description);
        setImageUrl(updatedImageUrls);
        setHistory(response.data.Data.history);
        setCurrentPrice(response.data.Data.currentPrice);
        setTotalNumberOfPage(response.data.Data.totalPageOfHistory);
        if (response.data.Data.isStar === true) {
          setTrackImage(`/assets/track.png`);
          setTrackMessage('取消追蹤');
        } else {
          setTrackImage(`/assets/untrack.png`);
          setTrackMessage('加入最愛');
        }
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

  const sendStarInfo = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const data = {
      productID: productID,
      isStar: trackImage === `/assets/untrack.png`
    };

    try {
      await axios.post(`${backendUrl}/shop/star`, data, config);
      fetchProduct();
    } catch (error) {
      // do something
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  }

  

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <BackLink />
        <div className={styles.productInfoContainer}>
          <RenderPictures pictures={imageUrl}/>
          <div className={styles.detailContainer}>
            <ProductTitle productName={name} />
            <RenderTags time={timeRemaining} category={category} trackImage={trackImage} trackMessage={trackMessage} sendStarInfo={sendStarInfo}/>
            <RenderPriceDetails productID={productID} currentPrice={currentPrice} price={price} minBid={minBid} startAt={startAt} endAt={endAt} fetchProduct={fetchProduct}/>
          </div>
        </div>
        <HistorySection history={history} totalNumberOfPage={totalNumberOfPage} handlePageChange={handlePageChange}/>
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

const RenderTags = ({ time, category, trackImage, trackMessage, sendStarInfo }) => {
  const restTimeImage = `/assets/restTimeIcon.png`;
  
  return (
    <div className={styles.tagContainer}>
      <div className={styles.productTimeWrapper}>
        <img className={styles.productTimeIcon} src={restTimeImage} alt="" />
        <div className={styles.productTime}>{time}</div>
      </div>
      <div className={styles.categoryWrapper}>
        <div className={styles.category}>{category}</div>
      </div>
      <div className={styles.trackWrapper} onClick={sendStarInfo}>
        <img className={styles.trackIcon} src={trackImage} alt="" />
        <div className={styles.category}>{trackMessage}</div>
      </div>
    </div>
  );
};

const RenderPriceDetails = ({ productID, currentPrice, price, minBid, startAt, endAt, fetchProduct }) => {

  const [ showModal, setShowModal ] = useState(false);
  const [ showSuccessModal, setShowSuccessModal ] = useState(false);

  const onButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const successBid = () => {
    setShowModal(false);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    fetchProduct();
  };

  return (
    <div className={styles.priceContainer}>
      <div className={styles.currentPrice}>目前出價: NTD {currentPrice}</div>
      <div className={styles.detail}>底價: NTD {price}</div>
      <div className={styles.detail}>出價增額: NTD {minBid}</div>
      <div className={styles.detail}>起價時間: {new Date(startAt).toLocaleString()}</div>
      <div className={styles.detail}>截標時間: {new Date(endAt).toLocaleString()}</div>
      <div className={styles.bidBox} onClick={onButtonClick}>
        <div className={styles.bidButton}>我要出價</div>
      </div>
      <Bid show={showModal} productID={productID} successBid={successBid} onClose={closeModal}></Bid>
      <SuccessModal show={showSuccessModal} onClose={closeSuccessModal} text='成功出價！'></SuccessModal>
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

const HistorySection = ({ history, totalNumberOfPage, handlePageChange }) => (
  <div>
    <div className={styles.subTitleContainer}>
      <div className={styles.subTitle}>歷史喊價紀錄</div>
    </div>
    <div className={styles.historyContainer}>
      <div className={styles.historyTitleInfo}>
        <div className={styles.historyTitle}>帳號</div>
        <div className={styles.historyTitle}>出價金額</div>
        <div className={styles.historyTitle}>出價時間</div>
        <div className={styles.titleBottom}></div>
      </div>
      {history && history.map((record, index) => (
        <div key={index} className={styles.historyInfo}>
          <div className={styles.info}>{record.username}</div>
          <div className={styles.info}>NTD {record.bidPrice}</div>
          <div className={styles.info}>{new Date(record.bidTime).toLocaleString()}</div>
        </div>
      ))}
      <Pagination
        totalPages={totalNumberOfPage}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePageChange}
      />
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