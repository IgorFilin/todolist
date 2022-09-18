import {v1} from "uuid";
import {AddTodolistACType, DeleteTodolistACType, setTodolistAC, SetTodolistACType} from "./TodolistReducer";
import {tasksApi, TaskStatuses, TasksType, TodoTaskPriorities} from "../api/tasks-api";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolists-api";


type AllActionCreatorsType =
    DeleteTaskACType
    | AddNewTaskACType
    | ChangeStatusTaskType
    | ChangeTitleTaskAC
    | DeleteTodolistACType
    | AddTodolistACType
    | SetTodolistACType
    | setTaskAC

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>
type ChangeTitleTaskAC = ReturnType<typeof changeTitleTaskAC>
type setTaskAC = ReturnType<typeof setTaskAC>

export type TasksStateType = {
    [key: string]: Array<TasksType>
}


const initialState: TasksStateType = {}

export const TasksReducer = (state: TasksStateType = initialState, action: AllActionCreatorsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK": {
            return {...state, [action.idTodolist]: state[action.idTodolist].filter(task => task.id !== action.idTask)}
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.idTodolist]: [{
                    id: v1(),
                    title: action.titleTask,
                    description: '',
                    todoListId: action.idTodolist,
                    order: 0,
                    status: TaskStatuses.New,
                    priority: TodoTaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    addedDate: ''
                }, ...state[action.idTodolist]]
            }
        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.idTodolist]: state[action.idTodolist].map(t => t.id === action.idTask ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.idTodolist]: state[action.idTodolist].map(t => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "DELETE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.idTodolist]
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistID]: []}
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "SET-TASKS":{
            return {...state,[action.todolistId]:[...action.tasks]}
        }
        default:
            return state
    }
}

export const deleteTaskAC = (idTask: string, idTodolist: string) => {
    return {type: 'DELETE-TASK', idTask, idTodolist} as const
}

export const addNewTaskAC = (titleTask: string, idTodolist: string) => {
    return {type: 'ADD-TASK', titleTask, idTodolist} as const
}
export const changeStatusTaskAC = (idTask: string, status: TaskStatuses, idTodolist: string) => {
    return {type: 'CHANGE-STATUS-TASK', idTask, status, idTodolist} as const
}
export const changeTitleTaskAC = (title: string, id: string, idTodolist: string) => {
    return {type: 'CHANGE-TITLE-TASK', id, title, idTodolist} as const
}
export const setTaskAC = (tasks: Array<TasksType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const fetchTasksThunkCreator = (todolistId:string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(items => dispatch(setTaskAC(items,todolistId)))
}