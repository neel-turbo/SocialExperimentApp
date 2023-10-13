import React,{ useEffect } from 'react'

import {Card, Form, Input, Typography, Button} from 'antd'
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {createStory, updateStory} from '../../actions/stories'
import { Link } from 'react-router-dom';
import styles from './styles';

const {Title} = Typography

const StoryForm = ({selectedId, setSelectedId})=> {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const story = useSelector((state)=> selectedId ?  state.stories.find(story => story._id === selectedId): null);

  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.username;

  const onSubmit = (formData) =>{
    // console.log(formData);
    selectedId ? 
    dispatch(updateStory(selectedId, {...formData, username}))
    :
    dispatch(createStory({...formData, username}));

    reset();
  }

  useEffect(() => {
    if(story){
      form.setFieldsValue(story);
    }
  }, [story,form])

  const reset = () =>{
    form.resetFields();
    setSelectedId(null);
  }


  if(!user){
    return(
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>
            Welcome to Social Experiment
          </span> <br/> <br/>
          Please <Link to="/authform">login</Link> or {" "}
          <Link to="/authform">register</Link> for sharing instant moment or ideas.
        </Title>
      </Card>
    )
  }
  

  return (
    <Card 
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Editing" : "Share"} a story
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{span:6}}
        wrapperCol={{span:16}}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
      >
       

        <Form.Item name="caption" label="Caption" rules={[{ required:true}]}>
          <Input.TextArea allowClear autoSize={{minRows:2, maxRows:6}}/>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Input.TextArea allowClear autoSize={{minRows:2, maxRows:6}}/>
        </Form.Item>

        <Form.Item name="image" label="Image" rules={[{ required:true}]}>
          <FileBase64
            type="file"
            mutiple={false}
            onDone={(e)=>{
              form.setFieldsValue({
                image: e.base64
              })
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span:16,
            offset:6
          }}
        >
          <Button
            type='primary'
            block
            htmlType='submit'
          >
            Share
          </Button>
        </Form.Item>
        {!selectedId ? null :
        
        <Form.Item
          wrapperCol={{
            span:16,
            offset:6
          }}
        >
          <Button
            type='primary'
            block
            htmlType='button'
            danger
            onClick={reset}
          >
            Discard
          </Button>
        </Form.Item>
        }
        
        

      </Form>

    </Card>
  )
}

export default StoryForm