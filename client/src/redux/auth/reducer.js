import { initialState } from "./initialState";




// create reducer
export const AuthReducer = (state = initialState, {type, action}) => {

    switch (type) {
        case '':
            return '';
    
        default:
            return state;
    }

}