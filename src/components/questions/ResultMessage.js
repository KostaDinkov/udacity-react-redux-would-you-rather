import React from 'react'
import {Message,Progress,Label,Header} from 'semantic-ui-react'
import config from '../../util/config'


const ResultMessage = (props)=>{
    const selected = props.selected;
    const questionText = props.questionText;
    const voteCount = props.voteCount;
    const totalVotes = props.totalVotes;

    return (
        <Message  color={selected?config.primaryColor:'grey'}>
            <Header as='h4'>Would you rather {questionText}?</Header><br/>
            <Label
                circular
                color={config.secondaryColor}
                floating style={selected?{}:{display:'none'}}
            >
                Your vote
            </Label>
            <Progress
                color={config.primaryColor}
                value={voteCount}
                total={totalVotes}
                progress='percent'
                precision={1}
            >
                {`${voteCount} out of ${totalVotes} votes`}
            </Progress>
        </Message>
    )
};

export default ResultMessage;