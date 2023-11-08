import React, { useState } from 'react'
import { Avatar, Button, Card, Image, Skeleton, Space, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/card.scss'

const {Meta} = Card

function MyCard({date, companyName, position, icon, tags, hourlyRate, address, backgroundColor}) {
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
      setLoading(!checked);
    };
    const CardHeader = (
        <div className='my-card-header'>
            <div className='date'>20 May 2023</div>
            <div className='bookmark'><FontAwesomeIcon icon={faBookmark} /></div>
        </div>
    )
    return (
        <div className='my-card'>
            <div className='content' style={{background: backgroundColor}}>
                <div className='my-card-header'>
                    <Typography.Paragraph className='date'>{date}</Typography.Paragraph>
                    <Typography.Paragraph className='bookmark'><FontAwesomeIcon icon={faBookmark} /></Typography.Paragraph>
                </div>
                <Typography.Paragraph className='company-name'>{companyName}</Typography.Paragraph>
                <div className='position'>
                    <Typography.Text>{position}</Typography.Text>
                    <Avatar src={icon} />
                </div>
                <Space size={[0, 8]} wrap className='tags'>
                    {tags.map((tag, indx) => (
                        <Tag key={indx} color="processing" className='tag'>{tag}</Tag>
                    ))}
                </Space>
            </div>
            <div className='my-card-footer'>
                <span>
                    <Typography.Paragraph className='hour-rate'>${hourlyRate}/hr</Typography.Paragraph>
                    <Typography.Paragraph className='address'>{address}</Typography.Paragraph>
                </span>
                <Button className='btn'>Details</Button>
            </div>
        </div>
    )
}

export default MyCard