import React, {Component, Fragment} from 'react';
import {saveAnswer} from '../data/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { showLoading, hideLoading} from 'react-redux-loading-bar'
import { receiveQuestions } from '../actions/questions';
import {receiveUsers} from '../actions/users';


class UnansweredDetails extends Component {

    state = {
        selectedOption: 'optionOne'
    };
    updateUsers = (data)=>{

    };


    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            authedUser:this.props.authedUser.id,
            qid:this.props.question.id,
            answer:this.state.selectedOption
        };

        this.props.dispatch(showLoading());
        saveAnswer(data)
            .then((res)=>{

                this.props.dispatch(receiveQuestions(res.questions));
                this.props.dispatch(receiveUsers(res.users));
                this.props.history.push(`/questions/${this.props.question.id}`);

            })

            .finally(()=> this.props.dispatch(hideLoading()));

    };

    handleOptionChange = (e) => {
        this.setState({selectedOption: e.target.value});
    };

    render() {
        const question = this.props.question;
        const author = this.props.author;

        return (
            <Fragment>
                <div >
                    <img src={author.avatarURL} alt="avatar" width='100' height='100' style={{float: 'left'}}/>
                    <p>Author :{author.name}</p>
                    <h2>Would You Rather:</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type="radio" id='optionOne' value='optionOne'
                               checked={this.state.selectedOption === 'optionOne'} onChange={this.handleOptionChange}/>
                        <label htmlFor='optionOne'>{question.optionOne.text}</label>
                        <br/>
                        <input type="radio" id='optionTwo' value='optionTwo'
                               checked={this.state.selectedOption === 'optionTwo'} onChange={this.handleOptionChange}/>
                        <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                        <br/>
                        <input type="submit" value='Submit'/>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(connect()(UnansweredDetails));
