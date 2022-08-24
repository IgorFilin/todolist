import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistACType, DeleteTodolistACType, todolist1, todolist2} from "./TodolistReducer";


type AllActionCreatorsType =
    DeleteTaskACType
    | AddNewTaskACType
    | ChangeStatusTaskType
    | ChangeTitleTaskAC
    | DeleteTodolistACType
    | AddTodolistACType
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>
type ChangeTitleTaskAC = ReturnType<typeof changeTitleTaskAC>


const initialState: TasksStateType = {}

export const TasksReducer = (state: TasksStateType = initialState, action: AllActionCreatorsType): TasksStateType => {
    debugger
    switch (action.type) {
        case "DELETE-TASK": {
            return {...state, [action.idTodolist]: state[action.idTodolist].filter(task => task.id !== action.idTask)}
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.idTodolist]: [{id: v1(), title: action.titleTask, isDone: false}, ...state[action.idTodolist]]
            }
        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.idTodolist]: state[action.idTodolist].map(t => t.id === action.idTask ? {
                    ...t,
                    isDone: action.statusTask
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
            debugger
            return {...state, [action.todolistID]: []}
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
export const changeStatusTaskAC = (idTask: string, statusTask: boolean, idTodolist: string) => {
    return {type: 'CHANGE-STATUS-TASK', idTask, statusTask, idTodolist} as const
}
export const changeTitleTaskAC = (title: string, id: string, idTodolist: string) => {
    return {type: 'CHANGE-TITLE-TASK', id, title, idTodolist} as const
}
