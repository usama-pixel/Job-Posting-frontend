import { Avatar, Image, Typography } from 'antd'
import React, { useState } from 'react'
import styles from '../styles/navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faLocation, faMap } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [current, setCurrent] = useState();
    return (
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
                <Typography.Text><a className={styles.link}>Find Job</a></Typography.Text>
                <Typography.Text><a className={styles.link}>Messages</a></Typography.Text>
                <Typography.Text><a className={styles.link}>Hiring</a></Typography.Text>
                <Typography.Text><a className={styles.link}>Community</a></Typography.Text>
            </div>
            <div className={styles.location}>
                <FontAwesomeIcon icon={faMap} />
                <Typography.Text style={{color: 'white', marginLeft: '10px'}}>New York</Typography.Text>
            </div>
            <div className={styles.userSection}>
                <Avatar className={styles.userSectionIcon} src='https://i.pinimg.com/originals/bd/9e/0c/bd9e0c78a5af0557f6bfd5698d0747a2.jpg' />
                <FontAwesomeIcon className={styles.userSectionIcon} icon={faGear} />
                <FontAwesomeIcon className={styles.userSectionIcon} icon={faBell} />
            </div>
        </div>
    )
}

export default Navbar
