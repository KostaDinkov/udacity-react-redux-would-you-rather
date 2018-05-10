import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Grid, Button, Image, Header, Segment} from 'semantic-ui-react';

const TEXT_PREVIEW_LEN = 15;

class QuestionListItem extends React.Component {
    handleDetails = (e) => {
        this.props.history.push(`/questions/${this.props.question.id}`);
    };

    render() {
        const avatar = this.props.author.avatarURL;
        const question = this.props.question;
        const optionOne = question.optionOne.text.slice(0, TEXT_PREVIEW_LEN) + '...';
        const optionTwo = question.optionTwo.text.slice(0, TEXT_PREVIEW_LEN) + '...';
        const author = this.props.author;
        return (
            <Fragment>

                <Grid centered>
                    <Grid.Row divided>
                        <Grid.Column verticalAlign='middle' width={6}>
                            <Image src={avatar} alt="avatar"/>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Header as='h4'> {author.name}</Header>
                            <Segment>
                                <div>1.{optionOne}</div>
                                <div>2.{optionTwo}</div>
                            </Segment>

                            <Button
                                size='mini'
                                basic
                                fluid
                                color='teal'
                                onClick={this.handleDetails}>
                                View Poll
                            </Button>



                        </Grid.Column>
                    </Grid.Row>


                </Grid>

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