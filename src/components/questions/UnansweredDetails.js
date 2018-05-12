//core depencencies
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {Grid, Segment, Image, Form, Radio, Button, Message,Header} from 'semantic-ui-react';
//project modules
import {saveAnswer} from '../../data/api';
import {receiveQuestions} from '../../actions/questions';
import {receiveUsers} from '../../actions/users';
import config from '../../util/config';

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
                    <Grid.Column style={{maxWidth:config.MAX_COMPONENT_WIDTH}}>
                        <Message attached='top'>
                            <Header as='h4' >{author.name} asks:</Header>
                        </Message>
                        <Segment attached='bottom'>
                            <Grid >
                                <Grid.Row divided >
                                    <Grid.Column verticalAlign='middle' width={6}>
                                        <Image src={author.avatarURL} alt="avatar"/>
                                    </Grid.Column>
                                    <Grid.Column  verticalAlign='bottom' width={10}>
                                        <h2>Would You Rather ...</h2>
                                        <Form onSubmit={this.handleSubmit}>
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
                                                    label={question.optionTwo.text}
                                                />
                                            <Button fluid color={config.primaryColor} type="submit">Submit</Button>
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
