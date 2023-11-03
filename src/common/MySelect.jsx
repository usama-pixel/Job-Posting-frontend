import { Select } from 'antd'
import React from 'react'
import styles from './my-select.module.scss'

// MySelect.jsx
function MySelect({ options, handleChange }) {
  return (
    <div className={styles.mySelectDiv}>
      <Select
        mode="tags"
        className={styles.myInput}
        allowClear
        style={{
          width: '100%',
          borderRadius: '20px',
          flexWrap: 'wrap'
        }}
        placeholder="Select Tags"
        onChange={handleChange}
        options={options}
        // dropdownStyle={{background: 'black', color: 'white'}}
      />
    </div>
  )
}


export default MySelect