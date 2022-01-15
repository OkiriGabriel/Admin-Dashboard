import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios'
import colors from '../../../helpers/colors';
import body from '../../../helpers/body';
import storage from '../../../helpers/storage';
import * as moment from 'moment';
import GAutoComplete from 'react-google-places-autocomplete';

import Alert from '../../../layouts/partials/Alert'
import CropModal from './CropModal'

import DropDown from '../../../layouts/partials/DropDown'
import PlaceBox from '../../../layouts/partials/Placeholder'
import Toast from '../../../layouts/partials/Toast'

import Carousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import UserContext from '../../../../context/user/userContext'

const UpdateProfile = (props) => {

    const history = useHistory();
    const params = useParams();
    let imgRef = null;

    const dpLink = useRef(null);

    const userContext = useContext(UserContext)

    const [loading, setLoading] = useState(false);
    const [dpsource, setDpSource] = useState('');
    const [dpfile, setDpFile] = useState(null);
    const [dpCrop, setDpCrop] = useState(null);
    const [showCrop, setShowCrop] = useState(false)
    const [location, setLocation] = useState(null);

    const [toast, setToast] = useState({
        type: 'success',
        show: false,
        message: '',
        title: '',
        position: 'top-right'
    })

    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    })

    const [student, setStudent] = useState({
        firstName: '', 
        lastName: '', 
        username: '', 
        phoneNumber: '', 
        track: '', 
        gender: '', 
        location: {}, 
        address: '', 
        picture: ''
    })

    useEffect(() => {

        body.changeBackground('mint-bg')

    }, [])


    const browseFile = (e) => {
        
        if (e.target.files && e.target.files[0]) {
    
            if (e.target.files[0].size > 5000000) {

                setToast({ ...toast, show: true, title: 'Error', type: 'error', message: 'Image cannot be more than 5MB in size', position: 'top-right'})
                setTimeout(() => {
                    setToast({ ...toast, show: false })
                }, 6000)

            }

            // check for file dimension here

            getImageSource(e.target.files[0]);
            
        }
    }

    const getImageSource = (file) => {
    
        let reader = new FileReader();
        reader.onloadend = (e) => {
            
            setDpFile(reader.result)
            setDpCrop(e.target.result);
            setToast({ ...toast, show: false })
            setShowCrop(true);

        };

        reader.readAsDataURL(file);
      
    }

    const openDialog = async (e, type) => {
        e.preventDefault();
        dpLink.current.click();
        setShowCrop(false);
    }

    const toggleToast = (e) => {
        if(e) e.preventDefault();
        setToast({ ...toast, show: !toast.show });
    }

    const toggleCrop = (e) => {
        if(e) e.preventDefault();
        setShowCrop(!showCrop);
    }

    const cropImageLoad = (image) => {
        imgRef = image;
    }

    const cropCapture = async (data) => {
        
        if(data.width !== data.height){

            setToast({ ...toast, show: true, title: 'Error', type: 'error', message: 'Image must have the same width and height', position: 'top-right'})
            setTimeout(() => {
                setToast({ ...toast, show: false })
            }, 6000)

            setShowCrop(false);

        }else{

            setShowCrop(false);
            const newImgURI = await imageToDataUri(imgRef, data, 'newfile.jpeg');
            setDpSource(newImgURI)
            setStudent({ ...student, picture: newImgURI });

        }
    }

    const imageToDataUri = (image, crop, filename) => {

        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve,reject) => {

            // canvas.toBlob(
            //     (blob) => {
            //       if (!blob) {
            //         //reject(new Error('Canvas is empty'));
            //         console.error('Canvas is empty');
            //         return;
            //       }
            //       blob.name = filename;
            //     //   window.URL.revokeObjectURL(this.fileUrl);
            //       const fileURL = window.URL.createObjectURL(blob);
            //       resolve(fileURL);
            //     },
            //     'image/jpeg',
            //     1
            // );

           const newImage = canvas.toDataURL( 'image/jpeg', 1.0)
           resolve(newImage)

        })

    }

    const submit = async (e) => {

        if(e) e.preventDefault();  

        if(!student.picture){
            
            setToast({ ...toast, show: true, title: 'Error', type: 'error', message: 'Choose a profile picture', position: 'top-right'})
                setTimeout(() => {
                setToast({ ...toast, show: false })
            }, 6000)

        }else{

            setLoading(true)

            await Axios.put(`${process.env.REACT_APP_AUTH_URL}/users/update-account/${storage.getUserID()}`, {...student}, storage.getConfigWithBearer())
            .then((resp) => {
                
                if(resp.data.error === false && resp.data.status === 200){
                    
                    
                    setToast({ ...toast, show: true, title: 'Success', type: 'success', message: 'Account updated successfully', position: 'top-right'})
                    setTimeout(() => {
                        setToast({ ...toast, show: false })
                    }, 6000)

                    userContext.getUser();
                    storage.keep('menu', 'overview')
                    history.push('/dashboard/student')
                }

                setLoading(false);
                
            }).catch((err) => {
                
                if(err.response.data.errors.length > 0){

                    setToast({ ...toast, show: true, title: 'Error', type: 'error', message: err.response.data.errors[0], position: 'top-right'})
                    setTimeout(() => {
                        setToast({ ...toast, show: false })
                    }, 6000)
    
                }else{

                    setToast({ ...toast, show: true, title: 'Error', type: 'error', message: err.response.data.message, position: 'top-right'})
                    setTimeout(() => {
                        setToast({ ...toast, show: false })
                    }, 6000)
                }

                setLoading(false);
                
            })
        }

    }
    

    const getSelected = (e) => {
        console.log(e);
        setStudent({ ...student, location: e });
    }

    return (

        <>

            <Toast 
            show={toast.show} 
            title={toast.title} 
            message={toast.message} 
            position={toast.position}
            type={toast.type}
            close={toggleToast} />
            <div className='ui-wrapper-mini'>

                {
                    userContext.loading &&
                    <>
                        <div><PlaceBox height={'15px'} width={'120px'} bgColor={'#e2ddf1'} radius={'100px'} className={'load-place'} /></div>
                        <><PlaceBox height={'10px'} width={'320px'} bgColor={'#e2ddf1'} radius={'100px'} className={'load-place'} /></>
                    </>
                }

                {
                    !userContext.loading &&
                    <>

                        <h2 className='font-matterlight brandcc-purple fs-25 mb-1'>Hey {  userContext.user.firstName },</h2>
                        <p className='font-matterregular brandcc-purple fs-15'>Let's get your account setup and get you prepared for an amazing journey ahead.</p>
                        <div className='ui-line bg-silverlight'></div>

                    </>
                }

            </div>

            <section className='section'>

                <div className="ui-dashboard-card">

                    {/* <div className="ui-dashboard-card-header">

                        <h1 className="font-metrobold brand-greeny ui-card-title fs-16">Configuration</h1>

                        <div className="ui-card-header-options">

                        </div>

                    </div> */}

                    <div className="ui-dashboard-card-body">

                        <div className='row pdt2 pdb2'>

                            <div className='col-md-4 ui-text-center'>

                                <p className="font-mattermedium brandcc-purple fs-15 mrgb1">Profile picture</p>

                                <div className='dp-update mx-auto ui-relative'>

                                    <Link onClick={(e) => openDialog(e)} className="link-round md ash">
                                        <span className="fe fe-edit-3 fs-16"></span>
                                    </Link>

                                    <input type="file" className="ui-hide" ref={dpLink} onChange={(e) => browseFile(e)} accept="image/x-png,image/jpg,image/jpeg,image/png" />

                                    {
                                        dpsource &&
                                        <img src={dpsource} className='ui-rounded' alt="dp"/>
                                    }

                                    {
                                        !dpsource &&
                                        <img src="../../../images/assets/dp-large.svg" className='ui-rounded' alt="dp"/>
                                    }

                                    

                                </div>

                            </div>

                            <div className='col-md-5 offset-md-1'>

                                <form className="form" onSubmit={(e) => e.preventDefault()}>

                                    <div className="form-group">
                                        
                                        <div className='form-row'>

                                            <div className='col'>
                                                <label className="font-mattermedium brandcc-purple fs-14 mrgb0">First name</label>
                                                <input 
                                                defaultValue={ 
                                                    !userContext.loading && userContext.user ? 
                                                    userContext.user.firstName : 
                                                    (e) => { setStudent({...student, firstName: e.target.value}) } 
                                                }
                                                onChange={(e) => { setStudent({...student, firstName: e.target.value}) }}
                                                type="text" className="form-control fs-14 lg font-matterregular" 
                                                placeholder="your first name" />
                                            </div>

                                            <div className='col'>
                                                <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Last name</label>
                                                <input 
                                                defaultValue={ 
                                                    !userContext.loading && userContext.user ? 
                                                    userContext.user.lastName : 
                                                    (e) => { setStudent({...student, lastName: e.target.value}) } 
                                                }
                                                onChange={(e) => { setStudent({...student, lastName: e.target.value}) }}
                                                type="text" className="form-control fs-14 lg font-matterregular" 
                                                placeholder="your last name" />
                                            </div>

                                        </div>

                                    </div> 

                                    <div className="form-group">
                                        
                                        <div className='form-row'>

                                            <div className='col'>
                                                <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Phone number</label>
                                                <input 
                                                defaultValue={ 
                                                    !userContext.loading && userContext.user ? 
                                                    userContext.user.phoneNumber : 
                                                    (e) => { setStudent({...student, phoneNumber: e.target.value}) } 
                                                }
                                                onChange={(e) => { setStudent({...student, phoneNumber: e.target.value}) }}
                                                type="number" className="form-control fs-14 lg font-matterregular" 
                                                placeholder="080 0000 0000" />
                                            </div>

                                            {
                                                userContext.user && userContext.user.tracks && userContext.user.tracks.length > 0 &&
                                                <div className='col'>
                                                    <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Track</label>
                                                    <select 
                                                    defaultValue={(e) => { setStudent({...student, track: userContext.user.tracks[0]}) }}
                                                    onChange={(e) => { setStudent({...student, track: e.target.value}) }}
                                                    type="text" className="form-control brandcc-purple custom-select fs-14 lg font-matterregular" >
                                                        <option value="">Choose</option>
                                                        {
                                                            userContext.user.tracks[0].toString() === 'frontend' ? <option value="frontend" selected>Frontend</option> : <option value="frontend">Frontend</option>
                                                        }
                                                        {
                                                            userContext.user.tracks[0].toString() === 'design' ? <option value="design" selected>Design</option> : <option value="design">Design</option>
                                                        }
                                                        {
                                                            userContext.user.tracks[0].toString() === 'backend' ? <option value="backend" selected>Dackend</option> : <option value="backend">Backend</option>
                                                        }
                                                    </select>
                                                </div>
                                            }


                                            {
                                                userContext.user && userContext.user.tracks && userContext.user.tracks.length === 0 &&
                                                <div className='col'>
                                                    <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Track</label>
                                                    <select 
                                                    defaultValue={(e) => { setStudent({...student, track: e.target.value}) }}
                                                    onChange={(e) => { setStudent({...student, track: e.target.value}) }}
                                                    type="text" className="form-control brandcc-purple custom-select fs-14 lg font-matterregular" >
                                                        <option value="" selected>Choose</option>
                                                        <option value="frontend">Frontend</option>
                                                        <option value="design">Design</option>
                                                        <option value="backend">Backend</option>
                                                    </select>
                                                </div>
                                            }

                                            

                                        </div>

                                    </div>

                                    <div className="form-group">
                                        
                                        <div className='form-row'>

                                            <div className='col'>
                                                <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Username</label>
                                                <input 
                                                defaultValue={ 
                                                    !userContext.loading && userContext.user ? 
                                                    userContext.user.username : 
                                                    (e) => { setStudent({...student, username: e.target.value}) } 
                                                }
                                                onChange={(e) => { setStudent({...student, username: e.target.value}) }}
                                                type="text" className="form-control fs-14 lg font-matterregular" 
                                                placeholder="@username" />
                                            </div>

                                            <div className='col'>
                                                <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Gender</label>
                                                <select 
                                                defaultValue={(e) => { setStudent({...student, gender: e.target.value}) }}
                                                onChange={(e) => { setStudent({...student, gender: e.target.value}) }}
                                                type="text" className="form-control brandcc-purple custom-select fs-14 lg font-matterregular" >
                                                    <option value="" selected>Select</option>
                                                    <option value="frontend">Male</option>
                                                    <option value="design" >Female</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>     

                                    <div className="form-group">
                                        
                                        <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Location</label>
                                        <GAutoComplete 
                                            apiOptions={{
                                                language: 'en',
                                                
                                            }}
                                            selectProps={{ 
                                                styles: {
                                                    input: (pvd) => ({
                                                        ...pvd,
                                                        fontFamily: 'matterregular'
                                                    }),
                                                    control: (pvd) => ({
                                                        ...pvd,
                                                        height: '50px',
                                                        border: '1px solid #C9DFEA',
                                                        borderRadius: '6px'
                                                    }),
                                                    singleValue: (pvd) => ({
                                                        ...pvd,
                                                        fontFamily: 'matterregular'
                                                    }),
                                                    option: (pvd) => ({
                                                        ...pvd,
                                                        fontFamily: 'matterregular'
                                                    }),
                                                },
                                                location, 
                                                onChange: ((e) => getSelected(e) )
                                            }}
                                            autocompletionRequest={{
                                                country: ['ng', 'us', 'ca', 'uk'],
                                                
                                            }}
                                        />

                                    </div> 

                                    <div className="form-group">
                                        
                                        <label className="font-mattermedium brandcc-purple fs-14 mrgb0">Address</label>
                                        <input 
                                        defaultValue={ 
                                            !userContext.loading && userContext.user ? 
                                            userContext.user.address : 
                                            (e) => { setStudent({...student, address: e.target.value}) } 
                                        }
                                        onChange={(e) => { setStudent({...student, address: e.target.value}) }}
                                        type="text" className="form-control fs-14 lg font-matterregular" 
                                        placeholder="your address" />

                                    </div>          

                                    <div className="ui-group-button mrgt3">
                                        {
                                            loading &&
                                            <Link to="/" className="btn btn-block lg gradient-red font-matterbold onwhite disabled-lt">
                                                <span className='concreap-loader white sm'></span>
                                            </Link>
                                        }
                                        {
                                            !loading &&
                                            <Link onClick={(e) => submit(e)} to="/" className="btn btn-block lg gradient-red font-matterbold onwhite">
                                                Save Details
                                            </Link>
                                        }
                                        
                                    </div>

                                </form>
                                
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <CropModal
                isShow={showCrop} closeModal={toggleCrop} 
                modalTitle="Crop image" 
                flattened={true} 
                slim="slim-mlg"
                data={dpCrop}
                capture={cropCapture}
                imageLoaded={cropImageLoad}
            />

        </>

    )

}

export default UpdateProfile;