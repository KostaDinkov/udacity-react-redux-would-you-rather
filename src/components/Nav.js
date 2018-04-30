import React from 'react';
import {connect} from 'react-redux';

class Nav extends React.Component {
  render() {
    const authedUser = this.props.authedUser;
    if (authedUser) {
      console.log('Authed : ', authedUser);
    }

    return (
      <div id='cssmenu'>
        <ul>
          <li className='active'><a href='#'>Home</a></li>
          <li><a href='#'>New Question</a></li>
          <li><a href='#'>Leader Board</a></li>
          {/* Todo add logout link*/}
          {authedUser && (<span id='authedUser'>Hello, {authedUser.name}</span>)}
          {authedUser && (<li><a href='#'>Logout</a></li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);