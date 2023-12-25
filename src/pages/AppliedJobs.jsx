import React, { useEffect, useState } from 'react'
import styles from './styles/applied-jobs.module.scss'
import { getFetch } from '../lib/fetch'

function AppliedJobs() {
    const [jobs, setJobs] = useState([])
    const myId = sessionStorage.getItem('id')
    useEffect(() => {
      console.log('check')
      getFetch('/job', `myId=${myId}`)
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
    // useEffect(() => {
    //     getFetch('/job', `myId=${myid}`)
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log({jj: res})
    //       // setJobs(res)
    //     })
    //     .catch(err => console.log(err))
    // }, [jobs])
  return (
    <div className={styles.container}>
        {
          jobs.map(job => (
            <div className={styles.jobContainer} key={job.jobId}>
              <p>{job.position}</p>
              <p>{job.company_name}</p>
            </div>
          ))
        }
    </div>
  )
}

export default AppliedJobs