import React, {Fragment, Component} from 'react';
import * as auth from '../util/auth'
import {withRouter} from 'react-router';
import { handleCreateQuestion} from '../actions/questions';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';


class NewQuestion extends Component {
    state = {
        option1: '',
        option2: ''
    };

    updateField = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    };

    handleSubmit = () => {
        const question = {
            optionOneText: this.state.option1,
            optionTwoText: this.state.option2,
            author: auth.getUserId(),
        };
        if (NewQuestion.validateInput(question)) {
            this.props.dispatch(handleCreateQuestion(question,auth.getUserId()))
                .then(() => {
                    this.props.history.push('/');
                    toast.success('Question saved!');
                })
                .catch(() => toast.error('There was an error.Please try again.'));
        }
    };

    static validateInput(question) {
        let isValid = true;
        if (question.optionOneText.length === 0 || question.optionTwoText.length === 0) {
            isValid = false;
            toast.warn('Please provide both options!');
        }
        return isValid;
    }

    render() {
        return (
            <Fragment>
                <h2>Create New Question</h2>
                <form>
                    <label htmlFor="option1">Option One</label>
                    <input onChange={this.updateField} type="text" placeholder='Enter question text' id='option1'
                           value={this.state.option1}/>
                    <br/>
                    <label htmlFor="option2">Option Two</label>
                    <input onChange={this.updateField} type="text" placeholder='Enter question text' id='option2'
                           value={this.state.option2}/>
                    <br/>
                    <button type='button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </Fragment>
        );
    }
}


export default withRouter(connect()(NewQuestion));