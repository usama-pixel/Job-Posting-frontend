import React, { useEffect, useState } from 'react'
import styles from '../styles/message.module.scss'
import { Avatar, Badge, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPhone, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import MessageInput from './MessageInput'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { postFetch } from '../../../lib/fetch'
import { base_url } from '../../../utils/vars'

function Message({ socket, selectedId, showMsg, selectedName }) {
    // const socket = socket('http://localhost:3001')
    // const socket = io.connect('http://localhost:3001')
    // prompt('hello')
    const [userId, setUserId] = useState(sessionStorage.getItem('id'))
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    useEffect(() => {
        socket = io(base_url)
    }, [])
    useEffect(() => {
        console.log('is socket connected', socket.connected)
        if(!socket.connected) {
            socket.connect()
            console.log('socket connected', socket.connected)
        }
        console.log('registering')
        socket.emit('register', userId)
        console.log('registered')
        socket.on('recieve_msg', (data) => {
            console.log({messages, data})
            setMessages(prev => [...prev, data])
        })
        // }
    }, [socket])
    useEffect(() => {
        if(selectedId === null) return
        postFetch('/msgs', {toId: selectedId, fromId: +sessionStorage.getItem('id')})
        .then(res => res.json())
        .then(res => {
            if(res?.status === 200) {
                setMessages(res.data)
                console.log({check: res.data})
            }
        }).catch(err => {
            console.log(err);
        })
    }, [selectedId])
    const onSubmit = () => {
        console.log({message, selectedId});
        if(message !== '') {
            console.log('emit');
            console.log({to: selectedId, from: +sessionStorage.getItem('id'), msg: message})
            console.log('socket is', socket)
            socket?.emit(
                'send_msg',
                {to: selectedId, from: +sessionStorage.getItem('id'), msg: message}
            )
            console.log('emited');
            setMessage('')
            setMessages(prev => [...prev, {from: +sessionStorage.getItem('id'), to: selectedId, msg: message}])
            // socket.emit('send_message', {room, message})
        }
        // socket.emit('send_message', {
        //     to: 1,
        //     msg: message
        // })
        // console.log('message sent')
        // setMessage('')
    }
    const test = () => {
        socket.emit('test', 'abc');
    }
  return (
    <div className={styles.container}>
        {(showMsg && <>
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
                    <Typography.Text strong>{selectedName}</Typography.Text>
                    <Typography.Text>Online</Typography.Text>
                </div>
            </div>
            <div className={styles.userCol2}>
                <FontAwesomeIcon className={`${styles.callIcon} ${styles.icon}`} icon={faPhone} />
                <FontAwesomeIcon onClick={() => test()} className={`${styles.videoCallIcon} ${styles.icon}`} icon={faVideoCamera} />
                <FontAwesomeIcon className={`${styles.optionsIcon} ${styles.icon}`} icon={faEllipsisV} />
            </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.messages}>
            {messages.map((msg, index) => {
                if(msg.fromId === +sessionStorage.getItem('id')) {
                    return (
                        <div className={`${styles.msgContainerSent}`} key={index}>
                            <div className={`${styles.messageBubble}`}>
                                <Typography.Text>{msg.msg}</Typography.Text>
                            </div>
                            <Typography.Text className={styles.time}>10:00 am</Typography.Text>
                        </div>
                    )
                } else {
                    return (
                        <div className={`${styles.msgContainerSent}`}>
                            <div className={`${styles.messageBubble}`}>
                                <Typography.Text>{msg?.msg}</Typography.Text>
                            </div>
                            <Typography.Text className={styles.time}>10:00 am</Typography.Text>
                        </div>
                    )
                }
            })}
            {/* recieved message */}
            {/* <div className={`${styles.msgContainerRecieved}`}>
                <div className={`${styles.messageBubble}`}>
                    <Typography.Text>Hey there</Typography.Text>
                </div>
                <Typography.Text>10:00 am</Typography.Text>
            </div> */}
            
            {/* sent message */}
            {/* <div className={`${styles.msgContainerSent}`}>
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
            </div> */}
        </div>
        <div className={styles.input}>
            <MessageInput
                onSubmit={onSubmit}
                message={message}
                setMessage={setMessage}
            />
        </div>
        </>)}
    </div>
  )
}

export default Message