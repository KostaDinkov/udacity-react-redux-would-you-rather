import React from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/users';

class SignIn extends React.Component {

  state = { selectedUser: null };

  handleSignIn = (e) => {
    const user= this.state.selectedUser;
    this.props.dispatch(setAuthedUser(user));
  };

  handleUserSelect = (e) => {
    const user = this.props.users[(e.target.value)];
    this.setState({selectedUser:user});

  };

  render() {
    const users = this.props.users;
    console.log(this.state.selectedUser);
    return (
      <div>
        <h2>Please Sign in</h2>
        <select id='userSelector' onChange={this.handleUserSelect}>
          <option value='none' disabled='true' defaultValue='none' selected='true'>Select user</option>
          {Object.keys(users).map(key => (
            <option key={users[key].id} value={users[key].id}>{users[key].name}</option>
          ))}
        </select>
        <button onClick={this.handleSignIn}>Sign In</button>

      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(SignIn);