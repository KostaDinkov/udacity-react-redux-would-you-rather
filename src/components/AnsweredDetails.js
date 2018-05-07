import React, {Component, Fragment} from 'react';
import {Progress} from 'semantic-ui-react';

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
        const total = optionOneVotes + optionTwoVotes;
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

                    <div style={{width: '50%'}}>

                        <Progress
                            color='teal'
                            value={optionOneVotes}
                            total={total}
                            progress='ratio'
                            percent={this.getOptionPercent(optionOneVotes, optionTwoVotes)}
                        >
                            <div>
                                <span style={this.isSelected(1)}>✓</span>
                                <span>{question.optionOne.text}</span>
                            </div>
                        </Progress>

                        <Progress
                            color='teal'
                            value={optionTwoVotes}
                            total={total}
                            percent={this.getOptionPercent(optionTwoVotes, optionOneVotes)}
                        >
                            <div>
                                <span style={this.isSelected(2)}>✓</span>
                                <span>{question.optionTwo.text}</span>
                            </div>
                        </Progress>

                    </div>


                </div>
            </Fragment>
        );
    }
}

export default AnsweredDetails;
