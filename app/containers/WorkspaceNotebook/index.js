import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Paper from "@material-ui/core/Paper";

import './style.css';

export function iframeOnLoad() {
  console.log("iframeOnLoad");
  document.getElementById("load_state").style.display = "none";
}

export class WorkspaceNotebook extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      access_token: 'j1mc1oxbVGNn0wOFHw_9NeKFEbJD_1UfFWhQzd4P29Q=',
    }
  };

  componentWillMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    console.log(this.props);
    console.log("access token", this.state.access_token);
    return (
      <div className='page-container workspace-container'>
          <Paper className='container-page main-container'>
            <div className='load-state-container'>
              <div id="load_state" className='load-state'>
                loading...
              </div>
            </div>
            <iframe
              id="notebook_iframe_id"
              style={{width:'100%', height:'100%', overflow:'visible'}}
              ref="iframe"
              src= {'/jupyter/hub/login?access_token=' + this.state.access_token}
              // src= {'https://www.baidu.com'}
              width="100%"
              scrolling="no"
              frameBorder="0"
              onLoad= {iframeOnLoad.bind(this)}
            />
          </Paper>

      </div>
    );
  }
}

WorkspaceNotebook.propTypes = {
  // changeRoute: PropTypes.func,
  // setSpinner: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    // changeRoute: url => dispatch(push(url)),
    // setSpinner: (d) => dispatch(setSpinner(d)),
  };
}

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(WorkspaceNotebook);
