import React, {Component, Fragment} from 'react';
import {saveAnswer} from '../data/api';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {receiveQuestions} from '../actions/questions';
import {receiveUsers} from '../actions/users';
import {Grid, Segment, Image, Form, Radio, Button} from 'semantic-ui-react';
import {MAX_COMPONENT_WIDTH} from '../util/config';

class UnansweredDetails extends Component {
    state = {
        selectedOption: 'optionOne'
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            authedUser: this.props.authedUser.id,
            qid: this.props.question.id,
            answer: this.state.selectedOption
        };
        this.props.dispatch(showLoading());
        saveAnswer(data)
            .then((res) => {
                this.props.dispatch(receiveQuestions(res.questions));
                this.props.dispatch(receiveUsers(res.users));
                this.props.history.push(`/questions/${this.props.question.id}`);
            })
            .finally(() => this.props.dispatch(hideLoading()));
    };
    handleOptionChange = (e, {value}) => {
        this.setState({selectedOption: value});
    };

    render() {
        const question = this.props.question;
        const author = this.props.author;
        return (
            <Fragment>
                <Grid centered padded>
                    <Grid.Column style={{maxWidth:MAX_COMPONENT_WIDTH}}>

                        <Segment>
                            <Grid centered>
                                <Grid.Row divided>
                                    <Grid.Column verticalAlign='middle' width={6}>
                                        <Image src={author.avatarURL} alt="avatar"/>
                                    </Grid.Column>

                                    <Grid.Column width={10}>
                                        <p>Author: {author.name}</p>
                                        <h2>Would You Rather:</h2>

                                        <Form onSubmit={this.handleSubmit}>
                                            <Segment>
                                                <Form.Field
                                                    control={Radio}
                                                    value='optionOne'
                                                    checked={this.state.selectedOption === 'optionOne'}
                                                    onChange={this.handleOptionChange}
                                                    label={question.optionOne.text}
                                                />

                                                <Form.Field
                                                    control={Radio}
                                                    value='optionTwo'
                                                    checked={this.state.selectedOption === 'optionTwo'}
                                                    onChange={this.handleOptionChange}
                                                    label={question.optionOne.text}
                                                />
                                            </Segment>
                                            <Button fluid color='teal' type="submit">Submit</Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

export default withRouter(connect()(UnansweredDetails));
