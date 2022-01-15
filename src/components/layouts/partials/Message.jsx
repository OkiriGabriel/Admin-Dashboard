import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

import lottieSuccess from '../../_data/check-data-green.json'
import lottieError from '../../_data/check-error.json'

import LottiePlayer from './LottiePlayer'

const Message = ({ title, message, action, status, lottieSize, loop, actionType, buttonText, setBg }) => {

    const history = useHistory();
    const params = useParams();

    useEffect(() => {

    }, []);

    const fireAction = (e) => {

        if(e) e.preventDefault();

        if(actionType === 'close'){
            action(e);
        }else{

            if(typeof(action) === 'string' && action){
                history.push(action);
            }else{
                action(e)
            }

        }

        

    }

    return (
        <>

            <div style={ {  backgroundColor: setBg ? '#f3f0ff' : '', padding: setBg ? '1.5rem 2.5rem' : '', borderRadius: setBg ? '1.5rem' : '' } }>
                <div className="mrgt2">
                    <LottiePlayer 
                    lottieData={status && status === 'success' ? lottieSuccess : lottieError} 
                    h={lottieSize ? lottieSize : 80} w={lottieSize ? lottieSize : 80} 
                    loop={loop ? loop : false} />
                </div>

                <div className="ui-text-center mrgt3 mrgb3 ">
                    <h1 className="brandcc-purple fs-20 font-matterbold mrgb">{ title ? title : 'No Title' }</h1>
                    <p className="brandcc-purple fs-15 font-matterregular mrgb3 ui-line-height">{ message ? message : 'No Message' }</p>

                    <Link onClick={(e) => fireAction(e)} to="/" className="btn btn-block lg gradient-red font-matterbold onwhite"> { buttonText ? buttonText : 'Close' } </Link>
                </div>
            </div>
        </>
    )

}

export default Message;