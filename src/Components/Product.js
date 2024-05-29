// import React, { useState, useEffect } from 'react'
import React, { useState} from 'react'
import styles from './Product.module.css';
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


function ProductCard() {
  // const [cards, setCards] = useState([]);
  const [cards ] = useState([
    {
      id: "1",
      product: "product-1",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "2",
      product: "product-2",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "3",
      product: "product-3",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "4",
      product: "product-4",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "5",
      product: "product-5",
      alternativeText: "Alternate Text for Image"
    },
    {
      id: "6",
      product: "product-6",
      alternativeText: "Alternate Text for Image"
    },
  ])

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     try {
  //       const response = await axios.post('http://127.0.0.1:81/shop/product', {
  //         page: 1,
  //         sort: 'method',
  //         category: 'default',
  //       });

  //       if (response.status === 200) {
  //         // setCards(response.data); 
  //         console.log('Successfully send request');
  //       } else {
  //         console.error('Unexpected response status:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('There was a problem with the axios operation:', error);
  //     }
  //   };

  //   sendRequest();
  // }, []);

  return (
    <div className={styles.productCards}>
      {cards.map((productCard, i) => (
        <div key={i} className={styles.productCard}>
          <h3>{productCard.product}</h3>
          <p>{productCard.alternativeText}</p>
        </div>
      ))}
    </div>
  );
}


// main layout
const Product = (props) => {

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
                        {/* <option value="商品排序">商品排序</option> */}
                        <option value="熱門程度">熱門程度</option>
                        <option value="由新到舊">由新到舊</option>
                        <option value="由舊到新">由舊到新</option>
                    </select>
                </div>
            </div>
        </div>
        <div className={styles.column}>
          <div className={styles.sidebarContainer}>
            <ul>
              <li><button className="sidebarLabel" value="世界錢幣" onClick={handleCategory}>世界錢幣</button></li>
              <li><button className="sidebarLabel" value="美國錢幣" onClick={handleCategory}>美國錢幣</button></li>
              <li><button className="sidebarLabel" value="歐洲錢幣" onClick={handleCategory}>歐洲錢幣</button></li>
              <li><button className="sidebarLabel" value="亞洲錢幣" onClick={handleCategory}>亞洲錢幣</button></li>
              <li><button className="sidebarLabel" value="非洲錢幣" onClick={handleCategory}>非洲錢幣</button></li>
            </ul>
          </div>
          {/* <SideBar />  */}
          <ProductCard />
        </div>
      </div>
    </div>


  );
}

export default Product