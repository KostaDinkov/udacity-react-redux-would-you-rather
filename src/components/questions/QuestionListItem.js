//core dependencies
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Grid, Button, Image, Header, Segment, Message} from 'semantic-ui-react';
//project modules
import config from '../../util/config'

const TEXT_PREVIEW_LEN = 15;

class QuestionListItem extends React.Component {
    handleDetails = (e) => {
        this.props.history.push(`/questions/${this.props.question.id}`);
    };

    render() {
        const avatar = this.props.author.avatarURL;
        const question = this.props.question;
        const optionOne = question.optionOne.text.slice(0, TEXT_PREVIEW_LEN) + '...';
        const author = this.props.author;
        return (
            <Fragment>
                <Message attached='top'>
                    <Header as='h4'>{author.name} asks:</Header>
                </Message>
                <Segment attached='bottom'>
                    <Grid centered>
                        <Grid.Row divided>
                            <Grid.Column  verticalAlign='middle' width={6}>
                                <Image centered size='tiny' src={avatar} alt="avatar"/>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Header as='h4'>Would you rather</Header>
                                <p style={{color: 'grey'}}>...{optionOne}</p>
                               <Button
                                    size='mini'
                                    basic
                                    fluid
                                    color={config.primaryColor}
                                    onClick={this.handleDetails}>
                                    View Poll
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Fragment>
        );
    }
}

function mapStateToProps({users}, {question}) {
    const author = users[question.author];
    return {
        author,
        question
    };
}

export default withRouter(connect(mapStateToProps)(QuestionListItem));