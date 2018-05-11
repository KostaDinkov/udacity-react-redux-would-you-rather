import React, {Component, Fragment} from 'react';
import {MAX_COMPONENT_WIDTH} from '../../util/config';
import {Grid, Segment, Image, Header,Message} from 'semantic-ui-react';
import {getUserId} from '../../util/auth';
import ResultMessage from './ResultMessage';

class AnsweredDetails extends Component {
    isSelected(n) {
        return (this.props.question.optionOne.votes.includes(getUserId()) ? 1 : 2) === n;
    }

    render() {
        const question = this.props.question;
        const author = this.props.author;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const total = optionOneVotes + optionTwoVotes;
        return (
            <Fragment>
                <Grid centered padded>
                    <Grid.Column style={{maxWidth: MAX_COMPONENT_WIDTH}}>
                        <Message attached='top'>
                            <Header as='h4'>Asked by {author.name}</Header>
                        </Message>
                        <Segment attached='bottom'>
                            <Grid centered>
                                <Grid.Row divided>
                                    <Grid.Column verticalAlign='middle' width={6}>
                                        <Image src={author.avatarURL} alt="avatar"/>

                                    </Grid.Column>

                                    <Grid.Column width={10}>
                                        <Header as='h2'>Results:</Header>
                                        <ResultMessage
                                            voteCount={optionOneVotes}
                                            totalVotes={total}
                                            selected={this.isSelected(1)}
                                            questionText={question.optionOne.text}
                                        />
                                        <ResultMessage
                                            voteCount={optionTwoVotes}
                                            totalVotes={total}
                                            selected={this.isSelected(2)}
                                            questionText={question.optionTwo.text}
                                        />
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

export default AnsweredDetails;
