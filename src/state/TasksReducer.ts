import {CreateTodolistACType, DeleteTodolistACType, SetTodolistACType} from "./TodolistReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskStatuses, TaskType, updateTaskType} from "../api/tasks-api";
import {AppRootReducerType, AppThunk, DomainActionsCreatorsType} from "./store";


export type ActionCreatorsTasksType =
    DeleteTaskACType
    | createTaskACType
    | updateTaskAC
    | DeleteTodolistACType
    | SetTodolistACType
    | setTaskAC
    | CreateTodolistACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type createTaskACType = ReturnType<typeof createTaskAC>
type setTaskAC = ReturnType<typeof setTaskAC>
type updateTaskAC = ReturnType<typeof updateTaskAC>

export type TasksStateType = {
    [key: string]: Array<TaskType>
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



export const TasksReducer = (state: TasksStateType = initialState, action: ActionCreatorsTasksType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK": {
            return {...state, [action.idTodolist]: state[action.idTodolist].filter(task => task.id !== action.idTask)}
        }
        case "CREATE-TASK": {
            const newTask: TaskType = action.task
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }

        case "UPDATE-TASK": {
            return {...state,[action.todolistId]:state[action.todolistId].map(task => task.id === action.taskId?{...action.task}: task)}
        }
        case "DELETE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case "CREATE-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            // @ts-ignore
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: [...action.tasks]}
        }
        default:
            return state
    }
}



export const deleteTaskAC = (idTodolist: string, idTask: string) => {
    return {type: 'DELETE-TASK', idTodolist, idTask} as const
}

export const createTaskAC = (todolistId: string, task: TaskType) => {
    return {type: 'CREATE-TASK', todolistId, task} as const
}
export const updateTaskAC = (todolistId:string,taskId:string,task:TaskType) => {
    return {type: 'UPDATE-TASK',todolistId,taskId,task} as const
}
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}



export const fetchTasksThunkCreator = (todolistId: string):AppThunk => (dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(items => dispatch(setTaskAC(items, todolistId)))
}
export const deleteTaskThunkCreator = (todolistId: string, taskId: string):AppThunk => (dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(items => dispatch(deleteTaskAC(todolistId, taskId)))
}
export const createTaskThunkCreator = (todolistId: string, title: string):AppThunk => (dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(response => {
            return dispatch(createTaskAC(todolistId, response.data.data.item))
        })
}
export const updateTaskThunkCreator = (todolistId: string, taskId: string, updatePayload: updateTaskDomainType):AppThunk => (dispatch, getState) => {
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
    tasksApi.updateTask(todolistId, taskId, updateTaskModel)
        .then(response => {
            return dispatch(updateTaskAC(todolistId,taskId,response.data.data.item))
        })
}