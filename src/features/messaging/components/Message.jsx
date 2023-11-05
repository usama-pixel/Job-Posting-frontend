import React from 'react'
import styles from '../styles/message.module.scss'
import { Avatar, Badge, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPhone, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import MessageInput from './MessageInput'

function Message() {
  return (
    <div className={styles.container}>
        <div className={styles.head}>
            <div className={styles.user}>
                <Badge
                    dot={true}
                    offset={[-12,52]}
                    color='green'
                    style={{width: '14px', height: '14px'}}
                >
                    <Avatar
                        size={60}
                        src={'https://www.animeexplained.com/wp-content/uploads/2022/12/Gojo-Satoru-funny.webp'}
                    />
                </Badge>
                <div className={styles.userCol1}>
                    <Typography.Text strong>Defne</Typography.Text>
                    <Typography.Text>Online</Typography.Text>
                </div>
            </div>
            <div className={styles.userCol2}>
                <FontAwesomeIcon className={`${styles.callIcon} ${styles.icon}`} icon={faPhone} />
                <FontAwesomeIcon className={`${styles.videoCallIcon} ${styles.icon}`} icon={faVideoCamera} />
                <FontAwesomeIcon className={`${styles.optionsIcon} ${styles.icon}`} icon={faEllipsisV} />
            </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.messages}>
            {/* recieved message */}
            <div className={`${styles.msgContainerRecieved}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Hey there</Typography.Text>
                </div>
                <Typography.Text>10:00 am</Typography.Text>
            </div>
            
            {/* sent message */}
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Hey there</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Yo How you doing bro</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Yo How you doing bro</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Yo How you doing bro</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Yo How you doing bro</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
            <div className={`${styles.msgContainerSent}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Yo How you doing bro</Typography.Text>
                </div>
                <Typography.Text className={styles.time}>10:00 am</Typography.Text>
            </div>
        </div>
        <div className={styles.input}>
            <MessageInput />
        </div>
    </div>
  )
}

export default Message