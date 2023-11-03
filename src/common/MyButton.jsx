import React, { useState } from 'react'
import styles from './my-button.module.scss'

function MyButton({text, onClick}) {
    
  return (
    <div>
        <a
          className={styles.btn}
          onClick={onClick}
        >{text}</a>
    </div>
  )
}

export default MyButton