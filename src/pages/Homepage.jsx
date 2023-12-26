import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Pagination, Space, Tag, Typography, Slider } from 'antd'
import { faCalendar, faLocationDot, faSearch, faSuitcase, } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import MyInput from '../common/MyInput';
import { MyCard, Sidebar } from '../features/jobs-listing'
import { getFetch, postFetch } from '../lib/fetch';
import styles from './styles/homepage.module.scss'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'

function Homepage({socket}) {
  const [current, setCurrent] = useState(1);
  const [jobCount, setJobCount] = useState(0);
  const [jobs, setJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [search, setSearch] = useState('');
  const [lowerSalary, setLowerSalary] = useState(30);
  const [upperSalary, setUpperSalary] = useState(60);
  const [lower, setLower] = useState(0)
  const [upper, setUpper] = useState(0)
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState([])
  const [type, setType] = useState([])
  const [countries, setCountries] = useState([])
  const [experience, setExperience] = useState('')
  const [expList, setExpList] = useState([])
  const myId = sessionStorage.getItem('id')
  const navigate = useNavigate()
  const token = Cookies.get('token')

  const onChange = (page) => {
    setCurrent(page);
  };
  const convertDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date(date)
    const day = newDate.getDate();
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`
    return formattedDate;
  }

  useEffect(() => {
    if(!socket)
    socket = io('https://my-job-695ce6312b95.herokuapp.com:8080')
  }, [])
  
  useEffect(() => {
    if(!socket) {console.log('socket not ');}
    else {
      console.log('socket is ', socket);
      socket.connect()
    }

    const fetchJobs = postFetch(
      `/jobs?page=${current}`,
      {
        lower,
        upper,
        search,
        location,
        experience,
        schedule,
        empType: type
    })
    .then(res => res.json())
    .then(res => {
      const data = res?.data?.map(job => {
        // console.log({ job });
        const formatedData = { ...job, date: convertDate(job.date) };
        return formatedData;
      });
      setJobs(data)
      return data;
    })
    .catch(err => {
      console.log(err);
      return err; // return the error so it's still part of the result
    });
    
    const fetchJobsTotal = getFetch('/job-count', undefined)
    .then(res => res.json())
    .then(res => {
      setJobCount(res.data)
      return res;
    })
    .catch(err => {
      console.log(err);
      return err; // return the error so it's still part of the result
    });

    const appliedJobs = getFetch('/applied-job', `myId=${myId}`)
    .then(res => res.json())
    .then(res => {
      console.log('applied', res)
      setAppliedJobs(prev => {
        return res.data.map(job => ({id: job.jobId}))
        // return res.data.map(job => ({...job.job, jobId: job.jobId}))
      })
    })
    .catch(err => console.log(err));

    const countriesPromise = getFetch('/countries', undefined)
    .then(res => res.json())
    .then(res => {
      setCountries(res?.data)
    })
    .catch(err => {
      console.log(err)
      return err
    });

    const expPromise = getFetch('/exp', undefined)
    .then(res => res.json())
    .then(res => {
      setExpList(res?.data)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
    Promise.allSettled([fetchJobs, fetchJobsTotal, appliedJobs, countriesPromise])
    .then(results => {
      const successfulJobs = results.filter(result => result.status === 'fulfilled').map(result => result.value);
      const failedJobs = results.filter(result => result.status === 'rejected').map(result => result.reason);
      console.log('Successful Jobs:', successfulJobs);
      console.log('Failed Jobs:', failedJobs);
    });
  }, [current, lower, upper, search, location, schedule, type, experience])

  const cardColors = [
   '#cfa8e9', '#ecabd9', '#fcb3c9', '#ffbebf', '#ffccbc', '#ffcbbe', '#ffcac1', '#ffc9c3', '#fbbcd0', '#e6b6e4', '#bbb6f6', '#75bafb'
  ]
  return (
    <>
    <div className={styles.findJob}>
      <div className={styles.option} style={{paddingTop: '15px'}}>
          <MyInput
            icon={faSearch}
            placeholder={'Job Title'}
            value={search}
            setValue={setSearch}
          />
      </div>
      <hr className={styles.line} />
      <div className={styles.option}>
          <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '12px', paddingRight: '12px', borderRadius: '40px'}}>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <select
            className={styles.mySelect}
            onChange={e => {setLocation(e.target.value)}}
            value={location}
          >
            {countries?.map((country, indx) => (
              <option key={indx}>{country?.name}</option>
            ))}
          </select>
      </div>
      <hr className={styles.line} />
      <div className={styles.option}>
        <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '40px'}}>
          <FontAwesomeIcon icon={faSuitcase} />
        </span>
        <select
          className={styles.mySelect}
          onChange={e => setExperience(e.target.value)}
          value={experience}
        >
          <option>Entry Level</option>
          {expList?.map((e, indx) => (
            <option key={indx}>{e?.name}</option>
          ))}
        </select>
      </div>
      <hr className={styles.line} />
      <div className={styles.option}>
        <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '40px'}}>
          <FontAwesomeIcon icon={faCalendar} />
        </span>
        <select className={styles.mySelect}>
          <option>Per Hour</option>
          <option>Per Week</option>
          <option>Per Month</option>
          <option>Per Year</option>
        </select>
      </div>
      <hr className={styles.line} />
      <div className={styles.slider}>
        <Typography.Text style={{color: 'white'}}>Salary Range ${lowerSalary} - ${upperSalary}</Typography.Text>
        <Slider
          range
          // onAfterChange={sliderChange}
          onAfterChange={([lowerTemp, upperTemp]) => {
            setLower(lowerTemp)
            setUpper(upperTemp)
          }}
          defaultValue={[lowerSalary, upperSalary]}
          onChange={e => {
            if(!e) return;
            setLowerSalary(e[0])
            setUpperSalary(e[1])
          }}
          styles={{
              rail: {
                background: 'white'
              }
          }}
        />
      </div>
  </div>
    <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
      <Sidebar setSchedule={setSchedule} setType={setType} />
      <div style={{overflowY: 'auto', width: '100%', padding: '0 20px'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography.Title>Recommended Jobs</Typography.Title>
          <Tag color="cyan" style={{marginLeft: "10px", marginTop: '-10px', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px', }}>{jobCount}</Tag>
        </div>
        <Space
          direction="horizontal"
          size={16}
          wrap
        >
          {jobs?.map((job, indx) => {
            console.log({jobId: job.id, appliedJobs})
            console.log(job.id in appliedJobs)
            return (
            <MyCard
              key={indx}
              date={job.date}
              applied={appliedJobs.find(appliedJob => appliedJob.id === job.id)}
              // applied={job.id in appliedJobs ? true: false}
              jobId={job?.id}
              address={job.address}
              companyName={job.company_name}
              hourlyRate={job.hourly_rate}
              icon={job.icon}
              position={job.position}
              backgroundColor={cardColors[(indx + 1) % cardColors.length]}
            />
          )})}
        </Space>
        <Pagination
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', width: 'fit-content'}}
          defaultCurrent={current}
          total={jobCount}
          onChange={onChange}
        />
      </div>
    </div>
    </>
  )
}

export default Homepage