import React, { useEffect, useState } from 'react'
import styles from '../styles/contacts.module.scss'
import { Avatar, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { getFetch } from '../../../lib/fetch.js'
import Cookies from 'js-cookie'

function Contacts({ users, setSelectedId, setShowMsg, setSelectedName }) {
    const messages = [1,2,3,4,5,6,7,8]
    const cardColors = [
        '#cfa8e9', '#ecabd9', '#fcb3c9', '#ffbebf', '#ffccbc', '#ffcbbe', '#ffcac1', '#ffc9c3', '#fbbcd0', '#e6b6e4', '#bbb6f6', '#75bafb'
    ]
    const handleClick = (id) => {
        console.log({Rid: id, Mid: sessionStorage.getItem('id')})
        setSelectedId(id)
    }
    // console.log(users)
    return (
        <div className={styles.container}>
            {users?.map((user, i) => (
                <div
                    key={user?.id}
                    onClick={() => {
                        setShowMsg(true)
                        handleClick(user?.id)
                        setSelectedName(user?.username)
                    }}
                    className={styles.contact}
                    style={{
                        backgroundColor: cardColors[(i + 1) % cardColors.length]
                    }}
                >
                    <Avatar
                        src={'https://www.animeexplained.com/wp-content/uploads/2022/12/Gojo-Satoru-funny.webp'}
                        size={50}
                        style={{marginLeft: '20px'}}
                    />
                    <div className={styles.col1}>
                        <Typography.Text className={styles.username}>{user?.username}</Typography.Text>
                        <Typography.Paragraph className={styles.textColor}>Hola</Typography.Paragraph>
                    </div>
                    <div className={styles.col2}>
                        <Typography.Paragraph className={styles.textColor}>Today, 10:00 am</Typography.Paragraph>
                        <FontAwesomeIcon
                            icon={faCheckDouble}
                            style={{color: 'blue'}}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Contacts