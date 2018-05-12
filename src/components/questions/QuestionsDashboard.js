//core dependencies
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Tab} from 'semantic-ui-react';
//project modules
import config from '../../util/config';
import QuestionList from './QuestionList';
import {getUserId} from '../../util/auth';

class QuestionsDashboard extends Component {
    filters = {
        answered: (k, authedUserId, questions) => (
            questions[k].optionOne.votes.includes(authedUserId)
            ||
            questions[k].optionTwo.votes.includes(authedUserId)),
        unanswered: (k, authedUserId, questions) => (
            !questions[k].optionOne.votes.includes(authedUserId)
            &&
            !questions[k].optionTwo.votes.includes(authedUserId))
    };

    getFilteredQuestions(filter) {
        const questions = this.props.questions;
        const authedUserId = getUserId();
        return Object.keys(questions)
            .filter((k) => filter(k, authedUserId, questions))
            .map(k => questions[k]).sort((a, b) => b.timestamp - a.timestamp);
    }

    render() {
        if (!this.props.loading) {
            const unansweredQuestions = this.getFilteredQuestions(this.filters.unanswered);
            const answeredQuestions = this.getFilteredQuestions(this.filters.answered);
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
                    <Grid padded centered>
                        <Grid.Column style={{maxWidth: config.MAX_COMPONENT_WIDTH}}>
                            <Tab panes={tabPanes} menu={{color: config.primaryColor, widths: 2, attached: 'top'}}/>
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
    if (Object.keys(users).length===0) {
        return {loading: true};
    }
    else return {loading: false, questions};
}

export default connect(mapStateToProps)(QuestionsDashboard);