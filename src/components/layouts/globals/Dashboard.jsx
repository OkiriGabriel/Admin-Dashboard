import React, { Component } from 'react';
import storage from '../../helpers/storage'

import SideBar from '../partials/SideBar'
import TopBar from '../partials/TopBar'

const Dashboard = (DashboardComponent, pageTitle, showBack) => {



    return class DashboardLayout extends Component {

        constructor(props){
            super();
            this.state = {
                collapsed: false
            }
        }

        componentDidMount(){

            
        }
        

        render(){

            return (
                <>
                    {/* made changes dddd */}

                    <SideBar {...this.props} />

                    <main id="ui-dashboard-body" className={`ui-dashboard-body sdbr--open d-body`}>

                        <TopBar barType="student" showBack={showBack} pageTitle={pageTitle} isFixed={true} />
                        
                        <div className="ui-body-content">
                            <div className="ui-body-content-inner">
                                <DashboardComponent {...this.props} />
                            </div>
                        </div>
                        
                        
                    </main>

                </>
            )

        }

    }

}

export default Dashboard;