import React from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const AddStudent = ({ isShow, closeModal }) => {

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

                    <div>

                        <div className="d-flex align-items-center">
                            <h2 className="font-metropolisregular fs-18">Add a new student</h2>
                            <div className="ml-auto">
                                <Link onClick={close} className="dot-close">
                                    <span className="fe fe-x on-cord-o fs-13"></span>
                                </Link>
                            </div>
                        </div>

                        <div>

                            <form>

                                <div className="form-group">
                                    <label htmlFor="name" className="font-metropolisregular fs-14">Name</label>
                                    <input 
                                    type="text" 
                                    className="fs-14 form-control font-metropolisregular" 
                                    placeholder="John Doe"
                                    />
                                </div>

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="id" className="font-metropolisregular fs-14">ID</label>
                                        <input 
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="AAA03465"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="class" className="font-metropolisregular fs-14">Class</label>
                                        <input 
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="Basic 1"
                                        />

                                    </div>
                                    
                                </div>
                                
                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="age" className="font-metropolisregular fs-14">Age</label>
                                        <input 
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="10"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="email" className="font-metropolisregular fs-14">Email</label>
                                        <input 
                                        type="text" 
                                        className="fs-14 form-control font-metropolisregular" 
                                        placeholder="example@gmail.com"
                                        />

                                    </div>
                                    
                                </div>

                                <div className="form-group pb-2">
                                    <label htmlFor="telephone" className="font-metropolisregular fs-14">Parent Phone Number</label>
                                    <input 
                                    type="text" 
                                    className="fs-14 form-control font-metropolisregular" 
                                    placeholder="08000000000"
                                    />
                                </div>

                                <div className="ui-group-button mrgt1 ">
                                    <a href="" 
                                    className="btn btn-block big-btn bg-cord-o onwhite font-metropolissemibold">Submit</a>
                                </div>

                            </form>

                        </div>

                    </div>


                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default AddStudent;
