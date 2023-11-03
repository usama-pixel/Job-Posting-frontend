import React from 'react'
import { MyCard } from '../features/jobs-listing'
import { Space } from 'antd'
import Sidebar from '../features/jobs-listing/components/Sidebar'

function Homepage() {
  return (
    <div style={{display: 'flex', flexDirection: 'row',}}>
    <Sidebar />
    <Space direction="horizontal" size={16} wrap>
      <MyCard 
        date={'20 May 2023'}
        address={'San Francisco'}
        companyName={'Google'}
        hourlyRate={'$200/hr'}
        icon={'https://assets.materialup.com/uploads/09d3769a-4b3b-46f1-a7c1-b1b8400f2111/preview.jpg'}
        position={'MERN Stack Developer'}
        tags={['Full time', 'React', 'Nodejs', 'Express', 'React Native', 'Android', 'Java', 'Javascript', 'C++']}
      />
      {/* <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard /> */}
    </Space>
    </div>
  )
}

export default Homepage