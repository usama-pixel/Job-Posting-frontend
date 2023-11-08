import React from 'react'
import styles from '../styles/sidebar.module.scss'
import { Checkbox, Typography } from 'antd'

function Sidebar({setSchedule, setType}) {
    const scheduleOptions = [
        {
            label: 'Full Time',
            value: 'FULL_TIME',
        },
        {
            label: 'Part Time',
            value: 'PART_TIME'
        },
        {
            label: 'Internship',
            value: 'INTERNSHIP'
        },
        {
            label: 'Project Work',
            value: 'PROJECT_WORK'
        },
    ]
    const employmentTypeOptions = [
        {
            label: 'Full Day',
            value: 'FULL_DAY'
        },
        {
            label: 'Flexible Schedule',
            value: 'FLEXIBLE'
        },
        {
            label: 'Shift Work',
            value: 'SHIFT_WORK'
        },
        {
            label: 'Remote Work',
            value: 'REMOTE'
        }
    ]
    
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
                        onChange={(checkedValues) => setSchedule(checkedValues)}
                    />
                    
                    <Typography.Paragraph className={[styles.secondaryText, styles.bold]}>Employement Type</Typography.Paragraph>
                    <Checkbox.Group
                        style={{display: 'flex', flexDirection: 'column'}}
                        options={employmentTypeOptions}
                        defaultValue={['Apple']}
                        onChange={(checkedValues) => setType(checkedValues)}
                    />
                </div>
            </div>
            <hr className={styles.line} />
        </div>
    )
}

export default Sidebar