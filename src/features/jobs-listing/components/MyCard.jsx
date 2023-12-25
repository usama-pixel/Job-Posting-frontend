import React, { useState } from 'react'
import { Avatar, Button, Card, Modal, Space, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/card.module.scss';
import { postFetch } from '../../../lib/fetch';

const {Meta} = Card
const { confirm } = Modal
function MyCard({date, companyName, position, icon, tags, hourlyRate, address, backgroundColor, jobId, applied}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showPromiseConfirm = () => {
        confirm({
            title: 'Job Details',
            content: 'aba abc abc',
            async onOk() {
                const myId = sessionStorage.getItem('id')
                return postFetch('/job/apply', {myId, jobId})
                .then(res => res.json)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            },
            onCancel() {}
        })
    }
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
      setLoading(!checked);
    };
    const CardHeader = (
        <div className={styles.myCardHeader}>
            <div className={styles.date}>20 May 2023</div>
            <div className={styles.bookmark}><FontAwesomeIcon icon={faBookmark} /></div>
        </div>
    )
    return (
        <div className={styles.myCard}>
            {
            applied &&
            <div className={styles.applied}>
                applied
            </div>
            }
            <div className={styles.content} style={{background: backgroundColor}}>
                <div className={styles.myCardHeader}>
                    <Typography.Paragraph className={styles.date}>{date}</Typography.Paragraph>
                    <Typography.Paragraph className={styles.bookmark}><FontAwesomeIcon icon={faBookmark} /></Typography.Paragraph>
                </div>
                <Typography.Paragraph className={styles.companyName}>{companyName}</Typography.Paragraph>
                <div className={styles.position}>
                    <Typography.Text>{position}</Typography.Text>
                    <Avatar src={icon} />
                </div>
                <Space size={[0, 8]} wrap className={styles.tags}>
                    {tags?.map((tag, indx) => (
                        <Tag key={indx} color="processing" className={styles.tag}>{tag}</Tag>
                    ))}
                </Space>
            </div>
            <div className={styles.myCardFooter}>
                <span>
                    <Typography.Paragraph className={styles.hourRate}>${hourlyRate}/hr</Typography.Paragraph>
                    <Typography.Paragraph className={styles.address}>{address}</Typography.Paragraph>
                </span>
                <Button
                    onClick={showPromiseConfirm}
                    className={styles.btn}>
                    Details
                </Button>
            </div>
        </div>
    )
}

export default MyCard