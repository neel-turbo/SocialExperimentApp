import React,{ useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './styles';
import {Layout, Image, Typography, Button, Avatar} from "antd";
import Logo from '../../images/logo.jpeg';

import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionType";
import decode from 'jwt-decode';

const {Title} = Typography;
const {Header } = Layout;

function AppBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate("/authform"); // redirect to login page
        setUser(null);
    }
    
    return (
        <Header style={styles.header}>
            <Link to="/">
                <div style={styles.homeLink}>
                    <Image style={styles.image} width={45} preview={false} src={Logo} />
                    &nbsp;
                    <Title style={styles.title}>Social Experiment</Title>
                </div>
            </Link>
            {!user ?(
                <Link to="/authform">
                    <Button htmlType='button'  style={styles.login}>
                        Login
                    </Button>
                </Link>
            ):(
                <div style={styles.userInfo}>
                    <Avatar style={styles.avatar} alt="username" size="large">
                        {user?.result?.username?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Title style={styles.title} level={4}> 
                    &nbsp;{user?.result?.username}&nbsp;
                    </Title>
                    <Button onClick={logout} htmlType='button'>
                        Log Out
                    </Button>
                </div>
            )}
        </Header>
    )
}

export default AppBar