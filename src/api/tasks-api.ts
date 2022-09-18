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
export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TasksType = {
    id: string,
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

type getTasksType = {
    items: Array<TasksType>
    totalCount: number
    error: string | null
}
type createTaskType = {
    data: {
        item: {
            id: string
            title: string
            description: null | string
            todoListId: string
            order: number
            status: number
            priority: number
            startDate: null | string
            deadline: null | string
            addedDate: string
        }
    },
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}
export type updateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate:string
    deadline: string
}


export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<getTasksType>(`todo-lists/${todolistId}/tasks`)

    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<createTaskType>>(`todo-lists/${todolistId}/tasks`, {title})

    },
    updateTask(todolistId: string, taskId: string,updateTaskModel:updateTaskType) {
        return instance.put<updateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel, settings)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    }
}