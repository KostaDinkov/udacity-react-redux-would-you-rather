import React, {Component, Fragment} from 'react';

class UnansweredDetails extends Component {

    state = {
        selectedOption: 'optionOne'
    };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedOption);
    };

    handleOptionChange = (e) => {
        this.setState({selectedOption: e.target.value});
    };

    render() {
        const question = this.props.question;
        const author = this.props.author;
        const authedUser = this.props.authedUser;
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

export default (UnansweredDetails);
