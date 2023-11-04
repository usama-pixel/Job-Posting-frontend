import React from 'react'
import Contact from './components/Contacts'
import Message from './components/Message'
import styles from './styles/index.module.scss'

function index() {
  return (
    <div className={styles.container}>
        <Contact />
        <Message />
    </div>
  )
}

export default index