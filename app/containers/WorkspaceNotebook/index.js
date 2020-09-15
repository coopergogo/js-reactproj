import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Paper from "@material-ui/core/Paper";
import Button from "components/Button";

import './style.css';

const htmlCode = require('./iframe.html')

export function sendMsgToIframe() {
  alert("send message to iframe");
  const childFrameObj = document.getElementById('iframe_03');
  childFrameObj.contentWindow.postMessage({
    'action': 'call-iframe',
    'message': 'Message text from parent.'
  }, '*'); //window.postMessage
}


export function iframeOnLoad() {
  console.log("iframeOnLoad");
  document.getElementById("load_state").style.display = "none";
}

export class WorkspaceNotebook extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      access_token: 'j1mc1oxbVGNn0wOFHw_9NeKFEbJD_1UfFWhQzd4P29Q=',
      msg: '',
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
    let self = this;    //为了避免作用域及缓存
    window.receiveMessageFromIndex = function ( event ) {
      if(event != undefined){
        console.log( 'main received message:', event.data, event.origin, event.source );
        self.setState({
            msg: event.data.message
        })
      }
    }
    // listener message
    window.addEventListener("message", receiveMessageFromIndex, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  getAccessToken() {
    return "token-xxx";
  }

  render() {
    console.log(this.props);
    console.log("access token", this.state.access_token);
    // console.log(htmlCode);
    return (
      <div className='page-container workspace-container'>
          <Paper className='container-page main-container'>
            <div className='load-state-container'>
              <div id="load_state" className='load-state'>
                loading...
              </div>
            </div>
            {/* <iframe
              id="notebook_iframe_id"
              style={{width:'100%', height:'100%', overflow:'visible'}}
              ref="iframe"
              src= {'/jupyter/hub/login?access_token=' + this.state.access_token}
              // src= {'https://www.baidu.com'}
              width="100%"
              scrolling="no"
              frameBorder="0"
              onLoad= {iframeOnLoad.bind(this)}
            /> */}

            {/* <iframe
              id="iframe_02"
              style={{width:'100%', height:'30%', overflow:'visible'}}
              ref="iframe"
              // src= {'/jupyter/hub/login?access_token=' + this.state.access_token}
              src= {'https://www.baidu.com'}
              width="100%"
              scrolling="no"
              frameBorder="0"
              onLoad= {iframeOnLoad.bind(this)}
            /> */}
            <div><h1 style={{textAlign:"center"}}> Welcome Main!</h1></div>
            <Button onClick={sendMsgToIframe.bind(this)}>Send message to iframe</Button>
            <div style={{textAlign: "center"}}>
              <p>main received message : [{this.state.msg}]</p>
            </div>

            <iframe
              id="iframe_03"
              name="iframe_03"
              style={{width:'100%', height:'50%', overflow:'visible'}}
              ref="iframe"
              srcDoc= {htmlCode}
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
