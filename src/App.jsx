import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLoader from './components/helpers/MainLoader'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorUI from './components/layouts/globals/ErrorUI'

import DashboardLayout from './components/layouts/globals/Dashboard'

//context api states
import UserState from './context/user/userState'
import ResourceState from './context/resource/resourceState'

// components: lazyload pages
const NotFound = React.lazy(() => import('./components/pages/404'));

const StudentDashboard = React.lazy(() => import('./components/pages/dashboard/Home'));


const App = () => {

  const errorHandler = (err, info) => {

    console.log(err, 'logged error');
    console.log(info, 'logged error info');

  }
  
  return(

    <Router>

      <UserState>

          <ResourceState>

            <Suspense fallback={MainLoader.MainLoader()}>

              <ErrorBoundary fallback={ErrorUI()} onError={errorHandler} >

                <Switch>

                  <Route exact path="/" component={DashboardLayout(StudentDashboard, 'Overview')} />


                  <Route exact path="*" component={NotFound} />
                </Switch>

              </ErrorBoundary>

            </Suspense>

          </ResourceState>
        
      </UserState>
                

    </Router>
    
  )
}

export default App;