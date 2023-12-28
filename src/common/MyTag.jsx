import React, { useEffect, useState } from 'react';
import { Space, Tag } from 'antd';
import { getFetch } from '../lib/fetch';
import Cookies from 'js-cookie';
const { CheckableTag } = Tag;

const MyTag = ({ selectedTags, setSelectedTags }) => {
  const token = Cookies.get('token')
  const [tagsData, setTagsData] = useState([])
  useEffect(() => {
    getFetch('/tags', undefined)
    .then(res => res.json())
    .then(res => {
      if(res?.data == undefined) alert('tags are undefined')
      const transformData = res?.data?.map(tag => tag?.name)
      // console.log(res?.data);
      setTagsData(transformData)
    })
    .catch(err => console.log(err))
  }, [])
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <>
      <Space size={[0, 8]} wrap>
        {tagsData?.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
    </>
  );
};
export default MyTag;