import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import {Grid, Tab} from 'semantic-ui-react';
import {MAX_COMPONENT_WIDTH} from '../../util/config';
import QuestionList, {listFilters} from './QuestionList';
import {getUserId} from '../../util/auth';

class QuestionsDashboard extends Component {
    static toggleList(evt, listName) {
        let x;
        let tablinks;
        x = document.getElementsByClassName('city');
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablink');
        for (let i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' w3-red', '');
        }
        document.getElementById(listName).style.display = 'block';
        evt.currentTarget.className += ' w3-red';
    }

    render() {
        if (!this.props.loading) {
            const authedUserId = getUserId();
            const questions = this.props.questions;
            const unansweredQuestions = Object.keys(questions)
                .filter((k) => (
                    !questions[k].optionOne.votes.includes(authedUserId)
                    &&
                    !questions[k].optionTwo.votes.includes(authedUserId)))
                .map(k => questions[k]);
            const answeredQuestions = Object.keys(questions)
                .filter((k) => (
                    questions[k].optionOne.votes.includes(authedUserId)
                    ||
                    questions[k].optionTwo.votes.includes(authedUserId)))
                .map(k => questions[k]);
            const tabPanes = [
                {
                    menuItem: 'Unanswered Questions',
                    render: () => <Tab.Pane> <QuestionList questions={unansweredQuestions}/></Tab.Pane>
                },
                {
                    menuItem: 'Answered Questions',
                    render: () => <Tab.Pane> <QuestionList questions={answeredQuestions}/></Tab.Pane>
                }
            ];
            return (
                <Fragment>
                    <Grid
                        padded
                        centered
                    >
                        <Grid.Column style={{maxWidth: MAX_COMPONENT_WIDTH}}>
                            <Tab panes={tabPanes} menu={{color: 'teal', widths: 2, attached:'top'}}/>
                        </Grid.Column>
                    </Grid>
                </Fragment>
            );
        }
        else {
            return null;
        }
    }
}

function mapStateToProps({users, questions}) {
    if (_isEmpty(users)) {
        return {loading: true};
    }
    else return {loading: false, questions};
}

export default connect(mapStateToProps)(QuestionsDashboard);