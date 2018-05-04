import React, {Component, Fragment} from 'react';
import {handleInitialData} from '../actions/shared';
import {connect} from 'react-redux';
import Nav from './Nav';
import SignIn from './SignIn';
import {Route, Switch, withRouter} from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import QuestionsDashboard from './QuestionsDashboard';
import NewQuestion from './NewQuestion';
import {ToastContainer} from 'react-toastify';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Fragment>
                <Nav/>
                <LoadingBar/>
                <Switch>
                    <Route exact path='/' render={() => {
                        return (
                            this.props.loading
                                ? null
                                : <QuestionsDashboard/>
                        );
                    }}/>
                    <Route exact path='/newQuestion' component={NewQuestion}/>
                    <Route exact path='/leaderBoard' render={() => <div>Leader Board component here</div>}/>

                </Switch>
                <ToastContainer autoClose={3000}/>


            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, questions}) {
    return {authedUser, loading: !Object.keys(questions).length > 0};

}

export default withRouter(connect(mapStateToProps)(App));
