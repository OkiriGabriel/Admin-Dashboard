import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage'
import body from '../../helpers/body'

import UserContext from '../../../context/user/userContext';

import { useNetworkDetect } from '../../helpers/hooks'

const SideBar = ({ barState }) => {

    const startRef = useRef(null)

    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    const userContext = useContext(UserContext);

    const [dropType, setType] = useState('');
    const [active, setActive] = useState('dashboard');

    const [start, setStart] = useState(false);

    useEffect(() => {



    }, [])

    useNetworkDetect()


    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const goTo = (e, url) => {
        if(e) e.preventDefault()
        storage.keep('biztab', 'two')
        history.push(url)
    }


    const openDrop = (e,type, t) => {
        if(e) e.preventDefault()
  
        if(dropType === type){
          setType('');
          
        }else{
          setType(type);
          setActive(t);
        }
        
    }

    const goto = (e, url, t) => {

        if(e){
            e.preventDefault()
        }
  
        storage.keep('menu', t);
        setActive(t);
        history.push(url);
  
    }

    return (

        <>
        
        {/* <Link onClick={initializeModal} ref={startRef} className='ui-hide'></Link> */}

          <div className='ui-monitor'>
            <div className='d-flex'>
              <div />
              <div className='ml-auto'>
                <Link to='/' className='pullin--btn onblack'>
                  <span
                    className='fe fe-arrow-left fs-20'
                    style={{ color: '#2F80ED' }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <section id="ui-sidebar" className={`ui-sidebar ssbar--open`}>

            <div className='ui-sidebar-primary ssbar--open'>

                <div className="ui-sidebar-primary-header mrgt2">

                    <Link to="/dashboard" className="font-matterbold fs-25 onwhite">T - P O I N T</Link>

                </div>

                <div className='ui-sidebar-primary-body'>

                    <div className="ui-separate-small ui-show-mobile-only"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links primary-nav`}>

                        <li className={ `${active === 'overview' ? 'active' : ''} nav-list` }>
                            <Link to='' className='ui-icon-animate link' title='Overview'>
                                <span style={{position: 'relative', left: '-3px', lineHeight: '0px'}} className='concreap-icon sl'><img src={`../../../images/icons/${active === 'overview' ? '': 'd'}home.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Overview
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'courses' ? 'active' : ''} nav-list` }>
                            <Link  to='' className='ui-icon-animate link' title='Courses'>
                                <span className='concreap-icon sl ' style={{position: 'relative', left: '-4px'}}><img src={`../../../images/icons/${active === 'courses' ? '': 'd'}course.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                     Activities
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'group' ? 'active' : ''} nav-list` }>
                            <Link to='' className='ui-icon-animate link' title='Group'>
                                <span style={{position: 'relative', left: '-4px'}} className='concreap-icon md'><img src={`../../../images/icons/${active === 'group' ? '': 'd'}team.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                Clients
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'mentor' ? 'active' : ''} nav-list` }>
                            <Link  to='' className='ui-icon-animate link' title='Mentor'>
                                <span style={{position: 'relative', left: '-3px'}} className='concreap-icon xsl'><img src={`../../../images/icons/${active === 'mentor' ? '': 'd'}mentor.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '1px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    General
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'settings' ? 'active' : ''} nav-list` }>
                            <Link  to='' className='ui-icon-animate link' title='Group'>
                                <span style={{position: 'relative', left: '-4px', lineHeight: '0px'}} className='concreap-icon md'><img src={`../../../images/icons/${active === 'settings' ? '': 'd'}settings.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterregular fs-13'>
                                    Settings
                                </span>
                            </Link>
                        </li>

                        <li className={ `nav-list` }>
                            <Link to='' className='ui-icon-animate link' title='Logout'>
                                <span className='concreap-icon smd'><img src="../../../images/icons/dpower.svg" alt="icon" /></span>
                                <span className='lnk--text sb-text font-matterregular fs-13'>
                                    Logout
                                </span>
                            </Link>
                        </li>

                       
                    </ul>

                    <div className="ui-line bg-silverlight"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links`}>

                        

                    </ul>

                </div>
            
            </div>
          
          </section>
        
        </>

    )

}

export default SideBar;