import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainPage from './Shop/MainPage';
import ProductPage from './Shop/ProductPage';
import Member from './Member/Member';
import NewProduct from './Member/NewProduct';

const Navbar = () => {
    // Example state usage with useState hook
    const [isActive, setIsActive] = useState(false);

    return (
        <Router>
            <div>
                <div  className={styles.navList} >
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">登入</Link>
                            </li>
                            <li>
                                <Link to="/detail">商品細節</Link>
                            </li>
                            <li>
                                <Link to="/newproduct">新增商品</Link>
                            </li>
                            <li>
                                <Link to="/product">商品總覽</Link>
                            </li>
                            <li>
                                <Link to="/member">會員專區</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/product" element={<MainPage/>} />
                    <Route path="/detail" element={<ProductPage/>} />
                    <Route path="/member" element={<Member/>} />
                    <Route path="/newproduct" element={<NewProduct/>} />

                </Routes>
                
            </div>
        </Router>
    );
};

export default Navbar;