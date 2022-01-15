import React from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const AddModal = ({ isShow, closeModal }) => {

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
                            <h2 className="font-metropolisregular fs-18">Enter an event</h2>
                            <div className="ml-auto">
                                <Link onClick={close} className="dot-close">
                                    <span className="fe fe-x on-cord-o fs-13"></span>
                                </Link>
                            </div>
                        </div>

                        <div>

                            <form>

                                <div className="form-group">
                                    <label htmlFor="activity" className="font-metropolisregular fs-14">Event/Activity</label>
                                    <input type="text" className="fs-14 form-control font-metropolisregular" />
                                </div>

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="start_date" className="font-metropolisregular fs-14">Start Date</label>
                                        <input type="date" className="fs-14 form-control font-metropolisregular" />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="start_time" className="font-metropolisregular fs-14">Start Time</label>
                                        <input type="time" className="fs-14 form-control font-metropolisregular" />

                                    </div>
                                    
                                </div>
                                
                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="end_date" className="font-metropolisregular fs-14">End Date</label>
                                        <input type="date" className="fs-14 form-control font-metropolisregular" />

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="end_time" className="font-metropolisregular fs-14">End Time</label>
                                        <input type="time" className="fs-14 form-control font-metropolisregular" />

                                    </div>
                                    
                                </div>

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <label htmlFor="class" className="font-metropolisregular fs-14">Class</label>
                                        <select id="inputClass" className="form-control font-metropolisregular fs-14">
                                            <option selected disabled>Select</option>
                                            <option>Basic 1</option>
                                            <option>Basic 2</option>
                                            <option>Basic 3</option>
                                        </select>

                                    </div>

                                    <div className="col-md-6">

                                        <label htmlFor="class" className="font-metropolisregular fs-14">Session</label>
                                        <select id="inputClass" className="form-control font-metropolisregular fs-14">
                                            <option selected disabled>Select</option>
                                            <option>First Term</option>
                                            <option>Second Term</option>
                                            <option>Third Term</option>
                                        </select>

                                    </div>
                                    
                                </div>

                                <div className="form-group pb-2">
                                    <label htmlFor="remarks" className="font-metropolisregular fs-14">Remarks</label>
                                    <input type="text" className="fs-14 form-control font-metropolisregular" />
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

export default AddModal
