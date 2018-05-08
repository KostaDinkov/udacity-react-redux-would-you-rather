import React, {Fragment, Component} from 'react';
import QuestionList, {listFilters} from './QuestionList';
import _isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';
import {Tab, Grid} from 'semantic-ui-react';

class QuestionsDashboard extends Component {
    static toggleList(evt, listName) {
        let x;
        let tablinks;
        x = document.getElementsByClassName('city');
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablink');
        for (let i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' w3-red', '');
        }
        document.getElementById(listName).style.display = 'block';
        evt.currentTarget.className += ' w3-red';
    }

    render() {
        const tabPanes = [
            {
                menuItem: 'Unanswered Questions',
                render: () => <Tab.Pane> <QuestionList filter={listFilters.UNANSWERED}/></Tab.Pane>
            },
            {
                menuItem: 'Answered Questions',
                render: () => <Tab.Pane> <QuestionList filter={listFilters.ANSWERED}/></Tab.Pane>
            }
        ];
        if (!this.props.loading) {
            return (
                <Fragment>
                    <Grid
                        centered
                        style={{height:'70%', marginTop:'2%'}}

                    >
                        <Grid.Column style={{maxWidth:450}}>
                            <Tab panes={tabPanes} menu={{ color:'teal',widths:2}}/>
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

function mapStateToProps({users}) {
    if (_isEmpty(users)) {
        return {loading: true};
    }
    else return {loading: false};
}

export default connect(mapStateToProps)(QuestionsDashboard);