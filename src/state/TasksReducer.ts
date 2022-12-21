import {CreateTodolistACType, DeleteTodolistACType, SetTodolistACType} from "./TodolistReducer";
import {tasksApi, TaskType, updateTaskType} from "../api/tasks-api";
import {AppThunk} from "./store";
import {clearAppStateACType, RequestStatusType, setAppStatusAC} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


// export type ActionCreatorsTasksType =
//     DeleteTaskACType
//     | createTaskACType
//     | updateTaskAC
//     | DeleteTodolistACType
//     | SetTodolistACType
//     | setTaskAC
//     | CreateTodolistACType
//     | setEntityTaskStatusACType
//     | clearAppStateACType

// type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
// type createTaskACType = ReturnType<typeof createTaskAC>
// type setTaskAC = ReturnType<typeof setTaskAC>
// type updateTaskAC = ReturnType<typeof updateTaskAC>
// type setEntityTaskStatusACType = ReturnType<typeof setEntityTaskStatusAC>

export type TasksDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TasksDomainType>
}
type updateTaskDomainType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string
}

const initialState: TasksStateType = {}

const fetchTask = createAsyncThunk('tasks/fetchTask',(todolistId:string,thunkAPI)=>{

},)

const slice = createSlice({
    initialState,
    name:'Tasks',
    reducers:{
        deleteTask:(state, action:PayloadAction<{idTodolist: string, idTask: string}>)=>{
             state[action.payload.idTodolist].filter(task => task.id !== action.payload.idTask)
        },
        createTask:(state, action:PayloadAction<{todolistId: string, task: TaskType}>)=>{
            state[action.payload.todolistId].unshift({...action.payload.task,entityTaskStatus: 'idle'})
        },
        updateTask:(state, action:PayloadAction<{todolistId: string, taskId: string, task: TaskType}>)=>{
          let task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
             task = Object.assign({},task)
        },
        setEntityTaskStatus:(state, action:PayloadAction<{entityStatus: RequestStatusType, taskId: string, todolistId: string}>) =>{
            let task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
             if(task){
                 task.entityTaskStatus = action.payload.entityStatus
             }
        }
    }
    }
)

export const TasksReducer = slice.reducer

export const {deleteTask,createTask,updateTask,setEntityTaskStatus} = slice.actions

// export const TasksReducer = (state: TasksStateType = initialState, action: ActionCreatorsTasksType): TasksStateType => {
//     switch (action.type) {
//         case "DELETE-TASK": {
//             return {...state, [action.idTodolist]: state[action.idTodolist].filter(task => task.id !== action.idTask)}
//         }
//         case "CREATE-TASK": {
//             let newTask: TasksDomainType = {...action.task, entityTaskStatus: 'idle'}
//             return {
//                 ...state,
//                 [action.todolistId]: [newTask, ...state[action.todolistId]]
//             }
//         }
//
//         case "UPDATE-TASK": {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
//                     ...action.task,
//                     entityTaskStatus: 'idle'
//                 } : task)
//             }
//         }
//         case "DELETE-TODOLIST": {
//             let copyState = {...state}
//             delete copyState[action.todolistId]
//             return copyState
//         }
//         case "CREATE-TODOLIST": {
//             return {...state, [action.todolistId]: []}
//         }
//         case "SET-TODOLISTS": {
//             const copyState = {...state}
//             action.todolists.forEach(tl => copyState[tl.id] = [])
//             return copyState
//         }
//         case "SET-TASKS": {
//             return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityTaskStatus: 'idle'}))}
//         }
//         case "SET-ENTITY-TASK-STATUS": {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
//                     ...t,
//                     entityTaskStatus: action.entityStatus
//                 } : t)
//             }
//         }
//         case "APP/CLEAR-APP-STATE": {
//             return {}
//         }
//         default:
//             return state
//     }
// }
//
//
// export const deleteTaskAC = (idTodolist: string, idTask: string) => {
//     return {type: 'DELETE-TASK', idTodolist, idTask} as const
// }
//
// export const createTaskAC = (todolistId: string, task: TaskType) => {
//     return {type: 'CREATE-TASK', todolistId, task} as const
// }
// export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) => {
//     return {type: 'UPDATE-TASK', todolistId, taskId, task} as const
// }
// export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => {
//     return {type: 'SET-TASKS', tasks, todolistId} as const
// }
// export const setEntityTaskStatusAC = (entityStatus: RequestStatusType, taskId: string, todolistId: string) => {
//     return {type: 'SET-ENTITY-TASK-STATUS', entityStatus, taskId, todolistId} as const
// }


// export const fetchTasksThunkCreator = (todolistId: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC('loading'))
//         const response = await tasksApi.getTasks(todolistId)
//         dispatch(setTaskAC(response, todolistId))
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             handleServerNetworkError(error, dispatch)
//         }
//     } finally {
//         dispatch(setAppStatusAC('succeeded'))
//     }
// }



export const deleteTaskThunkCreator = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setEntityTaskStatusAC('loading', taskId, todolistId))
        const response = await tasksApi.deleteTask(todolistId, taskId)
        dispatch(deleteTaskAC(todolistId, taskId))
        dispatch(setEntityTaskStatusAC('succeeded', taskId, todolistId))
    } catch (err) {
        if (axios.isAxiosError(err)) {
            handleServerNetworkError(err, dispatch)
            dispatch(setEntityTaskStatusAC('failed', taskId, todolistId))
        }

    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const createTaskThunkCreator = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await tasksApi.createTask(todolistId, title)
        if (response.data.resultCode === 0) {
            dispatch(createTaskAC(todolistId, response.data.data.item))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            handleServerNetworkError(err, dispatch)
        }

    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const updateTaskThunkCreator = (todolistId: string, taskId: string, updatePayload: updateTaskDomainType): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setEntityTaskStatusAC('loading', taskId, todolistId))
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) return console.warn('Task not found')
        const updateTaskModel: updateTaskType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...updatePayload
        }
        const response = await tasksApi.updateTask(todolistId, taskId, updateTaskModel)
        if (response.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistId, taskId, response.data.data.item))
            dispatch(setEntityTaskStatusAC('succeeded', taskId, todolistId))
        } else if (response.data.resultCode === 1) {
            handleServerAppError(response.data, dispatch)
            dispatch(setEntityTaskStatusAC('failed', taskId, todolistId))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(setEntityTaskStatusAC('failed', taskId, todolistId))
        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}