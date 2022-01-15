import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';



const SubModal = ({isShow, closeModal}) => {

    const [modalTitle, setModalTitle] = useState('');
    

    useEffect(() => {

        setModalTitle('Thank you for joining us');

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

                    <div className="d-flex">
                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/img@tmodal.jpg")'}}>
                            <div className="dm--d">
                                <div>
                                    {/* <img src="../../images/assets/img@idadd.svg" alt="icon" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                {/* <h2 className="font-helveticabold brandccpurple fs-18">{modalTitle ? modalTitle : "No Title"}</h2> */}
                                <div className="ml-auto">
                                    <Link onClick={close} className="dot-close">
                                        <span className="fe fe-x brand-purple fs-13"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="dm--ct d-flex align-items-center flex-column justify-content-center">

                                <div className=" ui-text-center pdr2 pdl2">
                                    <img src="../../../images/assets/thank-you.svg" alt="thank you" width="200px" />
                                    <h2 className="font-helveticabold brandccpurple fs-25">Thank you for signing up</h2>
                                    <span className="font-helveticabold onmineshaft fs-14">We're glad you're giving us your valuable time to allow us help you grow as a creative.</span>
                                    <Link to="/" className="btn btn-mbig bg-brandccred onwhite mrgt2">Close</Link>
                                </div>
                               
                            </div>

                        </div>
                    </div>
                    
                </Modal.Body>

            </Modal>
        </>
    )

}

export default SubModal;