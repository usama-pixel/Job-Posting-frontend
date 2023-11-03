import React from 'react'
import { useState } from 'react'
import {postFetch} from '../../../lib/fetch'
import MyInput from '../../../common/MyInput'
import { Image, Select, Typography } from 'antd'
import styles from '../style/create-form.module.scss'
import MyButton from '../../../common/MyButton'
import MySelect from '../../../common/MySelect'

function CreateForm() {
  const [position, setPosition] = useState('')
  const [date, setDate] = useState();
  const [companyName, setCompanyName] = useState('')
  const [tags, setTags] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [address, setAddress] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    postFetch('/job/create', {
      position,
      date,
      companyName,
      tags,
      hourlyRate,
      address
    })
  }

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <Typography.Title className={styles.title}>Post a Job</Typography.Title>
          <hr />
        </div>
        <Image
          className={styles.image}
          width={400}
          preview={false}
          src='https://assets.materialup.com/uploads/966e7e30-0faf-4a6c-8c3d-205bb27fb485/preview.jpg'
        />
        <Typography.Paragraph>Lorem Ipsum</Typography.Paragraph>
      </div>
      <hr className={styles.line} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <MyInput value={position} setValue={setPosition} placeholder={'Postition/Title'} />
        <MyInput value={date} setValue={setDate} placeholder={'Date'} />
        <MyInput value={companyName} setValue={setCompanyName} placeholder={'Company Name'} />
        <MySelect options={options} />
        {/* <MyInput value={tags} setValue={setTags} placeholder={'Tags'} /> */}
        {/* <MySelect handleChange={handleChange} options={options} /> */}
        {/* <div style={{border: '1px solid red'}}> */}
        {/* </div> */}
        {/* <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          options={options}
        /> */}
        <MyInput value={hourlyRate} setValue={setHourlyRate} placeholder={'Hourly Rate'} />
        <MyInput value={address} setValue={setAddress} placeholder={'Address'} />
        <MyButton text={'Submit'} onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default CreateForm