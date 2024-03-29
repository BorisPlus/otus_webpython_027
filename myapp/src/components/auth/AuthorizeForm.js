import React from 'react';
import { connect } from "react-redux";
import {
  Authorize
} from "../../../src/actions/index";
import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../src/settings";

const mapStateToProps = state => ({
  username: state.authReducer.username,
  password: state.authReducer.password,
  authorizing: state.authReducer.authorizing,
  isAuthorize: state.authReducer.isAuthorize
});

const mapDispatchToProps = dispatch => {
  return {
    Authorize: (username, password) => dispatch(Authorize(username, password))
  };
};

export class ReactAuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputUsername: '',
      password: '',
      isValid: false,
      authorizing: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.inputUsername && nextState.password) ? true : false;
  }

  handleSubmit = (e, data) => {
    console.group('ReactAuthForm.handleSubmit()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    e.preventDefault();
    const { inputUsername, password } = this.state;
    this.props.Authorize(inputUsername, password);
  }

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
        console.group('COMPONENT# ' + this.constructor.name + '.render()');
        console.log('this.props = ' + JSON.stringify(this.props));
        console.log('this.state = ' + JSON.stringify(this.state));
        console.groupEnd();
    }

    const { inputUsername, password, isValid } = this.state;
    const { username, authorizing, isAuthorize } = this.props;
    return (
      <>
        {
          isAuthorize ?
          <h1 className="superCenter"> Hello, { username }! </h1> :
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="inputUsername"
              placeholder="Username"
              value={inputUsername}
              onChange={this.handleChange}
              disabled={authorizing}
              autoFocus
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              disabled={authorizing}
            />
            <input
              type="submit"
              data-is_requested={ authorizing ? "yes" : "no" }
              value={ authorizing ? "Authorizing..." : "Let's Authorize" }
              disabled={ !isValid || authorizing } />
          </form>
        }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactAuthForm);
