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

    // console.log(wrapper.find('input[type="submit"]').prop('disabled'));
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);
});
//
it("check activated submit of fulled form", () => {
    const props = {...defaultProps,inputUsername: 'VALUE'},
          wrapper = shallow(<ReactAuthForm {...props} />);

    // const event = {target: {value: "some_value"}};

    // console.log(wrapper.find('form').text())

    // Was not found !! Why? ShallowWrapper {}
    // console.log(wrapper.find("input[name='inputUsername']"))
    // console.log(wrapper.find('input').find({name: "inputUsername"}))
    // console.log(wrapper.find({name: "inputUsername"}))

    console.log(wrapper.find('input'))

    // So. It's not work.
    // const inputUsername = wrapper.find('input[name="inputUsername"]');
    // inputUsername.simulate('focus');
    // inputUsername.simulate('change', event)
    // console.log(inputUsername)
    // const event = {value: "some_value"};
    // const event = "some_value";

    // console.log(wrapper.find('input'))
    // console.log(wrapper.findWhere(n => typeof n.type() !== 'inputUsername'));
    // wrapper.find({name: "inputUsername"}).simulate('change', event)

    // Exists
    // { type: 'text',
    //      name: 'inputUsername',
    //      placeholder: 'Username',
    //      value: '',
    //      onChange: [Function],
    //      disabled: false,
    //      autoFocus: true }
    console.log(wrapper.props().children.props.children[0].props)
    console.log(wrapper.state())

    // TypeError: Cannot assign to read only property 'value' of objec
    // wrapper.props().children.props.children[0].props.value = '123'
    //// wrapper.props().children.props.children[0].props.onChange

    beforeEach(() => {
      wrapper.find({name: "inputUsername"}).simulate('change', { // в поиске используем селектор по id
        target: {
          value: 'SOME_VALUE'
        },
      })
    })

    console.log(wrapper.state())
});
////
////it("check the onChange callback", () => {
////    const
////        onSubmit = jest.fn(),
////        props = {
////            ...defaultProps,
////            handleSubmit: onSubmit
////        },
////        wrapper = mount(
////            <ReactAuthForm {...props} />
////        );
//////        wrapper = shallow(
//////            <ReactAuthForm {...props} />
//////        );
////
////    expect(wrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);
//////    wrapper.find('[name="toggle-preview"]').simulate('click');
////    wrapper.find('input[type="submit"]').simulate('click');
////    // DateInputComponent = mount(<ReactAuthForm {...props} />).find("input");
////    //    ReactAuthForm.simulate("submit", {
////    //        target: { inputUsername: "wer", password: "wer2",  }
////    //    });
////    expect(onSubmit).toHaveBeenCalledWith("22.01.2018");
////});