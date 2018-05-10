import React, {Fragment} from 'react';
import QuestionListItem from './QuestionListItem';

class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions;
        return (
            <Fragment>
                {questions.map(q => (
                    <Fragment key={q.id}>
                        <QuestionListItem question={q}/>
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

export default QuestionList;