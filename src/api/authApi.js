import axios from "axios";

const authApi = axios.create({
    baseURL:'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key:'AIzaSyBvmj4H-NnUvBXJLeqDZczm5eJAa-80Y-c'
    }
})

export default authApi