"use client"

import { getState } from "@/utils/util-functions";
import { IState } from "../context/interfaces";


function getAuthToken() {
    const state: IState = getState();
    return state.user.accessToken;
}

export default getAuthToken;