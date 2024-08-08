import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainPage from './Shop/MainPage';
import ProductPage from './Shop/ProductDetail/ProductPage';
import HistoryBid from './Member/HistoryBid/HistoryBid';
import NewProduct from './Member/NewProduct';
import EditMember from './Member/EditMember/EditMember';
import EditPassword from './Member/EditPassword/EditPassword';
import EditProduct from './Admin/EditProduct/EditProduct'
import EditProductPage from './Admin/EditProductPage/EditProductPage'

const Navbar = () => {
    // Example state usage with useState hook
    const [isActive, setIsActive] = useState(false);
    const handleLogout = () => {
        // // 这里放置登出的逻辑
        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        // setIsLoggedIn(false);
        // setUsername('');
      };

    return (
        <Router>
            <div>
                <div className={styles.navList} >
                    <ul>
                        <li>
                            <Link to="/login">登入</Link>
                        </li>
                        <li>
                            <Link to="/editMember">修改個人資訊</Link>
                        </li>
                        <li>
                            <Link to="/editPassword">修改密碼</Link>
                        </li>
                        <li>
                            <Link to="/product">商品總覽</Link>
                        </li>
                        <li>
                            <Link to="/historyBid">歷史出價</Link>
                        </li>
                        <li>
                            <Link to="/historyBid">聯絡我們</Link>
                        </li>
                        <li>
                            <Link to="/editProduct">編輯商品</Link>
                        </li>
                        <li>
                            <Link to="/newproduct">新增商品</Link>
                        </li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/product" element={<MainPage/>} />
                    <Route path="/detail/:productID" element={<ProductPage />} />
                    <Route path="/updateDetail/:productID" element={<EditProductPage />} />
                    <Route path="/historyBid" element={<HistoryBid/>} />
                    <Route path="/newproduct" element={<NewProduct/>} />
                    <Route path="/editMember" element={<EditMember/>} />
                    <Route path="/editPassword" element={<EditPassword/>} />
                    <Route path="/editProduct" element={<EditProduct/>} />
                </Routes>
                
            </div>
        </Router>
    );
};

export default Navbar;