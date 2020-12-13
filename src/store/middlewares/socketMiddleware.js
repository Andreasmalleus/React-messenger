export default function socketMiddleware(socket){
    return store => next => action => {

        const {types, promise, type} = action;

        if(!types || !promise || type !== 'socket'){
            return next(action);
        }
        
        if(
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ){
            throw new Error('Expected an array of three string types.')
        }

        if(typeof promise !== 'function'){
            throw new Error('Expected promise to be a function.')
        }

        const [REQUEST, FAILURE, SUCCESS] = types;

        next({type : REQUEST})
    
        return promise(socket)
            .then((result) => {
                console.log();
                return next({
                    type: SUCCESS,
                    payload : result
                });
            })
            .catch((error) => {
                return next({
                    type : FAILURE,
                    error : error,
                });
            })
    }
}