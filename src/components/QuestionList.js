import React, {Fragment} from 'react';
import QuestionListItem from './QuestionListItem';
import {Item,Segment} from 'semantic-ui-react'


class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions;
        return (
            <Fragment>
                    {questions.map(q => (
                        <Segment  key={q.id} >
                            <QuestionListItem question={q}/>
                        </Segment>
                    ))}
            </Fragment>
        );
    }
}

export default QuestionList;