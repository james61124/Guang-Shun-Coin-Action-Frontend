import React, { useState, useEffect, useRef } from 'react'
import styles from './EditProduct.module.css';
import ProductCard from './ProductCard';
import config from '../../../config/config';
import axios from 'axios';
import Pagination from './Pagination';
import PriceFilter from './PriceFilter'
import Select from 'react-select';

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

const options = [
  { value: '目前價格由大至小', label: '目前價格由大至小' },
  { value: '目前價格由小至大', label: '目前價格由小至大' },
  { value: '截標日期由近至遠', label: '截標日期由近至遠' },
  { value: '截標日期由遠至近', label: '截標日期由遠至近' },
];


const EditProduct = (props) => {

    const [selectedSorting, setSelectedSorting] = useState('目前價格由大至小');
    const [selectedCategory, setSelectedCategory] = useState('World');
    const [selectedPage, setSelectedPage] = useState(1);
    const [activeButton, setActiveButton] = useState(null);
    const [cards, setCards] = useState([])
    const { backendUrl } = config;
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState('0-50000+');
    const pageRangeDisplayed = 5;
    
    const handleCategory = (event) => {
        const value = event.target.value;
        setActiveButton(value);
        setSelectedCategory(value)
    };

    const handlePriceChange = (newRange) => {
      setPriceRange(newRange);
    };
    
    const handlePageChange = (pageNumber) => {
      setSelectedPage(pageNumber);
    };

    const handleChange = (selectedOption) => {
      if (selectedOption) {
        setSelectedSorting(selectedOption.value);
      }
    };

    const fetchProducts = async (page, category, sorting, priceRange) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const data = {
        "page": page,
        "sort": sorting,
        "category": category,
        "price": priceRange
      };
  
      try {
        const response = await axios.post(`${backendUrl}/admin/updateProductPage`, data, config);
        if (response && response.data && response.data.Data.products) {
          console.log(response)
          const productData = response.data.Data.products.map(product => ({
            productID: product.productId,
            product: product.productName,
            price: product.price,
            bidCount: product.bidCount,
            endedAt: product.endedAt,
            imgUrl: `${backendUrl}${product.imgUrl}`
          }));
          setCards(productData);
          setTotalPages(response.data.Data.totalPages);
        } else {
          setCards([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    useEffect(() => {
      fetchProducts(selectedPage, selectedCategory, selectedSorting, priceRange);
    }, [selectedPage, selectedCategory, selectedSorting, priceRange]);
  
    return (
      <div className={styles.mainContainer}>
        <MainTitle />
        <div className={styles.contentContainer}>
          <ContentTitle />

          <div className={styles.sortingContainer}>
            <div className={styles.sortingButton}>
              <Select
                className={styles.selectList}
                options={options}
                value={options.find(option => option.value === selectedSorting)}
                onChange={handleChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'KingHwa-OldSong',
                    fontSize: '20px',
                    color: 'white',
                    border: 'none',
                    background: 'transparent',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    minHeight: 'auto',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'white',
                    fontFamily: 'KingHwa-OldSong',
                    fontSize: '20px',
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    padding: 0,
                    width: '20px',
                    height: '20px',
                    color: 'white'
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    background: '#7992A0',
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    padding: 0,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    background: state.isSelected ? '#886830' : (state.isFocused ? '#A07F57' : '#7992A0'),
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }),
                  noOptionsMessage: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                }}
              />
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
              <PriceFilter onPriceChange={handlePriceChange}/>   
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
  
  export default EditProduct