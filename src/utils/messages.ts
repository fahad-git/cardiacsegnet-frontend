
interface IMessages {
    [key: string]: string;
  }

export const ERROR_MESSAGES: IMessages = {
    "Invalid credentials" : "Invalid email or password.",
    "Invalid refresh token" : "Invalid token.",
    "User already exists with this email" : "This email are already in use",
    "Cannot find information you requested" : "Information not found",
    "Authentication required" : "You are not authenticated",
    "Could not validate credentials" : "Could not validate credentials",
    "User not found" : "Could not find user",
    "An error occurred" : "An error occurred",
    "Not Found" : "User not found",
}

export const SUCCESS_MESSAGES: IMessages = {
    "Sucess" : "Sucess."
}

export default {ERROR_MESSAGES, SUCCESS_MESSAGES};

