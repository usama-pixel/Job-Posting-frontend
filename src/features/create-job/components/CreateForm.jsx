import React, { useEffect } from 'react'
import { useState } from 'react'
import {getFetch, postFetch} from '../../../lib/fetch'
import MyInput from '../../../common/MyInput'
import { Button, DatePicker, Image, Select, Steps, Typography } from 'antd'
import styles from '../style/create-form.module.scss'
import MySelect from '../../../common/MySelect'
import MyTag from '../../../common/MyTag'

function CreateForm() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    position: '',
    companyName: '',
    hourlyRate: null,
    address: '',
    selectedSchedule: null,
    selectedEmptType: null,
    selectedCountry: null,
    selectedExpLevel:  null,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  useEffect(() => {
    console.log({formData})
  }, [formData])
  const [schedules, setSchedules] = useState([])
  const [empTypes, setEmptTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [expLevel, setExpLevel] = useState([]);
  
  useEffect(() => {
    const schedulePromise = getFetch('/schedule')
    .then(res => res.json())
    .then(res => {
      setSchedules(res?.data)
      console.log({schedules: res?.data});
    })

    const empTypePromise = getFetch('/employment-types')
    .then(res => res.json())
    .then(res => {
      setEmptTypes(res?.data)
    })
    .catch(err => console.log(err))

    const countries = getFetch('/countries')
    .then(res => res.json())
    .then(res => {
      setCountries(res?.data)
    })
    .catch(err => console.log(err))

    const exp = getFetch('/exp')
    .then(res => res.json())
    .then(res => {
      setExpLevel(res?.data)
    })
    .catch(err => console.log(err))

    Promise.allSettled([schedulePromise, empTypePromise, countries, exp])
    .then(res => {
      const successfulJobs = res.filter(res => res.status === 'fulfilled').map(res => res.value)
      const failedJobs = res.filter(res => res.status === 'rejected').map(res => res.reason)
      console.log('Successful jobs: ', successfulJobs);
      console.log('failed jobs: ', failedJobs);
    })
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    postFetch('/job/create', {
      position: formData.position,
      companyName: formData.companyName,
      tags: selectedTags,
      hourlyRate: formData.hourlyRate,
      address: formData.address,
      empTypeId: formData.selectedEmptType,
      scheduleId: formData.selectedSchedule,
      countryId: formData.selectedCountry,
      expId: formData.selectedExpLevel,
    })
    .then(res => res.json())
    .then(res => console.log({res}))
    .catch(err => console.log('err'))
  }
  const steps = [
    {
      title: 'Form',
      content: <>
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
        <form className={styles.form}>
          <MyInput
            value={formData.position}
            setValue={(value) => handleInputChange('position', value)}
            placeholder={'Position/Title'}
          />
          <MyInput
            value={formData.companyName}
            setValue={(value) => handleInputChange('companyName', value)}
            placeholder={'Company Name'}
          />
          <MyInput
            value={formData.hourlyRate}
            setValue={value => handleInputChange('hourlyRate', value)}
            placeholder={'Hourly Rate'}
          />
          <MyInput
            value={formData.address}
            setValue={value => handleInputChange('address', value)}
            placeholder={'Address'}
          />
          <MySelect
            options={schedules}
            onSelect={(id) => handleInputChange('selectedSchedule', id)}
            placeholder='Schedule'
          />
          <MySelect
            options={countries}
            onSelect={(id) => handleInputChange('selectedCountry', id)}
            placeholder='Country'
          />
          <MySelect
            options={empTypes}
            onSelect={(id) => handleInputChange('selectedEmptType', id)}
            placeholder='Employment Type'
          />
          <MySelect
            options={expLevel}
            onSelect={(id) => handleInputChange('selectedExpLevel', id)}
            placeholder='Experience Level'
          />
        </form>
      </>,
    },
    {
      title: 'Tags',
      content: (
        <div className={styles.left} style={{width: '100%', userSelect: 'none'}}>
          <div className={styles.heading} style={{width: 'fit-content', marginLeft: 'auto', marginRight: 'auto',}}>
            <Typography.Title className={styles.title}>Select Tags (one or more)</Typography.Title>
          </div>
          <div style={{maxWidth: '80%'}}>
            <MyTag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </div>
        </div>
      ),
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className={styles.container}>
      <div style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
        <Steps current={current} items={items} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '30px'
        }}
      >{steps[current].content}</div>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          marginTop: 24,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  )
}

export default CreateForm