"use client";

import { IState } from "@/handlers/context/interfaces";

export function getState(){
    const state = localStorage.getItem("state")
    return state && JSON.parse(state);
}

export function saveState(state: IState){
    localStorage.setItem("state", JSON.stringify(state));
}