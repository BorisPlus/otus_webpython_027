import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxApp from "../../src/App";
import ChatMessage, { ReactChatMessage } from "../../src/components/msg/ChatMessage";
import { Enzyme, mount, shallow, render, configure } from 'enzyme';
import store from "../../src/store/index";
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const created_at = new Date('2019', '5', '1', '20', '10', '1', '0')
const NULL = null
//const created_at_date = created_at.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
//import Moment from 'moment';
//const dt = Moment(created_at).format('DD.MM.YYYY HH:mm')



const defaultProps = {
    owner: "Test owner",
    owner_id: "1",
    currentUserId: "2",
    text: "Test text",
    created_at: created_at
};

it("check component match snapshot", () => {
    const reactChatMessage = renderer.create(<ReactChatMessage {...defaultProps}/>).toJSON();
    expect(reactChatMessage).toMatchSnapshot();
});


it("check type of value", () => {
    const reactChatMessage = mount(<ReactChatMessage {...defaultProps} />);
    expect(reactChatMessage.prop("created_at")).toBeString;
});

it("check value", () => {
    const reactChatMessage = mount(<ReactChatMessage {...defaultProps} />);
    expect(reactChatMessage.props().created_at).toEqual(created_at);
});


it("check null value", () => {
    const props = {
      ...defaultProps,
      created_at: NULL
    };
    const reactChatMessage = mount(<ReactChatMessage {...props} />);
    expect(reactChatMessage.prop("created_at")).toEqual(NULL);
});
