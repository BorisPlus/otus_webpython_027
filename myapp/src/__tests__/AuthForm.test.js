import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxApp from "../../src/App";
import AuthForm, { ReactAuthForm } from "../../src/components/auth/AuthorizeForm";
import { Enzyme, mount, shallow, render, configure } from 'enzyme';
import store from "../../src/store/index";
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

const created_at = new Date('2019', '5', '1', '20', '10', '1', '0').toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

const defaultProps = {
    inputUsername: '',
    password: '',
    isValid: false,
    authorizing: false
};
//
it('check default state', () => {
    const wrapper = shallow(<ReactAuthForm {...defaultProps} />)
    //console.log(wrapper.state());
    expect(wrapper.state()).toEqual(defaultProps);
});
//
it('allows us to set props', () => {
    const props = {...defaultProps,inputUsername: 'VALUE'},
          wrapper = mount(<ReactAuthForm {...props} />);

    expect(wrapper.props().inputUsername).toEqual('VALUE');

    wrapper.setProps({ inputUsername: 'CHANGED_VALUE' });
    expect(wrapper.props().inputUsername).toEqual('CHANGED_VALUE');
});
//
it("check disabled submit of empty form", () => {
    const props = {...defaultProps,inputUsername: 'VALUE'},
          wrapper = mount(<ReactAuthForm {...props} />);

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);
});
//
it("check onChange and valid on end of all inout", () => {
    const wrapper = shallow(<ReactAuthForm {...defaultProps} />),
          value = "SOME_VALUE";

    // Yet is not valid
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);

    const inputUsername = wrapper.find('input[name="inputUsername"]');
    const inputUsernameEvent = {target: {value: value, name: "inputUsername"}};
    inputUsername.simulate('change', inputUsernameEvent)

    // console.log(wrapper.props().children.props.children[0].props);
    expect(wrapper.props().children.props.children[0].props.value).toEqual(value);

    // Yet is not valid
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);

    const inputPassword = wrapper.find('input[name="password"]');
    const inputPasswordEvent = {target: {value: value, name: "password"}};
    inputUsername.simulate('change', inputPasswordEvent)

    // console.log(wrapper.props().children.props.children[1].props);
    expect(wrapper.props().children.props.children[1].props.value).toEqual(value);

    // is form valid
    expect(wrapper.state().isValid).toEqual(true);
    // is submit activated
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(false);

});
