import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3ed5f5a0-3248-4e8c-b1bc-946bac413eb7'
    }
}


const instance  = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type todolistsTypeApi = {
    "id":string,
    "title":string,
    "addedDate":string,
    "order":null
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistsApi = {
    getTodolist() {
        return instance.get<Array<todolistsTypeApi>>('/todo-lists')

    },
    createTodolist(title:string) {
        return instance.post<ResponseType<{item: todolistsTypeApi}>>('/todo-lists', {title})

    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodolist(todolistId:string,title:string){
       return  instance.put<ResponseType>(`todo-lists/${todolistId}`,{title})

    }
}