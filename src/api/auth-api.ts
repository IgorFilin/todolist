import axios from "axios";
import {settings} from "./tasks-api";
import {ResponseType} from "./todolists-api";
import {FormDataType} from "../components/Login/Login";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type authMeDataType = {
    id: number
    email: string
    login: string
}

export const authApi = {
    authMe(){
        return instance.get<ResponseType<authMeDataType>>('/auth/me')
    },
    logIn(formData:FormDataType){
        return instance.post<ResponseType<{userId:number}>>('/auth/login',formData)
    },
    logOut(){
        return instance.delete<ResponseType<{}>>('/auth/login')
    }
}