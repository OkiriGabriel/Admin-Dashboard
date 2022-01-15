import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios'

const PanelBox = ({ show, close }) => {

    const history = useHistory();
    const params = useParams();

    useEffect(() => {

    }, [])

    const dropLinks=[
        {
            type: 'url',
            action: '/',
            linkText: 'Upgrade'
        }
    ]

    return (

        <>

            <div className={`panel-box ${show ? 'show' : ''}`}>

                <Link onClick={(e) => close(e)} className="link-round ash sm">
                    <span className="fe fe-x fs-14"></span>
                </Link>

                <div className="panel-head">

                    <img className="dp" src="../../../images/assets/avatar.svg" alt="dp" />
                    
                    <div className="mrgt1">
                        <h1 className="font-metromedium fs-17 brand-greeny mrgb0">Imma Pasta</h1>
                        <small className="font-metrolight fs-12 brand-greeny">ID: 09876524</small>
                    </div>

                </div>

                <div className="ui-line bg-silverlight"></div>

                <div className="panel-body">


                </div>

                <div className="ui-line bg-silverlight"></div>

            </div>
        
        </>

    )

}

export default PanelBox;