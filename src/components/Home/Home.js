import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import StoryList from '../StoryList';
import StoryForm from '../StoryForm';
import styles from './styles';
import {getStories} from '../../actions/stories';
import { Layout } from 'antd';

const {Sider, Content} = Layout

const Home =()=> {

 const [selectedId, setSelectedId] = useState(null);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories())
  }, [dispatch])
  

  return (
    <Layout>
        <Sider width={400} style={styles.sider}>
            <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
        </Sider>
        <Content style={styles.content}>
            <StoryList setSelectedId={setSelectedId}/>
        </Content>
    </Layout>
  )
}

export default Home;
