import React, {Fragment} from 'react';
import QuestionListItem from './QuestionListItem';

class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions;
        if (questions.length > 0) {
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
        else {
            return (<p>No questions to show</p>);
        }
    }
}

export default QuestionList;