import React, {Component, Fragment} from 'react';
import Progress from 'react-bootstrap/lib/ProgressBar';

class AnsweredDetails extends Component {
    isSelected(n) {
        if ((this.props.question.optionOne.votes.includes(this.props.author.id) ? 1 : 2) === n) {
            return {};
        }
        return {display: 'none'};
    }

    getOptionPercent(votesOne, votesTwo) {
        return 100 * (votesOne / (votesOne + votesTwo));
    }

    render() {
        const question = this.props.question;
        const author = this.props.author;

        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;

        return (
            <Fragment>
                <div>
                    <img src={author.avatarURL}
                         alt="avatar"
                         width='100'
                         height='100'
                         style={{float: 'left'}}
                    />
                    <p>Author :{author.name}</p>
                    <h2>Would You Rather:</h2>
                    <div>
                        <span style={this.isSelected(1)}>✓</span>
                        <span>{question.optionOne.text}</span>
                    </div>
                    <div>
                        <span style={this.isSelected(2)}>✓</span>
                        <span>{question.optionTwo.text}</span>
                    </div>
                    <div style={{width: '50%'}}>
                        <Progress>
                            <Progress
                                label={`Option One: ${optionOneVotes} votes`}
                                bsStyle='info'
                                now={this.getOptionPercent(optionOneVotes, optionTwoVotes)}
                                key={1}
                            />
                            <Progress
                                label={`Option Two: ${optionTwoVotes} votes`}
                                bsStyle='warning'
                                now={this.getOptionPercent(optionTwoVotes, optionOneVotes)}
                                key={2}
                            />
                        </Progress>
                    </div>


                </div>
            </Fragment>
        );
    }
}

export default AnsweredDetails;
