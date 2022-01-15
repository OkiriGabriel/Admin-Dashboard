import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';



const PreviewModal = ({isShow, closeModal}) => {

    const [modalTitle, setModalTitle] = useState('');
    

    useEffect(() => {

        setModalTitle('Preview Free Course');

    });

    const close = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <Modal show={isShow} 
                onHide={closeModal} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="small-modal"
                centered
                className="dm--modal"
            >

                <Modal.Body>

                    <div className="d-flex preview">
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                <h2 className="font-helveticabold brandccpurple fs-18">{modalTitle ? modalTitle : "No Title"}</h2>
                                <div className="ml-auto">
                                    <Link onClick={close} className="dot-close">
                                        <span className="fe fe-x brand-purple fs-13"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="dm--ct">

                            <div style={{position: 'relative', paddingBottom: '62.5%', height: 0}}><iframe src="https://www.loom.com/embed/8712c5df14474dda8b0e311e1d6833fa" frameBorder={0} webkitallowfullscreen mozallowfullscreen allowFullScreen style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} /></div>
                               
                            </div>

                        </div>
                    </div>
                    
                </Modal.Body>

            </Modal>
        </>
    )

}

export default PreviewModal;