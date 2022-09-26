import axios from "axios";
import {ResponseType} from "./todolists-api";

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
export type TaskType = {
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
    completed:boolean
}
type getTaskType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type updateTaskType = {
    title:string,
    description:string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}


export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<getTaskType>(`todo-lists/${todolistId}/tasks`)
            .then(response =>response.data.items)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string,updateTaskModel:updateTaskType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel, settings)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    }
}