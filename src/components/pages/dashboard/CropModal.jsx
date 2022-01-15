import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Axios from 'axios'
import storage from '../../../helpers/storage'
import colors from '../../../helpers/colors'
import body from '../../../helpers/body'
import Alert from '../../../layouts/partials/Alert';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const CropModal = ({isShow, closeModal, modalTitle, flattened, stretch, slim, buttonText, data, capture, imageLoaded}) => {

    const [loading, setLoading] = useState();
    
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    })

    const [crop, setCrop] = useState({
        unit: 'px',
        width: 100,
        height: 100,
        x: 100,
        y: 100
    })

   
    useEffect(() => {
        
    }, []);

    // functions
    const closeX = (e) => {
        if(e) e.preventDefault();
        closeModal();
    }


    const cropChange = (crop) => {
        setCrop(crop);
    }

    const complete = (e) => {
        if(e) e.preventDefault();
        capture(crop);
        closeX()
    }

    return (

        <>

            <Modal show={isShow} 
                onHide={null} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="medium-modal"
                centered
                className={`custom-modal ${slim ? slim : ''} ${stretch ? 'stretched' : ''} ${flattened ? 'flat' : ''} lg`}
            >

                <Modal.Body>

                     <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: `url("${process.env.REACT_APP_STORAGE_URL}/img@add-m")`}}>
                            <div className="dm--d">
                                <div>
                                    {/* <img src="../../../images/assets/i" alt="icon" /> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="dm--body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/foopat.svg")'}}> */}
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                <h2 className="brandcc-purple mrgb0 font-matterbold fs-18">
                                    { modalTitle }
                                </h2>
                                <div className="ml-auto">
                                    <Link onClick={(e) => closeX(e)}  className="dot-link md ui-icon-animate">
                                        <span className="fe fe-x fs-12"></span>
                                    </Link>
                                </div>
                            </div> 

                            <div className="dm--ct mrgt2 ui-text-center">

                                <ReactCrop 
                                    src={data}
                                    crop={crop}
                                    maxWidth={200}
                                    maxHeight={200}
                                    minWidth={100}
                                    minHeight={100}
                                    className='react-crop'
                                    onChange={cropChange}
                                    ruleOfThirds={true}
                                    keepSelection={true}
                                    onImageLoaded={imageLoaded}
                                />

                                <div className='mrgt1'>
                                    <Link onClick={(e) => complete(e)} className='font-matterbold fs-17 brandcc-red'>Done</Link>
                                </div>

                            </div>                                  
                        </div>
                    </div> 
                     
                </Modal.Body>

            </Modal>
        
        
        </>

    )

}

export default CropModal;