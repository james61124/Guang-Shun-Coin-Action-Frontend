import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
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
import ForgetPassword from './Member/ForgetPassword/ForgetPassword';
import MyProduct from './Member/MyProduct/MyProduct';
import PopUpMessage from './PopUpMessage/PopUpMessage';

const loggedInOptions = [
    { value: 'editMember', label: '修改資料' },
    { value: 'editPassword', label: '修改密碼' },
    { value: 'logout', label: '登出' },
];

const loggedOutOptions = [
    { value: 'register', label: '用戶註冊' },
    { value: 'login', label: '登入' },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'KingHwa-OldSong',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        background: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',
        minHeight: 'auto',
        padding: '0 4px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
        fontFamily: 'KingHwa-OldSong',
        fontSize: '16px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        width: '16px',
        height: '16px',
        color: 'white',
        marginLeft: '-5px',
        marginTop: '-3px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menu: (provided) => ({
        ...provided,
        background: '#7992A0',
        zIndex: 9999,
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
        alignItems: 'center', 
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? '#886830' : (state.isFocused ? '#A07F57' : '#7992A0'),
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        textAlign: 'center', // Center text horizontally
        display: 'flex',
        alignItems: 'center', // Center text vertically
        justifyContent: 'center', // Center text horizontally
        height: '40px', // Adjust height as needed
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white',
        fontFamily: 'KingHwa-OldSong',
        fontSize: '16px',
    }),
};

const Navbar = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [isLoggedIn]);

    const handleLogout = () => {
        setShowModal(true);
    };

    const handleChange = (selectedOption) => {
        if(selectedOption.value === 'logout') {
            handleLogout();
        }
        else if (selectedOption) {
            navigate(selectedOption.value);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setIsLoggedIn(true);
        navigate('/login');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <div>
            <div>
                <div className={styles.navList}>
                    {isLoggedIn && role === 'admin' && (
                        <>
                            <div className={styles.navItem}>
                                <Link className={styles.navcontent} to="/editProduct">編輯商品</Link>
                            </div>
                            <div className={styles.navItem}>
                                <Link className={styles.navcontent} to="/newproduct">新增商品</Link>
                            </div>
                        </>
                    )}
                    <div className={styles.navItem}>
                        <Link className={styles.navcontent} to="/historyBid">歷史出價</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link className={styles.navcontent} to="/myProduct">我的商品</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link className={styles.navcontent} to="/product">商品總覽</Link>
                    </div>
                    <div className={styles.navItem}>
                        {isLoggedIn !== null && (
                            <Select
                                className={styles.selectList}
                                options={isLoggedIn ? loggedInOptions : loggedOutOptions}
                                value={null}
                                onChange={handleChange}
                                placeholder="個人檔案" 
                                styles={customStyles}
                                isSearchable={false}
                            />
                        )}
                    </div>
                </div>
                <PopUpMessage show={showModal} message={"登出成功"} onClose ={closeModal}></PopUpMessage>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole}/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/product" element={<MainPage/>} />
                    <Route path="/detail/:productID" element={<ProductPage />} />
                    <Route path="/updateDetail/:productID" element={<EditProductPage />} />
                    <Route path="/historyBid" element={<HistoryBid/>} />
                    <Route path="/newproduct" element={<NewProduct/>} />
                    <Route path="/editMember" element={<EditMember/>} />
                    <Route path="/editPassword" element={<EditPassword/>} />
                    <Route path="/editProduct" element={<EditProduct/>} />
                    <Route path="/forgetPasswd" element={<ForgetPassword/>} />
                    <Route path="/myProduct" element={<MyProduct/>} />
                </Routes>
            </div>
        </div>
    );
};

export default Navbar;