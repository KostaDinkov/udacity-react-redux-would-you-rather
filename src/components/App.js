import React, {Component, Fragment} from 'react';
import {handleInitialData} from '../actions/shared';
import {connect} from 'react-redux';
import Nav from './Nav';
import {Route, Switch, withRouter} from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import QuestionsDashboard from './QuestionsDashboard';
import NewQuestion from './NewQuestion';
import {ToastContainer} from 'react-toastify';
import QuestionDetails from './QuestionDetails';
import NoMatch from './NoMatch'
import Leaderboard from './Leaderboard';
import Logout from './Logout';
import SignIn from './SignIn';


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
                    <Route exact path='/' render={() => {
                        return this.props.loading
                            ? null
                            : <QuestionsDashboard/>;
                    }
                    }/>
                    <Route exact path='/newQuestion' component={NewQuestion}/>
                    <Route exact path ='/signIn' component={SignIn}/>
                    <Route exact path='/leaderBoard' component={Leaderboard}/>
                    <Route exact path='/questions/:id' component={QuestionDetails}/>
                    <Route exact path='/logout' component={Logout}/>
                    <Route component={NoMatch}/>
                </Switch>
                <ToastContainer autoClose={3000}/>


            </Fragment>
        );
    }
}

function mapStateToProps({questions}) {
    return {loading: !Object.keys(questions).length > 0};

}

export default withRouter(connect(mapStateToProps)(App));
