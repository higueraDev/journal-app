import axios from "axios";

const journalApi = axios.create({
    baseURL:'https://vue-demos-9c56f-default-rtdb.firebaseio.com'
})

export default journalApi