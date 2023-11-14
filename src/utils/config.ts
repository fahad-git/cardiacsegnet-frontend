export const ENVIRONMENT = process.env.NODE_ENV || "development";

const CONFIG = {
    url: {
        development: "http://localhost:8000/api",
        production: "http://128.39.142.117:8000/api",
        test: "http://localhost:8000/api"
    },
    api: {
        login: "/login",
        register: "/register",
        getImagesByUser: "/images/get-images-by-user"
    }

}



export default CONFIG