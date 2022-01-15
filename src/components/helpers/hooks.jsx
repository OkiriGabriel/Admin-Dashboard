import React, {useState, useRef, useEffect} from 'react'
import network from './network';
import loader from '../helpers/MainLoader'

export function useNetworkDetect(){

    
    const toggleNetwork = (e) => {
        loader.popNetwork()
    }

    useEffect(() => {

        window.addEventListener(`offline`, toggleNetwork, false);
        window.addEventListener(`online`, () => { }, false);

    }, [])

}