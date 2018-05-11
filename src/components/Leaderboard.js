import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import {Message, Grid,Header,Segment,Image,Icon,Label,Table} from 'semantic-ui-react';
import {MAX_COMPONENT_WIDTH} from '../util/config';


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
    getAwardColor(index){
        switch (index){
            case 1: return 'yellow';
            case 2: return 'teal';
            case 3: return 'grey'
        }
    }

    render() {
        if (this.props.loading) {
            return null;
        }
        return (
            <Fragment>
                <Grid centered padded>
                    <Grid.Column style={{maxWidth:MAX_COMPONENT_WIDTH}}>
                    {this.getLeaderboard().map((user, index) => (
                            <Fragment key={user.id} >
                                <Segment >
                                    {index<4
                                    ?<Label corner='left' ><Icon name='winner' color={this.getAwardColor(index+1)}/></Label>
                                    :null}
                                    <Grid >
                                        <Grid.Row divided >
                                            <Grid.Column verticalAlign='middle' width={4}>
                                                <Image src={user.avatarURL} alt="avatar"/>
                                            </Grid.Column>

                                            <Grid.Column   width={8}>
                                                <Header as='h2'>{user.name}</Header>
                                                <Table basic={'very'}>
                                                    <Table.Body>
                                                    <Table.Row>
                                                        <Table.Cell> Answered questions</Table.Cell>
                                                        <Table.Cell>{Object.keys(user.answers).length}</Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell> Created questions</Table.Cell>
                                                        <Table.Cell>{user.questions.length}</Table.Cell>
                                                    </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>

                                            <Grid.Column textAlign='center' verticalAlign='middle' width={4} >
                                                <Message attached='top'>Score</Message>
                                                <Segment attached='bottom'>
                                                <Label color='teal' circular size='huge'>{user.score}</Label>
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Fragment>
                    ))}
                    </Grid.Column>
                </Grid>
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