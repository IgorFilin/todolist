import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '523f3afc-9394-4d5e-8a49-5b44c559d911'
    }
}


const instance  = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistsType = {
    id:string,
    title:string,
    addedDate:string,
    order:number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistsApi = {
    getTodolist() {
        return instance.get<Array<TodolistsType>>('/todo-lists')

    },
    createTodolist(title:string) {
        return instance.post<ResponseType<{item: TodolistsType}>>('/todo-lists', {title})
            .then(response => response.data)
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodolist(todolistId:string,title:string){
       return  instance.put<ResponseType>(`todo-lists/${todolistId}`,{title})

    }
}