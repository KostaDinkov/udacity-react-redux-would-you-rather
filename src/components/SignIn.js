import React from 'react';
import {connect} from 'react-redux';
import {setUserId} from '../util/auth';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

class SignIn extends React.Component {
    state = {
        selectedUser: null,
        redirectToReferrer: false
    };
    handleSignIn = (e) => {
        e.preventDefault();
        const user = this.state.selectedUser;
        if (user === 'none' || !user) {
            toast.warn('Please select user!', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        setUserId(user.id);
        this.setState({redirectToReferrer: true});
    };
    handleUserSelect = (e) => {
        const user = this.props.users[(e.target.value)];
        this.setState({selectedUser: user});
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const users = this.props.users;
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }
        return (
            <div>
                <span>You must sign in to view this page: ({from.pathname})</span>
                <h2>Sign in</h2>
                <select id='userSelector' defaultValue='none' onChange={this.handleUserSelect}>
                    <option value='none' disabled='true'>Select user</option>
                    {Object.keys(users).map(key => (
                        <option key={users[key].id} value={users[key].id}>{users[key].name}</option>
                    ))}
                </select>
                <button onClick={this.handleSignIn}>Sign In</button>

            </div>
        );
    }
}

function mapStateToProps({users}) {
    return {users};
}

export default connect(mapStateToProps)(SignIn);