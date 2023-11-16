import { INIT_STORE, INIT_STORE_DEFAULT, UPDATE_USER } from "./actions-constants";
import { IActions, IState, IStateUser } from "./interfaces";

export function initialStoreAction (state: IState) {
    return { type: INIT_STORE, payload: state } as IActions
}

export function initialStoreDefaultAction () {
    return { type: INIT_STORE_DEFAULT, payload: {} } as IActions
}

export function updateUserAction (user: IStateUser) {
    return { type: UPDATE_USER, payload: user } as IActions
}