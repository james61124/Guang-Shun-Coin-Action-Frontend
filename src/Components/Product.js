import React, { useState } from 'react'
import styles from './Product.module.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';
// import {Grid, Card, Typography, CardMedia, Button, CardActions, CardContent} from '@mui/material';


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
        </div>
      </div>
    </div>

  );
}

export default Product