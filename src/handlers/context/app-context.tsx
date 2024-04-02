"use client";

import React, { useContext, createContext, useReducer, useEffect } from 'react';

import { initialState, reducer } from './reducers'
import { IAppContext, IAppContextProviderProps } from './interfaces';
import { getState } from '@/utils/util-functions';
import { initialStoreAction, initialStoreDefaultAction } from './actions';

const AppContext = createContext<IAppContext>({} as IAppContext);

// this is custome hook to reduce code of importing useContext and UserContext again and again
export function useAppContext(){
    return useContext(AppContext);
}

export function AppContextProvider( {children}: IAppContextProviderProps ): any {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {  
        // get state return persistent state from localstorage    
        const localState = getState()
        if (!localState) { 
          //checking if there already is a state in localstorage
          dispatch(initialStoreDefaultAction())
        } else dispatch(initialStoreAction(localState))
      }, []);

    return (
            <AppContext.Provider value={{ state, dispatch }}>
                {children}
            </AppContext.Provider>
        )         
}


