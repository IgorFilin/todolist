import axios from "axios";
import {ResponseType} from "./todolists-api";

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

type TaskApiType = {
    "id": "5eb35851-0ba5-4d32-8a59-f4ed5a7d96d0",
    "title": string
    "description": string
    "todoListId": string
    "order": number
    "status": number
    "priority": number
    "startDate": string
    "deadline": string
    "addedDate": string
}

type getTasksApiType = {
    items: Array<TaskApiType>
    totalCount: number
    error: string | null
}
type createTaskApiType = {
    "data": {
        "item": {
            "id": string
            "title": string
            "description": null | string
            "todoListId": string
            "order": number
            "status": number
            "priority": number
            "startDate": null | string
            "deadline": null | string
            "addedDate": string
        }
    },
    "messages": Array<string>
    "fieldsErrors": Array<string>
    "resultCode": number
}
type updateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate:string
    deadline: string
}

const updateTaskModel:updateTaskType = {
    title: 'updated task',
    description: '',
    completed: true,
    status: 2,
    priority: 1,
    startDate:'',
    deadline: ''
}
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<getTasksApiType>(`todo-lists/${todolistId}/tasks`)

    },
    createTask(todolistId: string, title: string) {
        return instance.post<createTaskApiType>(`todo-lists/${todolistId}/tasks`, {title})

    },
    updateTask(todolistId: string, taskId: string) {
        return instance.put<updateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel, settings)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    }
}