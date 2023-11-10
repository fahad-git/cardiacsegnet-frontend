export const ENVIRONMENT = "development";

const CONFIG = {
    url: {
        development: "http://localhost:8000/api"
    },
    api: {
        login: "/login",
        register: "/register",
        getImagesByUser: "/images/get-images-by-user"
    }

}



export default CONFIG