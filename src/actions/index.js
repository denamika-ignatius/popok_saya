import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    SELECT_POPOK
} from './types';

export const onUserRegister = ({ username, email, phone, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.get('http://localhost:1997/users', { 
                params: {
                    username
                }
            }).then((res) => {
                if(res.data.length === 0) {
                    axios.post('http://localhost:1997/users', {
                        username, email, password, phone
                    }).then((res) => {
                        console.log(res)
                        dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data.username })
                    }).catch((err) => {
                        console.log(err);
                        dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
                    })
                }
                else {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username has been taken'})
                }
                
            }).catch((err) => {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }
    }
}

export const onUserLogout = () => {
    return { type: LOGOUT }
}

export const onUserLogin = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        // setTimeout(() => loginYok(dispatch,username,password), 2000);
        loginYok(dispatch,username,password);
    }
}

export const keepLogin = (username) => {
    return (dispatch) => {
        axios.get('http://localhost:1997/users', {
            params: {
                username
            }
        }).then((res) => {
            if(res.data.length > 0) {
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username } 
                })
            }
        })
    }
}

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}

var loginYok = (dispatch,username,password) => {
    axios.get('http://localhost:1997/users', {
            params: {
                username,
                password
            }
        }).then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username }
                })
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid' })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
        })
}

export const select_popok = (selectedPopok) => {
    return { 
        type: SELECT_POPOK,
        payload: selectedPopok
    }
}