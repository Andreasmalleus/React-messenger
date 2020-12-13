const _ = require('lodash');

export const createPendingSelector = (actions) => (state) => {
    return _(actions).some((action) => _.get(state, `pending.${action}`));
}

export const createErrorSelector = (actions) => (state) => {
    return _(actions).map((action) => _.get(state, `error.${action}`)).compact().first()  || '';
}

export const getChatsSelector = (state) => {
    return state.chats;
}