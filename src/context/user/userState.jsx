import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import storage from '../../components/helpers/storage'
import loader from '../../components/helpers/MainLoader'

import UserContext from './userContext';
import UserReducer from './userReducer';


import {
    GET_LOGGEDIN_USER,
    GET_USER_STATUS,
    SET_LOADING,
} from '../types'

const UserState = (props) => {

    const history = useHistory();
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const [show, setShowNetwork] = useState(true)

    const initialState = {
        user: {},
        status: {},
        loading: false,
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);


    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/login');
        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getUser = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.REACT_APP_AUTH_URL}/auth/user/${storage.getUserID()}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_LOGGEDIN_USER,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){

                        logout();
        
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get logged in user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get logged in user ${err}`)
        
                    }
                    
                })
                
            } catch (err) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get logged in user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get logged in user ${err}`)
    
                }
                
            }

        

    }

    const getStatus = async () => {

        setLoading()
        
        try {

            await Axios.get(`${process.env.REACT_APP_AUTH_URL}/users/status/${storage.getUserID()}`, storage.getConfigWithBearer())
            .then((resp) => {

                dispatch({
                    type: GET_USER_STATUS,
                    payload: resp.data.data
                });

                storage.saveStatus(resp.data.data);

            }).catch((err) => {

                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get user status ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get user status${err}`)
    
                }

            })
            
        } catch (err) {

            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get user status ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get user status ${err}`)

            }

        }

    }


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <UserContext.Provider
        value={{
            user: state.user,
            status: state.status,
            loading: state.loading,
            getUser,
            getStatus
        }}
    >
        {props.children}

    </UserContext.Provider>

    

}

export default UserState;