import { Avatar, Badge, Image, Slider, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faGear, faLocationDot, faSearch, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import MyInput from '../../../common/MyInput'

import styles from '../styles/navbar.module.scss'
import { navigationOptions } from '../../../utils/navigation-options';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const [current, setCurrent] = useState(0);
    const [search, setSearch] = useState('');
    const [lowerSalary, setLowerSalary] = useState(30);
    const [upperSalary, setUpperSalary] = useState(60);
    const navigate = useNavigate()
    const location = useLocation()
    console.log({location: location.pathname});
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
    // useEffect(() => setCurrent(1), [])
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
                <Typography.Text style={{color: 'white', marginLeft: '10px'}}>New York</Typography.Text>
            </div>
            <div className={styles.userSection}>
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
                <FontAwesomeIcon className={styles.userSectionIcon} icon={faGear} />
                <FontAwesomeIcon className={styles.userSectionIcon} icon={faBell} />
            </div>
        </div>
        {
            current === navigationOptions.FINDJOB
            && 
            <div className={styles.findJob}>
                <div className={styles.option} style={{paddingTop: '15px'}}>
                    <MyInput
                        icon={faSearch}
                        placeholder={'Job Title'}
                        value={search}
                        setValue={setSearch}
                    />
                </div>
                <hr className={styles.line} />
                <div className={styles.option}>
                    <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '12px', paddingRight: '12px', borderRadius: '40px'}}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <select className={styles.mySelect}>
                        <option>California</option>
                        <option>Boston</option>
                        <option>Los Vegas</option>
                    </select>
                </div>
                <hr className={styles.line} />
                <div className={styles.option}>
                    <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '40px'}}>
                        <FontAwesomeIcon icon={faSuitcase} />
                    </span>
                    <select className={styles.mySelect}>
                        <option>Entry Level</option>
                        <option>1-2 Years</option>
                        <option>3-5 Years</option>
                        <option>5-8 Years</option>
                        <option>8+ Years</option>
                    </select>
                </div>
                <hr className={styles.line} />
                <div className={styles.option}>
                    <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '40px'}}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </span>
                    <select className={styles.mySelect}>
                        <option>Per Hour</option>
                        <option>Per Week</option>
                        <option>Per Month</option>
                        <option>Per Year</option>
                    </select>
                </div>
                <hr className={styles.line} />
                <div className={styles.slider}>
                    <Typography.Text style={{color: 'white'}}>Salary Range ${lowerSalary} - ${upperSalary}</Typography.Text>
                    <Slider
                        range
                        defaultValue={[lowerSalary, upperSalary]}
                        onChange={e => {
                            if(!e) return;
                            setLowerSalary(e[0])
                            setUpperSalary(e[1])
                        }}
                        styles={{
                            rail: {
                                background: 'white'
                            }
                        }}
                    />
                </div>
            </div>
        }
        </>
    )
}

export default Navbar
