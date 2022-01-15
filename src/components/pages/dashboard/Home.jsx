import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PlaceBox from '../../layouts/partials/Placeholder'

import UserContext from '../../../context/user/userContext';
import ApexPieChart from './components/ApexPieChart';
import GoogleReactCharts from './components/GoogleReactCharts';
import ApexLineChart from './components/ApexLineChart';


// https://amazing-react-charts.vercel.app/donut-chart#demo-1

const Home = (props) => {

    const history = useHistory();
    const params = useParams();

    const userContext = useContext(UserContext)

    const [loading, setLoading] = useState(false);


    useEffect(() => {

     

    }, [])
    


    return (

        <>

            <section className='section ui-wrapper-mini'>

                <div className='row'>

                   

                    <div className='col-md-7'>

                        <div className="ui-dashboard-card">

                            <div className="ui-dashboard-card-body">

                        
                                    <>
                                    
                                        <div className='cardb-inner'>

                                            <div className='row'>

                                                <div className='col-md-12'>

                                                    <div className='ov-card purple  ui-hide-mobile-only'>
                                                    <ApexLineChart />

                                                    </div>

                                                </div>

                                           </div>

                                        </div>

                                    </>
                             
                               
                                    <>

                                        <div className='cardb-inner ui-hide-mobile-only'>

                                           <div className='row'>

                                                <div className='col-md-10'>

                                                <GoogleReactCharts />   

                                                </div>

                                           </div>

                                        </div>

                                    </>
                                     
                            </div>

                        </div>

                    </div>

                    <div className='col-md-5'>

                        <div className="ui-dashboard-card c--space">

                            <div className="ui-dashboard-card-body  ui-hide-mobile-only">

                            <div className='cardb-inner'>
                            <ApexPieChart />
                             
                            </div>

                            < div className='ov-card blue mrgt2'>
                
                                                     

                             </div>
                            
                            </div>

                        </div>

                    </div>
                </div>

            </section>

            <div className='pdt pdb'></div>

            <section className='section'>

                <div className='row'>

                    <div className='col-md-8'>

                        <div className="ui-dashboard-card c--space">

                            <div className="ui-dashboard-card-body">

                                <div className='cardb-inner'>

                                    <div className='d-flex align-items-center'>

                                       <div className="adm-status">
                                            <p className='font-mattersemibold brandcc-purple fs-16 mrgb0'>Clients</p>
                                       </div>

                                       <Link  to="" className="btn mini gradient-red font-matterbold onwhite ml-auto">Add a client</Link>

                                    </div>

                                    <div className='empty-box xsm flat mrgt2 mrgb1' style={{ backgroundColor: '#f3f6fb' }}>

                                        <div className="ui-text-center">
                                    
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='col-md-4'>

                   < div className='ov-card blue'>
                
                                                     

                    </div>

                    </div>

                </div>

            </section>

        </>

    )

}

export default Home;