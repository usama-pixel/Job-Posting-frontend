import React from 'react'
import styles from '../styles/sidebar.module.scss'
import { Checkbox, Typography } from 'antd'

function Sidebar() {
    const scheduleOptions = [
        {
            label: 'Full Time',
            value: 'fullTime',
        },
        {
            label: 'Part Time',
            value: 'partTime'
        },
        {
            label: 'Internship',
            value: 'internship'
        },
        {
            label: 'Project Work',
            value: 'projectWork'
        },
    ]
    const employmentTypeOptions = [
        {
            label: 'Full Day',
            value: 'fullDay'
        },
        {
            label: 'Flexible Schedule',
            value: 'flexibleSchedule'
        },
        {
            label: 'Shift Work',
            value: 'shiftWork'
        },
        {
            label: 'Remote Work',
            value: 'remoteWork'
        }
    ]
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
      };
    return (
        <div style={{display: 'flex'}}>
            <div className={styles.container}>
            {/* Card */}
                <div className={styles.card}>
                    <Typography.Paragraph className={[styles.cardText, styles.textLg]}>Pursue Your Passion with JobHarbor</Typography.Paragraph>
                </div>
                <div className={styles.filters}>
                    <Typography.Paragraph className={styles.textLg}>Filters</Typography.Paragraph>

                    <Typography.Paragraph className={[styles.secondaryText, styles.bold]}>Working schedule</Typography.Paragraph>
                    <Checkbox.Group
                        style={{display: 'flex', flexDirection: 'column', marginBottom: '20px'}}
                        options={scheduleOptions}
                        defaultValue={['fullTime']}
                        onChange={onChange}
                    />
                    
                    <Typography.Paragraph className={[styles.secondaryText, styles.bold]}>Employement Type</Typography.Paragraph>
                    <Checkbox.Group
                        style={{display: 'flex', flexDirection: 'column'}}
                        options={employmentTypeOptions}
                        defaultValue={['Apple']}
                        onChange={onChange}
                    />
                </div>
            </div>
            <hr className={styles.line} />
        </div>
    )
}

export default Sidebar