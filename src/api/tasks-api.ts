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

export const tasksApi = {
    getTasks(todolistId: string) {
        const promise = instance.get<getTasksApiType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<createTaskApiType>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {
            id: "2",
            title: "new task",
            description: null,
            todoListId: "1ebbddc7-e782-41a1-8288-5779e61816cf",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "4"
        }, settings)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}