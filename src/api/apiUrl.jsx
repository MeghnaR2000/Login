import axios from "axios";


export const axiosInstance=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
})

export const axiosCrud=axios.create({
    baseURL:process.env.REACT_APP_BASE_CRUD_URL,
})