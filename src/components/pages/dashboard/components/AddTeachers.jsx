import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import Alert from '../../../../layout/partials/Alert';
import Message from '../../../../layout/partials/Message';
import storage from '../../../../helpers/storage';



const AddTeachers = ({ isShow, closeModal }) => {

    

    const [teacherData, setTeacherData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0)
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
        
    }, [])

    const teacher = async (e) => {
        if(e) e.preventDefault();

        if (!teacherData.email && !teacherData.firstName && !teacherData.lastName && !teacherData.phoneNumber && teacherData.gender) {
            setAlertData({...alertData, show:true, type:'danger', message:'All fields are required'});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!teacherData.email) {
            setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's email"});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!teacherData.firstName) {
            setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's first name"});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!teacherData.lastName) {
            setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's last name"});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!teacherData.phoneNumber) {
            setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's phone number"});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else if (!teacherData.gender) {
            setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's gender"});
            setTimeout(() => {
                setAlertData({...alertData, show: false});
            }, 5000)
        } else {
            setLoading(true);

            try {
                await axios.post(`${process.env.REACT_APP_SCHOOL_URL}/schools/add-teacher/${storage.getUserID()}`, { ...teacherData }, storage.getConfigWithBearer())
                .then((resp) => {
                    if (resp.data.status === 200 && resp.data.error === false) {
                        setMsgData({ ...msgData, type: 'success', title: 'Success', message: 'Teacher created successfully' });
                        setLoading(false);
                        setStep(1)
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
                            <h2 className="font-metropolisregular fs-18">Add a new teacher</h2>
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
                                    <label htmlFor="email" className="font-metropolisregular fs-14">Email</label>
                                    <input
                                    defaultValue={(e) => setTeacherData({ ...teacherData, email: e.target.value  })}
                                    onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value  })}
                                    type="email" 
                                    className="fs-14 form-control font-metropolisregular" 
                                    placeholder="you@example.com"
                                    />
                                </div>

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="firstName" className="font-metropolisregular fs-14">First Name</label>
                                        <input
                                        defaultValue={(e) => setTeacherData({ ...teacherData, firstName: e.target.value  })}
                                        onChange={(e) => setTeacherData({ ...teacherData, firstName: e.target.value  })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="John"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="lastName" className="font-metropolisregular fs-14">Last Name</label>
                                        <input
                                        defaultValue={(e) => setTeacherData({ ...teacherData, lastName: e.target.value  })}
                                        onChange={(e) => setTeacherData({ ...teacherData, lastName: e.target.value  })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="Doe"
                                        />

                                    </div>
                                    
                                </div>
                                
                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="gender" className="font-metropolisregular fs-14">Gender</label>
                                        <input
                                        defaultValue={(e) => setTeacherData({ ...teacherData, gender: e.target.value  })}
                                        onChange={(e) => setTeacherData({ ...teacherData, gender: e.target.value  })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="male"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="contact" className="font-metropolisregular fs-14">Contact</label>
                                        <input 
                                        defaultValue={(e) => setTeacherData({ ...teacherData, phoneNumber: e.target.value  })}
                                        onChange={(e) => setTeacherData({ ...teacherData, phoneNumber: e.target.value  })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="08000000000"
                                        />

                                    </div>
                                    
                                </div>

                                <div className='form-group mrgt2'>
                                    {loading ? (
                                        <button to="" className="btn btn-lg bg-brand-o font-weight-bold btn-block onminesshaft onwhite fs-16 disabled">submitting....</button>
                                    ) : (
                                    <button onClick={(e) => teacher(e)}
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
                    <Message resource="add-teacher" type={msgData.type} action={msgAction}  title={msgData.title} message={msgData.message} buttonText={msgData.buttonText} />
                }

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default AddTeachers;
