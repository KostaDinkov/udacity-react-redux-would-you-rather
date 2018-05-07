import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _isEmpty from 'lodash/isEmpty';

class Leaderboard extends Component {
    getLeaderboard() {
        let users = this.props.users;
        return Object.keys(users)
            .map(k => {
                users[k].score = Object.keys(users[k].answers).length + users[k].questions.length;
                return users[k];
            })
            .sort((a, b) => b.score - a.score);
    }

    render() {
        if (this.props.loading) {
            return null;
        }
        return (
            <Fragment>
                <h2>Leaderboard</h2>
                <ul>
                    {this.getLeaderboard().map((user, index) => (
                        <li key={user.id}>
                            <span>{index + 1}</span>
                            <img
                                src={user.avatarURL}
                                alt="avatar"
                                width='100'
                                height='100'
                            />
                            <p>{user.name}</p>
                            <p>Score: {user.score}</p>
                            <div>Answered questions: {Object.keys(user.answers).length}</div>
                            <div>Created questions: {user.questions.length}</div>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}

function mapStateToProps({users}) {
    if (_isEmpty(users)) {
        return {loading: true};
    }
    return {users};
}

export default connect(mapStateToProps)(Leaderboard);