// import React, { useState, useEffect } from 'react'
import React, { useState} from 'react'
import styles from './MainPage.module.css';
import ProductCard from './ProductCard';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';

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



const MainPage = (props) => {

    const [selectedSorting, setSelectedSorting] = useState('商品排序');
    const [selectedCategory, setSelectedCategory] = useState('世界錢幣');
  
    console.log('Selected Sorting:', selectedSorting);
    console.log('Selected Category:', selectedCategory);
  
    const handleSorting = (event) => {
      setSelectedSorting(event.target.value);
    };
    const handleCategory = (event) => {
      setSelectedCategory(event.target.value);
    }
  
    // const onButtonClick = () => {
    //   // You'll update this function later...
    // }
  
    return (
      <div className={styles.mainContainer}>
        <MainTitle />
        <div className={styles.contentContainer}>
          <ContentTitle />
          <div className={styles.sortingContainer}>
              <div className={styles.sortingButton}>
                  <div className={styles.sortingList} >
                      <select id="sorting" value={selectedSorting} onChange={handleSorting}>
                          <option value="商品排序">商品排序</option>
                          <option value="熱門程度">熱門程度</option>
                          <option value="由新到舊">由新到舊</option>
                          <option value="由舊到新">由舊到新</option>
                      </select>
                  </div>
              </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.sidebarContainer}>
              <ul>
                <li><button className={styles.sidebarLabel} value="世界錢幣" onClick={handleCategory}>世界錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="美國錢幣" onClick={handleCategory}>美國錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="歐洲錢幣" onClick={handleCategory}>歐洲錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="亞洲錢幣" onClick={handleCategory}>亞洲錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="非洲錢幣" onClick={handleCategory}>非洲錢幣</button></li>
              </ul>
            </div>
            <ProductCard />
          </div>

        </div>
      </div>
  
  
    );
  }
  
  export default MainPage