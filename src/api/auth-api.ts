import axios from "axios";
import {settings} from "./tasks-api";
import {ResponseType} from "./todolists-api";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type authMeDataType = {
    d: number
    email: string
    login: string
}

export const authApi = {
    authMe(){
        return instance.get<ResponseType<authMeDataType>>('/auth/me')
    },
    login(){
        return instance.post<ResponseType<{userId:number}>>('/auth/login')
    }
}