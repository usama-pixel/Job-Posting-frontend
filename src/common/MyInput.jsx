import { Input } from 'antd'
import React from 'react'
import './my-input.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const MyInput = ({icon, value, setValue, placeholder}) => {
  return (
    <div>
      <span className='my-input-container'>
        <Input
          className='my-input'
          size="large"
          placeholder={placeholder}
          prefix={<FontAwesomeIcon icon={icon} style={{marginRight: '10px', marginLeft: '10px'}} />}
          value={value}
          onChange={e => setValue(e.target.value)}
          allowClear= {{clearIcon: <FontAwesomeIcon style={{color: 'white'}} icon={faXmarkCircle} />}}
        />
      </span>
    </div>
  )
}

export default MyInput