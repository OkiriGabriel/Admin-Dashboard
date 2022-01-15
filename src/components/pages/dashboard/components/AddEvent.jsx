import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import SchoolContext from '../../../../../context/school/schoolContext';
import SessionSearch from '../../../../layout/partials/SessionSearch';
import Alert from '../../../../layout/partials/Alert';
import Message from '../../../../layout/partials/Message';
import storage from '../../../../helpers/storage';

const AddEvent = ({ isShow, closeModal }) => {

    const schoolContext = useContext(SchoolContext)

    const [eventData, setEventData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        session: ''
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [msgData, setMsgData] = useState({
        title: '',
        type: 'success',
        message: '',
        buttonText: 'Ok'
    });
    const [alertData, setAlertData] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {
        schoolContext.getSessions();
    }, []);

    const event = async (e) => {
        if(e) e.preventDefault();

        if (!eventData.title && !eventData.startDate && !eventData.endDate && !eventData.description) {
            setAlertData({...alertData, show:true, type:'danger', message:'All fields are required'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!eventData.title) {
            setAlertData({...alertData, show:true, type:'danger', message:'Please enter a title for an event'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!eventData.startDate) {
            setAlertData({...alertData, show:true, type:'danger', message:'Please enter a starting date'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!eventData.endDate) {
            setAlertData({...alertData, show:true, type:'danger', message:'Please enter an end date'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!eventData.description) {
            setAlertData({...alertData, show:true, type:'danger', message:'Please enter the description for the event'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else {
            setLoading(true);

            try {
                await axios.post(`${process.env.REACT_APP_SCHOOL_URL}/events?school_id=${storage.getUserID()}`, { ...eventData }, storage.getConfigWithBearer())
                .then((resp) => {
                    if (resp.data.status === 200 && resp.data.error === false) {
                        setMsgData({ ...msgData, type: 'success', title: 'Success', message: 'Event created successfully' });
                        setLoading(false);
                        // setStep(1)
                    } else {
                        setMsgData({ ...msgData, type: 'error', title: 'Error', message: 'Error uploading teacher' });
                        setLoading(false);
                    }
                })
            } catch (err) {
                setAlertData({...alertData, show:true, type:'danger', message:err.response.data.message});
                setTimeout(() => {
                setAlertData({...alertData, show: false});
                }, 5000)
            }
        }
    }

    const close = (e) => {
        e.preventDefault();
        closeModal();
    }

    const msgAction = (e) => {
        if(e) e.preventDefault();
        closeModal()
    }

    const getOptions = () => {
        const formatted = !schoolContext.loading && schoolContext.sessions.length > 0 && 
        schoolContext.sessions.map((i) => (i.session !== undefined))

        const cp = formatted.map((i) => {
            let s = {
                value: i._id,
                label: i.name,
                left: i.session
            }
            return s;
        })

        return cp ? cp : [];
    }

    const setDefault = () => {
        if (!schoolContext.loading && schoolContext.sessions.length > 0) {
            const cs = schoolContext.sessions.find((i) => i.isCurrent === true);
            const fm = {
                value: cs._id,
                label: cs.name,
                left: cs.session
            }
            return fm;
        } else {
            return 1;
        }
    }

    const getSelected = (val) => {
        setEventData({ ...eventData, session: val.left })
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
                    {
                        step === 0 &&
                        <div>

                        <div className="d-flex align-items-center">
                            <h2 className="font-metropolisregular fs-18">Add a new event</h2>
                            <div className="ml-auto">
                                <Link onClick={close} className="dot-close">
                                    <span className="fe fe-x on-cord-o fs-13"></span>
                                </Link>
                            </div>
                        </div>

                        <Alert show={alertData.show} type={alertData.type} message={alertData.message}/>

                        <div>

                            <form>

                                <div className="form-group">
                                    <label htmlFor="title" className="font-metropolisregular fs-14">Title</label>
                                    <input 
                                    defaultValue={(e) => setEventData({ ...eventData, title: e.target.value })}
                                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                                    type="text" 
                                    className="fs-14 form-control font-metropolisregular" 
                                    placeholder="Inter-House Sport Competition"
                                    />
                                </div>
                                
                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="startDate" className="font-metropolisregular fs-14">Start Date</label>
                                        <input 
                                        defaultValue={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                                        onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="20-08-2021"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="endDate" className="font-metropolisregular fs-14">End Start</label>
                                        <input 
                                        defaultValue={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                                        onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="25-10-2021"
                                        />

                                    </div>
                                    
                                </div>
                                
                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="description" className="font-metropolisregular fs-14">Description</label>
                                        <input 
                                        defaultValue={(e) => setEventData({ ...eventData, description: e.target.value })}
                                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="Inter-House Sport Competition between primary five and six"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="session" className="font-metropolisregular fs-14">Session</label>
                                        {
                                            !schoolContext.loading &&
                                            <SessionSearch 
                                            options={getOptions}
                                            selected={getSelected}
                                            className="fs-14 font-metropolisregular"
                                            />
                                            }

                                    </div>
                                    
                                </div>

                                <div className='form-group mrgt2'>
                                    {loading ? (
                                        <button to="" className="btn btn-lg bg-brand-o font-weight-bold btn-block onminesshaft onwhite fs-16 disabled">loading....</button>
                                    ) : (
                                    <button onClick={(e) => event(e)}
                                        type='submit'
                                        className='btn btn-lg bg-brand-o font-weight-bold btn-block onminesshaft onwhite fs-16'>
                                        Submit
                                    </button>
                                    )}
                                </div>

                            </form>

                        </div>

                    </div>

                    }
                    {
                        step === 1 && 
                        <Message type={msgData.type} action={msgAction} title={msgData.title} message={msgData.message} buttonText={msgData.buttonText} />
                    }

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default AddEvent;
