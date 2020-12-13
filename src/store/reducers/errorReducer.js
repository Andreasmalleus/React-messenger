const error = (state = {}, action) => {
    const { type } = action;
    
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if(!matches){
        return state;
    }

    const [, requestName, requestState] = matches;

    //returns false if success or failure
    return {
        ...state,
        [requestName] : requestState === 'FAILURE' ? action.error : ''
    }
}

export default error;