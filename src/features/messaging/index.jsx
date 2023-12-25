import React, { useEffect, useState } from 'react'
import Contact from './components/Contacts'
import Message from './components/Message'
import styles from './styles/index.module.scss'
import { getFetch } from '../../lib/fetch'

function index({ socket }) {
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [selectedName, setSelectedName] = useState('')
  const [showMsg, setShowMsg] = useState(false)
  useEffect(() => {
    // debugger
    getFetch('/users', `id=${sessionStorage.getItem('id')}`)
    .then(res => res.json())
    .then(res => {
      if(res?.status === 200)
      console.log({res})
      setUsers(res.data.map(user => user))
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className={styles.container}>
        <Contact
          socket={socket}
          users={users}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setShowMsg={setShowMsg}
          setSelectedName={setSelectedName}
        />
        <Message
          socket={socket}
          selectedId={selectedId}
          showMsg={showMsg}
          selectedName={selectedName}
        />
    </div>
  )
}

export default index