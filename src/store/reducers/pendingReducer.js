const pending = (state = {}, action) => {
    const { type } = action;
    
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if(!matches){
        return state;
    }

    //example   requestName= ADD, requestState = success/error/request
    const [, requestName, requestState] = matches;

    //returns false if success or failure
    return {
        ...state,
        [requestName] : requestState === 'REQUEST'
    }
}

export default pending;