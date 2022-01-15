import React, { useReducer, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';
import storage from '../../components/helpers/storage';
import loader from '../../components/helpers/MainLoader'
import Ip from '../../components/helpers/Ip';

import ResourceContext from './resourceContext';
import ResourceReducer from './resourceReducer';



import {
    GET_BANKS,
    GET_LOCATIONS,
    GET_COUNTRIES,
    GET_COUNTRY,
    GET_IP_ADDRESS,
    SET_LOADING
 } from '../types';



 const ResourceState = (props) => {

    const history = useHistory();
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        banks: [],
        locations: [],
        countries: [],
        country: {},
        ipData: {},
        loading: false
    }

    const [state, dispatch] = useReducer(ResourceReducer, initialState);

    const configX = {
        headers: {
            lg: 'en',
            ch: 'web'
        }
    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/login');
        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, storage.getConfig());
    }
  
    const getBanks = async () => {

        setLoading()

        try {
            await Axios.get(`${process.env.REACT_APP_RESOURCE_URL}/banks?limit=9999`, storage.getConfig())
            .then((resp) => {
                dispatch({
                    
                    type: GET_BANKS,
                    payload: resp.data.data
                })
                
            }).catch((err) => {
        
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();

                }else if(err && err.response && err.response.data){

                    console.log(`Error! Could not get banks ${err.response.data}`)

                }else if(err && err.toString() === 'Error: Network Error'){

                    loader.popNetwork();

                }else if(err){

                    console.log(`Error! Could not get banks ${err}`)

                }

            });
        } catch (err) {

            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get banks ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not banks ${err}`)

            }

        }
    }

    const getLocations = async () => {

        setLoading()

        try {
            await Axios.get(`${process.env.REACT_APP_RESOURCE_URL}/locations?limit=9999`, storage.getConfig())
            .then((resp) => {
                dispatch({
                    
                    type: GET_LOCATIONS,
                    payload: resp.data.data
                })
                
            }).catch((err) => {
        
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    logout();

                }else if(err && err.response && err.response.data){

                    console.log(`Error! Could not locations ${err.response.data}`)

                }else if(err && err.toString() === 'Error: Network Error'){

                    loader.popNetwork();

                }else if(err){

                    console.log(`Error! Could not get locations ${err}`)

                }

            });
        } catch (err) {

            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get locations ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not get locations ${err}`)

            }

        }
    }

    const getCountries = async () =>{

        setLoading();

        await Axios.get(`${process.env.REACT_APP_RESOURCE_URL}/countries?limit=9999`, storage.getConfig())
        .then((resp) =>{

            dispatch({
                type: GET_COUNTRIES,
                payload: resp.data.data

            });
        }).catch((err) =>{

            if(err && err.response && err.response.data && err.response.data.status === 401){

                logout();

            }else if(err && err.response && err.response.data){

                console.log(`Error! Could not get countries ${err.response.data}`)

            }else if(err && err.toString() === 'Error: Network Error'){

                loader.popNetwork();

            }else if(err){

                console.log(`Error! Could not countries ${err}`)

            }
            
        })
        
    };

    const getIpAddress =  () => {

        setLoading();

        Ip.getAddress()
        .then((resp) => {


            dispatch({
                type: GET_IP_ADDRESS,
                payload: resp
            })
            console.log(resp);
        }).catch((err) => {
            console.log(err)
        })
    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <ResourceContext.Provider
            value={{
                banks: state.banks,
                locations: state.locations,
                countries: state.countries,
                country: state.country,
                ipData: state.ipData,
                loading: state.loading,
                getBanks,
                getLocations,
                getCountries,
                getIpAddress
            }}>
        {props.children}
        
    </ResourceContext.Provider>

 }

 export default ResourceState;
 