import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Form, Input, Button, Card, Layout, Typography} from 'antd'
import styles from './styles';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {logIn, signUp} from '../../actions/authentication';
const {Title} = Typography;

function AuthForm() {
    const user = null;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = (formValues) =>{
        if(isLogin){
            dispatch(logIn(formValues, navigate));
        } else {
            dispatch(signUp(formValues, navigate));
        }
    }

    const switchMode = () =>{
        setIsLogin(prevIsLogin => !prevIsLogin)
    }


  return (    
    <Layout style={styles.container}>
        <Card 
            style={styles.card}
            title={
                <Title level={4} style={{textAlign:'center'}}>
                    {isLogin ? "Login to" : "Join" } Social Experiment
                </Title>
            }
        >
            <Form
                name='authform'
                form={form}
                size="large"
                wrapperCol={{ span:20, offset:2}}
                onFinish={onSubmit}
            >
                {isLogin || (
                    <>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter username"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="username"/>
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter valid email address"
                        }
                    ]}
                >
                    <Input type="email" prefix={<MailOutlined/>} placeholder="email address"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password"
                        }
                    ]}
                >
                    <Input.Password type="password"  prefix={<LockOutlined/>} placeholder="password"/>
                </Form.Item>

                {isLogin || (
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please re-enter your password"
                            }
                        ]}
                    >
                        <Input.Password type="password"  prefix={<LockOutlined/>} placeholder="confirm password"/>
                    </Form.Item>
                )}

                <Form.Item>
                    <Button htmlType='submit' typeof='primary'>
                        {isLogin ? "Login": "Join"}
                    </Button>
                    <span style={{margin:"0 10px 0 20px"}} >Or</span>
                    <Button type='link' onClick={switchMode}>
                        {isLogin? "Register Now": "have an account ?"}
                    </Button>
                </Form.Item>


            </Form>
    
        </Card>
    </Layout>
  )
}

export default AuthForm