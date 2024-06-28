import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductPage.module.css';

const ProductPage = () => {

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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <BackLink />
        <div className={styles.productInfoContainer}>
          <RenderPictures />
          <div className={styles.detailContainer}>
            <ProductTitle productName={productInfo.productName} />
            <RenderTags productInfo={productInfo} />
            <RenderPriceDetails productInfo={productInfo} />
          </div>
        </div>
        <HistorySection />
        <DescriptionSection productDescription={productInfo.description} />
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

const RenderTags = ({ productInfo }) => (
  <div className={styles.tagContainer}>
    <div className={styles.tagBox}>
      <p className={styles.tag}>{productInfo.time}</p>
    </div>
    <div className={styles.tagBox}>
      <p className={styles.tag}>{productInfo.category}</p>
    </div>
  </div>
);

const RenderPriceDetails = ({ productInfo }) => {

  const onButtonClick = () => {
  };

  return (
    <div className={styles.priceContainer}>
      <p className={styles.currentPrice}>目前出價: NTD {productInfo.currentPrice}</p>
      <p>底價: NTD {productInfo.minBid}</p>
      <p>出價增額: NTD {productInfo.offset}</p>
      <p>起價時間: {productInfo.startAt}</p>
      <p>截標時間: {productInfo.EndAt}</p>
      <div className={styles.bidBox}>
        <button className={styles.bidButton} onClick={onButtonClick}>我要出價</button>
      </div>
    </div>
  );
};

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

const HistorySection = () => (
  <div>
    <div className={styles.subTitleContainer}>
      <div className={styles.subTitle}>歷史喊價紀錄</div>
    </div>
    <div className={styles.historyContainer}>
      <p>帳號   出價金額    出價時間</p>
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