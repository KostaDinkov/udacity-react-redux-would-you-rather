import React from 'react';
import {Grid, Message, Label} from 'semantic-ui-react';
import {MAX_COMPONENT_WIDTH} from '../util/config';

const NoMatch = () => {
    return (
        < Grid padded centered>
            <Grid.Column textAlign={'center'} style={{maxWidth: MAX_COMPONENT_WIDTH}}>
                <Message>
                    <Label color='teal' size='massive' circular>404</Label>
                    <h1>Ooops,</h1>
                    <h3>the page cannot be found</h3>
                </Message>

            </Grid.Column>
        </Grid>
    );
};
export default NoMatch;