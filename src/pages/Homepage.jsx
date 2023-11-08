import React, { useEffect, useState } from 'react'
import { MyCard, Sidebar } from '../features/jobs-listing'
import { Badge, Pagination, Space, Tag, Typography, Slider } from 'antd'
import { getFetch, postFetch } from '../lib/fetch';
import styles from './styles/homepage.module.scss'
import { faCalendar, faLocationDot, faSearch, faSuitcase, } from '@fortawesome/free-solid-svg-icons';
import MyInput from '../common/MyInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Homepage() {
  const [current, setCurrent] = useState(1);
  const [jobCount, setJobCount] = useState(0);
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('');
  const [lowerSalary, setLowerSalary] = useState(30);
  const [upperSalary, setUpperSalary] = useState(60);
  const [lower, setLower] = useState(0)
  const [upper, setUpper] = useState(0)
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState([])
  const [type, setType] = useState([])

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
    const fetchJobs = postFetch(
      `/jobs?page=${current}`,
      {
        lower,
        upper,
        search,
        location,
        schedule,
        empType: type
    })
    .then(res => res.json())
    .then(res => {
      const data = res?.data?.map(job => {
        console.log({ job });
        const formatedData = { ...job, date: convertDate(job.date) };
        return formatedData;
      });
      setJobs(data)
      return data;
    })
    .catch(err => {
      console.log({ err });
      return err; // return the error so it's still part of the result
    });

    const fetchJobsTotal = getFetch('/job-count')
    .then(res => res.json())
    .then(res => {
      setJobCount(res.data)
      return res;
    })
    .catch(err => {
      console.log(err);
      return err; // return the error so it's still part of the result
    });

    Promise.allSettled([fetchJobs, fetchJobsTotal])
    .then(results => {
      // Handle the results here
      const successfulJobs = results.filter(result => result.status === 'fulfilled').map(result => result.value);
      const failedJobs = results.filter(result => result.status === 'rejected').map(result => result.reason);

      // Do something with successfulJobs and failedJobs
      console.log('Successful Jobs:', successfulJobs);
      console.log('Failed Jobs:', failedJobs);
    });
  }, [current, lower, upper, search, location, schedule, type])

  // const sliderChange = ([lower, upper]) => {
  //   console.log({lower, upper});
  //   getFetch(`/jobs?page=${current}&lower=${lower}&upper=${upper}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     setJobs(res?.data)
  //   })
  //   .catch(err => console.log(err))
  // } 

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
              <option>California</option>
              <option>Boston</option>
              <option>Los Vegas</option>
          </select>
      </div>
      <hr className={styles.line} />
      <div className={styles.option}>
        <span style={{border: '1px solid white', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '40px'}}>
          <FontAwesomeIcon icon={faSuitcase} />
        </span>
        <select className={styles.mySelect}>
          <option>Entry Level</option>
          <option>1-2 Years</option>
          <option>3-5 Years</option>
          <option>5-8 Years</option>
          <option>8+ Years</option>
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
          {jobs?.map((job, indx) => (
            <MyCard
              key={indx}
              date={job.date}
              address={job.address}
              companyName={job.company_name}
              hourlyRate={job.hourly_rate}
              icon={job.icon}
              position={job.position}
              tags={[...job.tags]}
              backgroundColor={cardColors[(indx + 1) % cardColors.length]}
            />
          ))}
        </Space>
        <Pagination
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', width: 'fit-content'}}
          defaultCurrent={current}
          total={50}
          onChange={onChange}
        />
      </div>
    </div>
    </>
  )
}

export default Homepage