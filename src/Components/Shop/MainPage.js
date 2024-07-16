// import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import styles from './MainPage.module.css';
import ProductCard from './ProductCard';
import config from '../../config/config';
import axios from 'axios';
import Pagination from './Pagination';
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
    const [selectedPage, setSelectedPage] = useState(1);
    const [activeButton, setActiveButton] = useState(null);
    const [cards, setCards] = useState([])
    const { backendUrl } = config;
    const [totalPages, setTotalPages] = useState(1);

    const pageRangeDisplayed = 5;
    const handlePageChange = (pageNumber) => {
      setSelectedPage(pageNumber);
    };
  
    const handleSorting = (event) => {
      setSelectedSorting(event.target.value);
    };
    const handleCategory = (event) => {
      setSelectedCategory(event.target.value);
      setActiveButton(event.target.value);
      fetchProducts(selectedPage, selectedCategory, selectedSorting);
    }

    const fetchProducts = async (page, category, sorting) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const data = {
        "page": page,
        "sort": sorting,
        "category": category
      };
  
      try {
        const response = await axios.post(`${backendUrl}/shop/product`, data, config);
        if (response && response.data && response.data.Data) {
          const productData = response.data.Data.map(product => ({
            productID: product.productId,
            product: product.productName,
            imgUrl: `${backendUrl}${product.imgUrl}`
          }));
          setCards(productData);
        } else {
          setCards([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const fetchTotalProducts = async (category) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const data = {
        "category": category
      };
  
      try {
        const response = await axios.post(`${backendUrl}/shop/totalPagesOfProduct`, data, config);
        if (response.data.Status === true) {
          console.log(response.data.Data.total)
          setTotalPages(response.data.Data.total);
        } else {
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    useEffect(() => {
      fetchProducts(selectedPage, selectedCategory, selectedSorting);
      fetchTotalProducts(selectedCategory);
    }, [selectedPage, selectedCategory, selectedSorting]);
  
    return (
      <div className={styles.mainContainer}>
        <MainTitle />
        <div className={styles.contentContainer}>
          <ContentTitle />
          <div className={styles.sortingContainer}>
              <div className={styles.sortingButton}>
                  <div className={styles.sortingList} >
                      <select id="sorting" value={selectedSorting} onChange={handleSorting}>
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
              <li>
                    <button
                        className={`${styles.sidebarLabel} ${activeButton === "World" ? styles.selected : ''}`}
                        value="World"
                        onClick={handleCategory}
                    >
                        世界錢幣
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.sidebarLabel} ${activeButton === "America" ? styles.selected : ''}`}
                        value="America"
                        onClick={handleCategory}
                    >
                        美國錢幣
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.sidebarLabel} ${activeButton === "Europe" ? styles.selected : ''}`}
                        value="Europe"
                        onClick={handleCategory}
                    >
                        歐洲錢幣
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.sidebarLabel} ${activeButton === "Asia" ? styles.selected : ''}`}
                        value="Asia"
                        onClick={handleCategory}
                    >
                        亞洲錢幣
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.sidebarLabel} ${activeButton === "Africa" ? styles.selected : ''}`}
                        value="Africa"
                        onClick={handleCategory}
                    >
                        非洲錢幣
                    </button>
                </li>
              </ul>
            </div>
            <ProductCard cards={cards}/>
          </div>
          <Pagination
            totalPages={totalPages}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={handlePageChange}
          />
        </div>
        
      </div>
  
  
    );
  }
  
  export default MainPage