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



const Product = (props) => {
  return (
    <div className={styles.mainContainer}>
      <MainTitle />
      <br></br>
      <div className={styles.contentContainer}>
      <div></div>
      </div>
    </div>

  );
}

export default Product