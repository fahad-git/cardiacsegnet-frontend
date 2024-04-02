import { IAuth, IUser } from "@/utils/schema/auth";
import axios from "axios";
import CONFIG, { ENVIRONMENT } from "@/utils/config";

export function login(userCredentials: IAuth) {
    const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.login;
    return axios.post(URL, userCredentials)
}

export function registerUser(userDetails: IUser) {
    const URL = CONFIG.url[ENVIRONMENT] + CONFIG.api.register;
    return axios.post(URL, userDetails)
}

export const Auth = {
    login: login
};

export default Auth;