import * as api from '../api';
import {
    AUTHENTICATION
} from '../constants/actionType';


const signUp = (formValues, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signUp(formValues);
        dispatch({
            type:AUTHENTICATION,
            payload:data
        })
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}


const logIn = (formValues, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.logIn(formValues);
        dispatch({
            type:AUTHENTICATION,
            payload:data
        })
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

export {signUp, logIn};