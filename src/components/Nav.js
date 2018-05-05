import React from 'react';
import * as auth from '../util/auth'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { withRouter} from 'react-router';

class Nav extends React.Component {
  render() {
    const authedUser = this.props.users[auth.getUserId()];
    if (authedUser) {
      console.log('Authed : ', authedUser);
    }

    return (
      <div id='cssmenu'>
        <ul>
           <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
           <li><NavLink  to='/newQuestion' activeClassName ='active'>New Question</NavLink></li>
           <li><NavLink  to='/leaderBoard' activeClassName = 'active'>Leader Board</NavLink></li>
          {/* Todo add logout link*/}
          {authedUser && (<span id='authedUser'>Hello, {authedUser.name}</span>)}
          {authedUser && (<li><a href='#'>Logout</a></li>)}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({users}){
    return {users}
}


export default withRouter(connect(mapStateToProps)(Nav));