import React, {Fragment} from 'react';
import QuestionListItem from './QuestionListItem';
import {Item} from 'semantic-ui-react'


class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions;
        return (
            <Fragment>
                <Item.Group>
                    {questions.map(q => (
                        <Item  key={q.id}>
                            <QuestionListItem question={q}/>
                        </Item>
                    ))}
                </Item.Group>
            </Fragment>
        );
    }
}

export default QuestionList;