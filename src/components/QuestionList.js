import React, {Fragment} from 'react';
import QuestionListItem from './QuestionListItem';


class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions;
        return (
            <Fragment>
                <ul>
                    {questions.map(q => (
                        <li key={q.id}>
                            <QuestionListItem question={q}/>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}

export default QuestionList;