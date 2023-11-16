import { Dispatch, ReactNode } from "react";

export interface IState {
    user: IStateUser
}

export interface IActions {
  type: string;
  payload: any;
}

// Define the props type for the provider
export interface IAppContextProviderProps {
    children: ReactNode;
  }

export interface IAppContext {
    state: IState;
    dispatch: Dispatch<any>; // Update with your action type if needed
  }

export interface IStateUser {
    name: string;
    email: string;
    password: string;
    username: string;
    accessToken: string;
    refreshToken: string;
}
