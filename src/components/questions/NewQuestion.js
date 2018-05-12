//core dependencies
import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {Grid, Segment, Header, Form, Input, Button, Divider} from 'semantic-ui-react';
//project modules
import {handleCreateQuestion} from '../../actions/questions';
import * as auth from '../../util/auth';
import config from '../../util/config';

class NewQuestion extends Component {
    state = {
        option1: '',
        option2: ''
    };
    handleChange = (e,{value}) => {
        e.preventDefault();
        this.setState({[e.target.id]: value});
    };
    handleSubmit = () => {
        const question = {
            optionOneText: this.state.option1,
            optionTwoText: this.state.option2,
            author: auth.getUserId(),
        };
        if (NewQuestion.validateInput(question)) {
            this.props.dispatch(handleCreateQuestion(question, auth.getUserId()))
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
                <Grid centered padded>
                    <Grid.Column style={{maxWidth: config.MAX_COMPONENT_WIDTH}}>
                        <Header textAlign='center' as='h1' attached='top'>Create New Question</Header>
                        <Segment attached={'bottom'}>
                            <p>Complete the question:</p>
                            <h3>Would you rather ...</h3>
                            <Form  onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <Input onChange={this.handleChange}
                                           placeholder='Enter Option One Text Here'
                                           value={this.state.option1}
                                           id='option1'
                                    />
                                </Form.Field>
                                <Divider horizontal>OR</Divider>
                                <Form.Field >
                                    <Input onChange={this.handleChange}
                                           placeholder='Enter Option Two Text Here'
                                           value={this.state.option2}
                                           id='option2'
                                    />
                                </Form.Field>
                                <Button fluid color={config.primaryColor} type='submit' >Submit</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Fragment>
        );
    }
}

export default withRouter(connect()(NewQuestion));