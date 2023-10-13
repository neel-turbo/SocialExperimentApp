import React, {useState} from 'react'
import moment from 'moment';
import { useDispatch,  } from 'react-redux';
import {deleteStory, likeStory} from '../../actions/stories'

import {Card, Tooltip, Typography, Image} from 'antd';
import {EditOutlined, DeleteTwoTone, HeartTwoTone} from '@ant-design/icons'
import styles from './styles';

const {Meta} = Card;
const {Link, Paragraph, Text} = Typography;

const Story = ({storyData, setSelectedId }) => {

  // console.log(storyData);
  const dispatch = useDispatch();

  const [expand, setExapnd] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  const cardActions = [
    <div style={styles.actions}>
      <Tooltip
        placement='top'
        title="Like"
        color="magenta"
        onClick={()=>{ dispatch(likeStory(storyData._id))}}
      >
        <HeartTwoTone twoToneColor="magenta"/>
        &nbsp; {storyData.likes.length} &nbsp;
      </Tooltip>
    </div>,

    <Tooltip
       placement='top'
       title="Edit"
    >
      <EditOutlined onClick={() => {
        setSelectedId(storyData._id);
      }}/>
    </Tooltip>,
    <Tooltip
       placement='top'
       title="Delete"
       color="red"       
    >
      <DeleteTwoTone twoToneColor="red" onClick={()=> dispatch(deleteStory(storyData._id))}/>
    </Tooltip>
  ]

  return (
    <Card 
      style={styles.card}
      cover={<Image src={storyData.image} />}
      actions={
        user?.result._id ===storyData?.userId ?
        cardActions :
        user?.result ?
        cardActions.slice(0,1)
        : null
      }
    >
      <Meta title={storyData.username}/>
      <Paragraph
        style={{margin:0}}
        ellipsis={{
          rows:2,
          expandable:true,
          symbol:"more",
          onExpand: ()=>{
            setExapnd(true);
          },
          onEllipsis:()=>{
            setExapnd(false);
          }
        }}
      >
        {storyData.caption}
      </Paragraph>
      {expand?
        <Link href='#'>{storyData.tags.split(" ").map((tag)=> `#${tag}`)}</Link>
        :
        null
      }
      <br/>
      <Text type='secondary'>{moment(storyData.postDate).fromNow()}</Text>

    </Card>
  )
}

export default Story