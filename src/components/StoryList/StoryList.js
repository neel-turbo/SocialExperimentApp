import React from 'react'
import Story from '../Story'
import {Row, Spin, Col} from 'antd';
import { useSelector } from 'react-redux';

const StoryList = ({setSelectedId}) => {
  const stories = useSelector((state)=>state.stories);
  console.log(stories)

  return !stories.length ?
  <div style={{textAlign:'center'}}>
    <Spin size="large"/>
  </div>:
   (
    <Row gutter={[48,32]}>
       {stories.map((story)=>{
        return(
          <Col key={story._id} lg={24} xl={12} xxl={8}>
            <Story storyData={story} setSelectedId={setSelectedId} />
          </Col>
        )
       })

       }
    </Row>
  )
}

export default StoryList