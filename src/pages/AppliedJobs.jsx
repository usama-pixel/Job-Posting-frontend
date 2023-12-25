import React, { useEffect, useState } from 'react'
import styles from './styles/applied-jobs.module.scss'
import { getFetch } from '../lib/fetch'

function AppliedJobs() {
    const [jobs, setJobs] = useState([])
    const myId = sessionStorage.getItem('id')
    useEffect(() => {
      console.log('check')
      getFetch('/applied-job', `myId=${myId}`)
      .then(res => res.json())
      .then(res => {
        setJobs(prev => {
          res.data.map(job => console.log(({...job.job, jobId: job.jobId})))
          return res.data.map(job => ({...job.job, jobId: job.jobId}))
        })
      })
      .catch(err => console.log(err))
      console.log('end check')
    },[])
    const cardColors = [
      '#cfa8e9', '#ecabd9', '#fcb3c9', '#ffbebf', '#ffccbc', '#ffcbbe', '#ffcac1', '#ffc9c3', '#fbbcd0', '#e6b6e4', '#bbb6f6', '#75bafb'
    ]
  return (
    <div className={styles.container}>
        {
          jobs.map((job, i) => (
            <div
              className={styles.jobContainer}
              key={job.jobId}
              style={{
                backgroundColor: cardColors[(i + 1) % cardColors.length]
              }}
            >
              <p>{job.position}</p>
              <p>{job.company_name}</p>
            </div>
          ))
        }
    </div>
  )
}

export default AppliedJobs