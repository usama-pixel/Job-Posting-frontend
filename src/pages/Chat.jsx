import React from 'react'
import Messaging from '../features/messaging/index'
const Chat = ({ socket }) => {
  return (
    <div>
      <Messaging socket={socket} />
    </div>
  )
}

export default Chat