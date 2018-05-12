//core dependencies
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import {ToastContainer} from 'react-toastify';
//project modules
import {handleInitialData} from '../actions/shared';
import Nav from './Nav';
import QuestionsDashboard from './questions/QuestionsDashboard';
import NewQuestion from './questions/NewQuestion';
import QuestionDetails from './questions/QuestionDetails';
import NoMatch from './NoMatch';
import Leaderboard from './Leaderboard';
import Logout from './Logout';
import SignIn from './SignIn';
import PrivateRoute from './PrivateRoute';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Fragment>
                <Nav/>
                <LoadingBar/>
                <Switch>
                    <PrivateRoute exact path='/' component={QuestionsDashboard}/>
                    <PrivateRoute exact path='/add' component={NewQuestion}/>
                    <Route exact path='/signIn' component={SignIn}/>
                    <PrivateRoute exact path='/leaderboard' component={Leaderboard}/>
                    <PrivateRoute exact path='/questions/:id' component={QuestionDetails}/>
                    <Route exact path='/logout' component={Logout}/>
                    <Route component={NoMatch}/>
                </Switch>
                <ToastContainer autoClose={3000}/>
            </Fragment>
        );
    }
}

export default withRouter(connect()(App));
