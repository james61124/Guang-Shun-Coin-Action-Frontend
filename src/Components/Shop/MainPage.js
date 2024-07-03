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
      <h1>全站商品</h1>
    </div>
  );
}



const MainPage = (props) => {

    const [selectedSorting, setSelectedSorting] = useState('Sorting');
    const [selectedCategory, setSelectedCategory] = useState('World');
  
    console.log('Selected Sorting:', selectedSorting);
    console.log('Selected Category:', selectedCategory);
  
    const handleSorting = (event) => {
      setSelectedSorting(event.target.value);
    };
    const handleCategory = (event) => {
      setSelectedCategory(event.target.value);
    }
  
    return (
      <div className={styles.mainContainer}>
        <MainTitle />
        <div className={styles.contentContainer}>
          <ContentTitle />
          <div className={styles.sortingContainer}>
              <div className={styles.sortingButton}>
                  <div className={styles.sortingList} >
                      <select id="sorting" value={selectedSorting} onChange={handleSorting}>
                          <option value="Sorting">商品排序</option>
                          <option value="Popular">熱門程度</option>
                          <option value="NewFirst">由新到舊</option>
                          <option value="OldFirst">由舊到新</option>
                      </select>
                  </div>
              </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.sidebarContainer}>
              <ul>
                <li><button className={styles.sidebarLabel} value="World" onClick={handleCategory}>世界錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="America" onClick={handleCategory}>美國錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="Europe" onClick={handleCategory}>歐洲錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="Asia" onClick={handleCategory}>亞洲錢幣</button></li>
                <li><button className={styles.sidebarLabel} value="Africa" onClick={handleCategory}>非洲錢幣</button></li>
              </ul>
            </div>
            <ProductCard page={1} sort={"famous"} category={"europe coin"}/>
          </div>

        </div>
      </div>
  
  
    );
  }
  
  export default MainPage