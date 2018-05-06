import React, {Fragment, Component} from 'react';
import QuestionList, {listFilters} from './QuestionList';
import _isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';

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
        if (!this.props.loading) {
            return (
                <Fragment>
                    <div className="w3-container">
                        <div className="w3-bar w3-black">
                            <button className="w3-bar-item w3-button tablink w3-red"
                                    onClick={(e) => QuestionsDashboard.toggleList(e, 'unanswered')}>Unanswered Questions
                            </button>
                            <button className="w3-bar-item w3-button tablink"
                                    onClick={(e) => QuestionsDashboard.toggleList(e, 'answered')}>Answered Questions
                            </button>
                        </div>
                        <div id="unanswered" className="w3-container w3-border city">
                            <QuestionList filter={listFilters.UNANSWERED}/>
                        </div>
                        <div id="answered" className="w3-container w3-border city" style={{display: 'none'}}>
                            <QuestionList filter={listFilters.ANSWERED}/>
                        </div>
                    </div>
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
    else return {loading:false};
}

export default connect(mapStateToProps)(QuestionsDashboard);