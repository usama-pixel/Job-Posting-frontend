import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Image, Dropdown, Typography, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/navbar.module.scss'
import { navigationOptions } from '../../../utils/navigation-options';
import Cookies from 'js-cookie';

function Navbar() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const dropDownItems = [
        {
            key: 1,
            label: (
                <a
                    onClick={() => {
                        Cookies.remove('token')
                        sessionStorage.removeItem('id')
                        sessionStorage.removeItem('name')
                        navigate('/login')
                    }}
                    className={styles.logout}
                >Logout</a>
            )
        }
    ]
    useEffect(() => {
        if(location.pathname === '/home') {
            setCurrent(0)
        } else if(location.pathname === '/messages') {
            setCurrent(1)
        } else if(location.pathname === '/hiring') {
            setCurrent(2)
        } else if(location.pathname === '/community') {
            setCurrent(3)
        }
    }, [])
    const handleMenuClick = (menuIndx) => {
        setCurrent(menuIndx);
        if(menuIndx === navigationOptions.MESSAGES) {
            navigate('/messages')
        } else if(menuIndx === navigationOptions.FINDJOB) {
            navigate('/home')
        }
    };
    const [name, setName] = useState(sessionStorage.getItem('name'))
    return (
        <>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Image
                    src='https://i.pinimg.com/originals/bd/9e/0c/bd9e0c78a5af0557f6bfd5698d0747a2.jpg'
                    width={40}
                    height={40}
                />
                <Typography.Text>JobHarbor</Typography.Text>
            </div>
            {Cookies.get('token')
                &&
            <>
            <div className={styles.menu}>
                <Typography.Text><a
                    className={`${styles.link} ${current === navigationOptions.FINDJOB ? styles.active : ''}`}
                    onClick={() => handleMenuClick(navigationOptions.FINDJOB)}
                >Find Job</a></Typography.Text>
                <Typography.Text><a
                    className={`${styles.link} ${current === navigationOptions.MESSAGES ? styles.active : ''}`}
                    onClick={() => handleMenuClick(navigationOptions.MESSAGES)}
                >Messages</a></Typography.Text>
                <Typography.Text><a
                    className={`${styles.link} ${current === navigationOptions.HIRING ? styles.active : ''}`}
                    onClick={() => handleMenuClick(navigationOptions.HIRING)}
                >Hiring</a></Typography.Text>
                <Typography.Text><a
                    className={`${styles.link} ${current === navigationOptions.COMMUNITY ? styles.active : ''}`}
                    onClick={() => handleMenuClick(navigationOptions.COMMUNITY)}
                >Community</a></Typography.Text>
            </div>
            <div className={styles.location}>
                <FontAwesomeIcon icon={faLocationDot} />
                <Typography.Text
                    style={{color: 'white', marginLeft: '10px', cursor: 'pointer'}}
                    // onClick={() => {
                    //     Cookies.remove('token')
                    //     navigate('/login')
                    // }}
                >{name}</Typography.Text>
            </div>
            </>}
            <div className={styles.userSection}>
                {Cookies.get('token') ?
                <>
                    <Badge
                        dot={true}
                        offset={[-20,5]}
                        color='green'
                    >
                        <Avatar
                            shape='circle'
                            className={styles.userSectionIcon}
                            src='https://i.pinimg.com/originals/bd/9e/0c/bd9e0c78a5af0557f6bfd5698d0747a2.jpg'
                        />
                    </Badge>
                    <Dropdown
                        menu={{
                            items: dropDownItems
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <FontAwesomeIcon className={styles.userSectionIcon} icon={faGear} />
                        </a>
                    </Dropdown>
                        <FontAwesomeIcon className={styles.userSectionIcon} icon={faBell} />
                </> :
                <>
                    <a
                        onClick={() => navigate('/login')}
                        className={styles.loginBtn}>Log In</a>
                    <a className={styles.signupBtn}>Sign Up</a>
                </>}
            </div>
        </div>
        </>
    )
}

export default Navbar
