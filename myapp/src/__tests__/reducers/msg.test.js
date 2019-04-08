// npm test src/__tests__/reducers/msg.test.js

import {
  CREATE_CHAT_MESSAGE_BEGIN,
  CREATE_CHAT_MESSAGE_SUCCESS,
  CREATE_CHAT_MESSAGE_FAILURE,
  LOAD_CHAT_MESSAGES_BEGIN,
  LOAD_CHAT_MESSAGES_SUCCESS,
  LOAD_CHAT_MESSAGES_FAILURE,
  SET_CURRENT_CHAT,
  DE_AUTH_SUCCESS,
  SELECT_CHAT_SUCCESS
} from "../../../src/constants/actions/index";

import {
  CONSOLE_LOG_REDUCERS,
} from "../../../src/settings";

import {
  getNewKick
} from "../../../src/functions/index";

import {
  reducer
} from "../../../src/reducers/msg/index";

const TEST = 'TEST';

it('check default reducing', () => {
    const initialState = {},
          expectedState = {...initialState},
          doAction = {
             type: TEST,
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check SET_CURRENT_CHAT reducing', () => {
    const initialState = {},
          currentKick = getNewKick(),
          expectedState = {...initialState},
          doAction = {
             ...expectedState,
             type: SET_CURRENT_CHAT
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState.hasOwnProperty('kick')).toEqual(true);
    expect((newState.kick - currentKick) < 5).toEqual(true);
});

it('check CREATE_CHAT_MESSAGE_BEGIN reducing', () => {
    const initialState = {},
          expectedState = {creatingChatMessage: TEST},
          doAction = {
             type: CREATE_CHAT_MESSAGE_BEGIN,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check CREATE_CHAT_MESSAGE_SUCCESS reducing', () => {
    const initialState = {},
          expectedState = {
             creatingChatMessage: TEST,
             errorMessage: TEST,
             text: TEST,
             kick: TEST,
             kickRefreshCreateMsgForm: TEST
          },
          doAction = {
             type: CREATE_CHAT_MESSAGE_SUCCESS,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check CREATE_CHAT_MESSAGE_FAILURE reducing', () => {
    const initialState = {},
          expectedState = {
             creatingChatMessage: TEST,
             errorMessage: TEST,
             text: TEST,
             kick: TEST
          },
          doAction = {
             type: CREATE_CHAT_MESSAGE_FAILURE,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});


it('check LOAD_CHAT_MESSAGES_BEGIN reducing with hide', () => {
    const initialState = {},
          expectedState = {
             loadingChatMessages: TEST,
             hideChatMessages: TEST
          },
          doAction = {
             type: LOAD_CHAT_MESSAGES_BEGIN,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check LOAD_CHAT_MESSAGES_BEGIN reducing without hide', () => {
    const initialState = {},
          expectedState = {
             loadingChatMessages: TEST
          },
          doAction = {
             type: LOAD_CHAT_MESSAGES_BEGIN,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check LOAD_CHAT_MESSAGES_SUCCESS reducing with hide', () => {
    const initialState = {},
          expectedState = {
             loadingChatMessages: TEST,
             wasChatMessagesOnceLoaded: TEST,
             errorMessage: TEST,
             chatMessages: [TEST],
             hideChatMessages: TEST
          },
          doAction = {
             type: LOAD_CHAT_MESSAGES_SUCCESS,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

it('check LOAD_CHAT_MESSAGES_SUCCESS reducing without hide', () => {
    const initialState = {},
          expectedState = {
             loadingChatMessages: TEST,
             wasChatMessagesOnceLoaded: TEST,
             errorMessage: TEST,
             chatMessages: [TEST],
          },
          doAction = {
             type: LOAD_CHAT_MESSAGES_SUCCESS,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});


it('check LOAD_CHAT_MESSAGES_FAILURE reducing', () => {
    const initialState = {},
          expectedState = {
             loadingChatMessages: TEST,
             errorMessage: TEST,
          },
          doAction = {
             type: LOAD_CHAT_MESSAGES_FAILURE,
             payload: {
                ...expectedState
             }
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});


it('check SELECT_CHAT_SUCCESS reducing', () => {
    const initialState = {},
          currentKick = getNewKick(),
          expectedState = {...initialState},
          doAction = {
             type: SELECT_CHAT_SUCCESS,
             ...expectedState
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState.hasOwnProperty('kick')).toEqual(true);
    expect((newState.kick - currentKick) < 5).toEqual(true);
});

it('check DE_AUTH_SUCCESS reducing', () => {
    const initialState = {},
          expectedState = {
             currentChatId: null,
             chatMessages: [],
             errorMessage: null
          },
          doAction = {
             type: DE_AUTH_SUCCESS
          }
    const newState = reducer(initialState, doAction)
    // console.log(newState);
    expect(newState).toEqual(expectedState);
});

