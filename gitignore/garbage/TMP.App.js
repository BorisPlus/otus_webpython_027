import React from 'react';
import {connect} from 'react-redux';
//import appDescription from '../constants/gui/variables';
//import PageContent from './PageContent';
//import ChatList from './cht/sitebar/ChatList';
//import Navigation from './mainTemplate/Navigation';
import { OpenSideBar, CloseSideBar } from "../actions/index";

const mapStateToProps = (state) => ({
  styleWidth: state.sidebarReducer.styleWidth,
  authError: state.authReducer.error
});

//    LoadChats: () => dispatch(LoadChats()),
const mapDispatchToProps = dispatch => {
  return {
    OpenSideBar: () => dispatch(OpenSideBar()),
    CloseSideBar: () => dispatch(CloseSideBar()),
  };
};

class ReactApp extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  openSideBar = () => {
    this.props.OpenSideBar()
  };

  closeSideBar = () => {
    this.props.CloseSideBar()
  };

  render() {

    console.group('ReactApp.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.log('this.props.state = ' + JSON.stringify(this.props.state));

    const { authError, styleWidth } = this.props;
    if (authError) {
        console.log('authError = ' + authError);
    }
    console.groupEnd();
    const divStyle = {
      width: styleWidth,
    };
    return (
      <div className="App">
        <div className="root">
            <div id="mySideNav" class="sideNav" style={divStyle} >
              <a href="#" className="closeBtn" onClick={this.closeSideBar}>&times;</a>
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Clients</a>
              <a href="#">Contact</a>
            </div>

          <span class="sideNavSpan" onClick={this.openSideBar}>+</span>
          <div id="main"></div>

        </div>
      </div>
    );
  }
}
//          <Navigation />

export default connect(mapStateToProps, mapDispatchToProps)(ReactApp);

//        { authError ? <div className={`error center`}>{authError}</div> : '' }
//        <div className='center'>
//          <PageContent/>
//        </div>