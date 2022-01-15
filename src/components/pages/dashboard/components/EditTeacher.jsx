import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import Alert from '../../../../layout/partials/Alert';
import Message from '../../../../layout/partials/Message';
import storage from '../../../../helpers/storage';

import TeacherContext from '../../../../../context/teacher/teacherContext';



const EditTeacher = ({ isShow, closeModal }) => {

    const teacherContext = useContext(TeacherContext);

    const [editTeacher, setEditTeacher] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [msgData, setMsgData] = useState({
        title: '',
        type: 'success',
        message: '',
        buttonText: 'OK'
    });
    const [alertData, setAlertData] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {

        

    }, [])

    const eTeacher = async (e) => {
        if(e) e.preventDefault();

        

            const tData = {

                email: editTeacher.email ? editTeacher.email : teacherContext.teacher.email,
                firstName: editTeacher.firstName ? editTeacher.firstName : teacherContext.teacher.firstName,
                lastName: editTeacher.lastName ? editTeacher.lastName : teacherContext.teacher.lastName,
                phoneNumber: editTeacher.phoneNumber ? editTeacher.phoneNumber : teacherContext.teacher.phoneNumber,
                gender: editTeacher.gender ? editTeacher.gender : teacherContext.teacher.gender
    
            }


            if ( !tData.firstName && !tData.lastName && !tData.phoneNumber && !tData.gender ) {
                setAlertData({...alertData, show:true, type:'danger', message:'All fields are required'});
                setTimeout(() => {
                    setAlertData({...alertData, show: false});
                }, 5000)
            } 
            // else if (!tData.email) {
            //     setAlertData({...alertData, show:true, type:'danger', message:'Please enter an email'});
            //     setTimeout(() => {
            //         setAlertData({...alertData, show: false});
            //     }, 5000)
            // }
             else if (!tData.firstName) {
                setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's first name"});
                setTimeout(() => {
                    setAlertData({...alertData, show: false});
                }, 5000)
            } else if (!tData.lastName) {
                setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's last name"});
                setTimeout(() => {
                    setAlertData({...alertData, show: false});
                }, 5000)
            } else if (!tData.phoneNumber) {
                setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's phone number"});
                setTimeout(() => {
                    setAlertData({...alertData, show: false});
                }, 5000)
            } else if (!tData.gender) {
                setAlertData({...alertData, show:true, type:'danger', message:"Please enter teacher's gender"});
                setTimeout(() => {
                    setAlertData({...alertData, show: false});
                }, 5000)
            } else {

                setLoading(true);

                try {
                    await axios.put(`${process.env.REACT_APP_SCHOOL_URL}/teachers/${teacherContext.teacher._id}`, { ...tData }, storage.getConfigWithBearer())
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
                    setAlertData({...alertData, show:true, type:'danger', message: err.response.data.message });
                    setTimeout(() => {
                    setAlertData({...alertData, show: false});
                    }, 5000)
                }
                
            }

            

            

           

        
    }

    const close = (e) => {
        if(e) e.preventDefault();
        closeModal();
    };

    const msgAction = (e) => {
        if(e) e.preventDefault();
        closeModal()
    };

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
                            <h2 onClick={(e) => { e.preventDefault(); console.log(editTeacher)  }} className="font-metropolisregular fs-18">Edit teacher</h2>
                            <div className="ml-auto">
                                <Link onClick={close} className="dot-close">
                                    <span className="fe fe-x on-cord-o fs-13"></span>
                                </Link>
                            </div>
                        </div>

                        <Alert show={alertData.show} type={alertData.type} message={alertData.message}/>

                        <div>

                            {
                                teacherContext.loading && 
                                <>
                                    <div className="empty-state">
                                        <img src="../../../images/assets/spinner2.svg" alt="spinner" width='35px' />
                                    </div>
                                </> 
                            }

                            {

                                !teacherContext.loading &&
                                <form onSubmit={(e) => e.preventDefault()} >

                                {/* <div className="form-group">
                                    <label htmlFor="email" className="font-metropolisregular fs-14">Email</label>
                                    <input 
                                    defaultValue={ teacherContext.teacher.email ? teacherContext.teacher.email : '' }
                                    onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                                    type="email" 
                                    className="fs-14 form-control font-metropolisregular" 
                                    placeholder="you@example.com"
                                    />
                                </div> */}

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="firstName" className="font-metropolisregular fs-14">First Name</label>
                                        <input 
                                        defaultValue={ teacherContext.teacher.firstName ? teacherContext.teacher.firstName : '' }
                                        onChange={(e) => setEditTeacher({ ...editTeacher, firstName: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="John"
                                        />

                                    </div>

                                    <div className="col-md-6">
                                        
                                        <label htmlFor="lastName" className="font-metropolisregular fs-14">Last Name</label>
                                        <input 
                                        defaultValue={ teacherContext.teacher.lastName ? teacherContext.teacher.lastName : '' }
                                        onChange={(e) => setEditTeacher({ ...editTeacher, lastName: e.target.value })}
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
                                        defaultValue={ teacherContext.teacher.gender ? teacherContext.teacher.gender : '' }
                                        onChange={(e) => setEditTeacher({ ...editTeacher, gender: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="male"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="contact" className="font-metropolisregular fs-14">Phone Number</label>
                                        <input 
                                        defaultValue={ teacherContext.teacher.phoneNumber ? teacherContext.teacher.phoneNumber : '' }
                                        onChange={(e) => setEditTeacher({ ...editTeacher, phoneNumber: e.target.value })}
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="08123456789"
                                        />

                                    </div>
                                    
                                </div>

                                {/* <div className="ui-group-button mrgt1 ">
                                    <a href=""  
                                    className="btn btn-block big-btn bg-cord-o onwhite font-metropolissemibold">Submit</a>
                                </div> */}

                                <div className='form-group mrgt2'>
                                    {loading ? (
                                        <button to="" className="btn btn-lg bg-brand-o font-weight-bold btn-block onminesshaft onwhite fs-16 disabled">submitting....</button>
                                    ) : (
                                    <button onClick={(e) => eTeacher(e)}
                                        type='submit'
                                        className='btn btn-lg bg-brand-o font-weight-bold btn-block onminesshaft onwhite fs-16'>
                                        Submit
                                    </button>
                                    )}
                                </div>

                            </form>


                            }

                            
                        </div>

                    </div>
                   
                    }
                    {
                        step === 1 &&
                        <Message type={msgData.type} action={msgAction} title={msgData.title} message={msgData.message} resource="edit-teacher" />
                    }

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default EditTeacher;
