import React, {Component, Fragment} from 'react';
import {handleInitialData} from '../actions/shared';
import {connect} from 'react-redux';
import Nav from './Nav';
import SignIn from './SignIn';
import QuestionList from './QuestionList';
import LoadingBar from 'react-redux-loading-bar';
import QuestionsDashboard from './QuestionsDashboard'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <Nav/>
        <LoadingBar/>
        {this.props.loading
          ? null
          : !this.props.authedUser
            ? <SignIn/>
            : <QuestionsDashboard/>
        }
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return { authedUser, loading: !Object.keys(questions).length > 0 };

}

export default connect(mapStateToProps)(App);
