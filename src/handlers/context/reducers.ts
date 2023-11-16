import { saveState } from '@/utils/util-functions';
import { UPDATE_USER, LOGOUT, INIT_STORE, INIT_STORE_DEFAULT } from './actions-constants';
import { IState, IActions } from './interfaces';

export const initialState: IState = {
    user: {
        name: '',
        email: '',
        password: '',
        username: '',
        accessToken: '',
        refreshToken: ''
    }
};

export const reducer = (state: IState, action: IActions) => {
    let updatedState: IState = state;

    switch(action.type){
        case INIT_STORE_DEFAULT:
            updatedState = initialState;
            break;
        case INIT_STORE:
            updatedState = action.payload;
            break;
        case UPDATE_USER:
            updatedState = {...state, user: action.payload};            
            break;
        case LOGOUT:
            updatedState = {...state, user: initialState.user};
            break;
        default:
            updatedState = initialState;
    }
    
    saveState(updatedState)
    return updatedState;
}