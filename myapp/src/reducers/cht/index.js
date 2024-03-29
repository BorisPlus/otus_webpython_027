import {
  CREATE_CHAT_BEGIN,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  LOAD_CHATS_BEGIN,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
//  SET_CURRENT_CHAT_ID,
  SET_CURRENT_CHAT,
  DE_AUTH_SUCCESS,
  SELECT_CHAT_BEGIN,
  SELECT_CHAT_SUCCESS,
  SELECT_CHAT_FAILURE
} from "../../../src/constants/actions/index";

import {
  CONSOLE_LOG_REDUCERS,
} from "../../../src/settings";

const initialState = {
  name: undefined,
  errorMessage: null,
  creating: false,
  currentChatId: null,
  currentChatName: null,
  chatSelecting: null
};

export const myNameIs = 'ChatReducer';

export function reducer(state = initialState, action) {

  let newState = {};
  switch (action.type) {
    case CREATE_CHAT_BEGIN:
      newState = {
        ...state,
        creating: action.payload.creating,
        errorMessage: action.payload.errorMessage
      };
      break;

    case CREATE_CHAT_SUCCESS:
      newState = {
        ...state,
        creating: action.payload.creating,
        errorMessage: action.payload.errorMessage,
        name: action.payload.text,
        kick: action.payload.kick
      };
      break;

    case CREATE_CHAT_FAILURE:
      newState = {
        ...state,
        creating: action.payload.sending,
        errorMessage: action.payload.errorMessage,
        name: action.payload.name,
        kick: action.payload.kick
      };
      break;

    case LOAD_CHATS_BEGIN:
      newState = {
        ...state,
        loading: action.payload.loading,
        errorMessage: action.payload.errorMessage
      };
      break;

    case LOAD_CHATS_SUCCESS:
      newState = {
        ...state,
        loading: action.payload.loading,
        wasOnceLoaded: action.payload.wasOnceLoaded,
        errorMessage: action.payload.errorMessage,
        chats: action.payload.chats,
      };
      break;

    case LOAD_CHATS_FAILURE:
      newState = {
        ...state,
        loading: action.payload.sending,
        errorMessage: action.payload.errorMessage,
      };
      break;

//    case SET_CURRENT_CHAT_ID:
//      alert('cht ' + SET_CURRENT_CHAT_ID);
//      newState = {
//        ...state,
//        currentChatId: action.payload.currentChatId,
//      };
//      break;

    case SET_CURRENT_CHAT:
      newState = {
        ...state,
        currentChatId: action.payload.currentChatId,
        currentChatName: action.payload.currentChatName
      };
      break;

    case SELECT_CHAT_BEGIN:
      newState = {
        ...state,
        chatSelecting: action.payload.chatSelecting,
      };
      break;

    case SELECT_CHAT_SUCCESS:
      newState = {
        ...state,
        currentChatId: action.payload.currentChatId,
        currentChatName: action.payload.currentChatName,
        chatSelecting: action.payload.chatSelecting
      };
      break;

    case SELECT_CHAT_FAILURE:
      newState = {
        ...state,
        currentChatId: action.payload.currentChatId,
        currentChatName: action.payload.currentChatName,
        chatSelecting: action.payload.chatSelecting
      };
      break;

    case DE_AUTH_SUCCESS:
      newState = {
        ...state,
        chats: action.payload.chats,
        errorMessage: null,
        currentChatId: null,
        currentChatName: null,
      };
      break;

    default:
      newState = state;
      break;
  }

  if (CONSOLE_LOG_REDUCERS.includes(myNameIs)) {
      console.group('REDUCER# ' + myNameIs);
      console.log('action.type: ' + action.type);
      console.log('action: ' + JSON.stringify(action));
      console.log('state: ' + JSON.stringify(state));
      console.log('newState: ' + JSON.stringify(newState));
      console.groupEnd();
  }

  return newState;
};
