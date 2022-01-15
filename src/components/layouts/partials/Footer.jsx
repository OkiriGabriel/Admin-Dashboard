import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const Footer = () => {

    const history = useHistory();
    const params = useParams();

    useEffect(() => {

    }, []);

  

    return (
        <>

            <footer className="section ui-wrapper-large bg-brandcc-purpledark">

                <div className="container ui-text-center">

                    <Link to="/" className="footer-logo" to=""><img src="../../../images/assets/logo-white.svg" alt="" /></Link>
                    <p className="font-matter fs-14 mrgb1 mrgt1" style={{color: '#918DC6'}}>Copyright &copy; 2021, Concreap Consult. All rights reserverd.</p>

                    <ul class="social_media list-inline onwhite mrgt">
                        <li class="list-inline-item "><a href="https://www.instagram.com/concreap/" target="_blank" className="ig link-underlined hover onwhite gradient-yellow"><i class="fab fa-instagram onwhite" aria-hidden="true"></i></a></li>
                        <li class="list-inline-item"><a href="https://twitter.com/concreap" target="_blank" className="fb link-underlined gradient-blue onwhite hover"><i class="fab fa-twitter onwhite" aria-hidden="true"></i></a></li>
                        <li class="list-inline-item"><a href="https://www.linkedin.com/company/concreap/" target="_blank" className="lkd link-underlined gradient-blue onwhite hover"><i class="fab fa-linkedin onwhite" aria-hidden="true"></i></a></li>
                    </ul>

                </div>

            </footer>
            
        </>
    )

}

export default Footer;