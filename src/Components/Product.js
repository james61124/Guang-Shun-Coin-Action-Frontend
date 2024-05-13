import React, { useState } from 'react'
import styles from './Product.module.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';
// import {Grid, Card, Typography, CardMedia, Button, CardActions, CardContent, Paper} from '@mui/material';
import data from './data.json';
import { cardClasses } from '@mui/material';
// import { styled } from '@mui/material/styles';

const MainTitle = () => {
  return (
    <div>
      <div className={styles.title}>
        <div>廣順錢幣</div>
      </div>
      <div className={styles.subtitle} >
        <div>Guang Shun Coin Action</div>
      </div>
    </div>
  );
}

const ContentTitle = () => {
  return (
    <div className={styles.contentTitle}>
      <h1>全部商品</h1>
    </div>
  );
}


function ProductCard() {
  const [cards] = useState([
    {
      id: "1",
      title: "product-1",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "2",
      title: "product-2",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "3",
      title: "product-3",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "4",
      title: "product-4",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "5",
      title: "product-5",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "6",
      title: "product-6",
      alternativeText: "Alternate Text for Image"
    },
  ])

  return (
    <div className={styles.productCards}>
      {cards.map((productCard, i) => (
        <div key={i} className={styles.productCard}>
          <h3>{productCard.title}</h3>
          <p>{productCard.alternativeText}</p>
        </div>
      ))}
    </div>
  );
}


function SideBar () {
  return (
      <div className={styles.sidebarContainer}>
        <ul>
          <li><button className='sidebarLabel'> 世界錢幣</button></li>
          <li><button className='sidebarLabel'> 世界錢幣</button></li>
          <li><button className='sidebarLabel'> 世界錢幣</button></li>
          <li><button className='sidebarLabel'> 世界錢幣</button></li>
          <li><button className='sidebarLabel'> 世界錢幣</button></li>
        </ul>
      </div>
  );
}




const Product = (props) => {
  return (
    <div className={styles.mainContainer}>
      <MainTitle />
      <div className={styles.contentContainer}>
        <ContentTitle />
        <div className={styles.column}>
          <SideBar /> 
          <ProductCard />
        </div>
      </div>
    </div>

  );
}

export default Product