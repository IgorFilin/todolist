import {todolistsApi, TodolistsType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk, DomainActionsCreatorsType} from "./store";
import {
    AppReducerActionsType,
    clearAppStateACType,
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC
} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError, handleServerNetworkErrorSagaAC} from "../utils/error-utils";
import axios from "axios";
import {call, put} from 'redux-saga/effects'

export type ActionCreatorsTodolistsType =
    ChangeFilterACType
    | DeleteTodolistACType
    | updateTitleTodolistACType
    | SetTodolistACType
    | CreateTodolistACType
    | AppReducerActionsType
    | setTodolistEntityStatusACType
    | clearAppStateACType

export type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type updateTitleTodolistACType = ReturnType<typeof updateTitleTodolistAC>
export type SetTodolistACType = ReturnType<typeof setTodolistsAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export type setTodolistEntityStatusACType = ReturnType<typeof setTodolistEntityStatusAC>

export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
    entityTodolistStatus: RequestStatusType
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'


const initialState: Array<TodolistDomainType> = []

export const fetchTodolistsSagaWorkerAC = () => ({type:'TODOLISTS/FETCH_TODOLISTS'})

export const TodolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionCreatorsTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filterStatus} : tl)
        }

        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "CREATE-TODOLIST": {
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "All",
                entityTodolistStatus: 'succeeded'
            }
            return [newTodolist, ...state]
        }

        case "UPDATE-TITLE-TODOLIST": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: 'All', entityTodolistStatus: 'succeeded'}))
        }
        case "SET-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todolistId ? {
                ...tl,
                entityTodolistStatus: action.entityStatus
            } : tl)
        }
        case "APP/CLEAR-APP-STATE": {
            return []
        }

        default:
            return state
    }


};


export const changeFilterTodolistAC = (filterStatus: FilterValuesType, todolistId: string) => {
    return {type: 'CHANGE-FILTER', filterStatus, todolistId} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const updateTitleTodolistAC = (title: string, todolistId: string) => {
    return {type: 'UPDATE-TITLE-TODOLIST', title, todolistId} as const
}
export const setTodolistsAC = (todolists: Array<TodolistsType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const createTodolistAC = (todolistId: string, todolist: TodolistsType) => {
    return {type: 'CREATE-TODOLIST', todolist, todolistId} as const
}
export const setTodolistEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string) => {
    return {type: 'SET-ENTITY-STATUS', entityStatus, todolistId} as const
}


export function* fetchTodolistsSagaWorker ():any {
    try {
        yield put(setAppStatusAC('loading'))
        const response = yield call(todolistsApi.getTodolist)
        yield put(setTodolistsAC(response.data))
        yield put(setAppStatusAC('succeeded'))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(handleServerNetworkErrorSagaAC(error))
        }
        yield put(setAppStatusAC('failed'))
    }
}

export const createTodolistsThunkCreator = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistsApi.createTodolist(title)
        if (response.resultCode === 0) {
            dispatch(createTodolistAC(response.data.item.id, response.data.item))
        } else {
            dispatch(setAppErrorAC(response.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }

    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const updateTodolistsThunkCreator = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodolistEntityStatusAC('loading', todolistId))
        const response = await todolistsApi.updateTodolist(todolistId, title)
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(updateTitleTodolistAC(title, todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistEntityStatusAC('succeeded', todolistId))
        } else if (response.data.resultCode === 1) {
            handleServerAppError(response.data, dispatch)
            dispatch(setTodolistEntityStatusAC('failed', todolistId))
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTodolistEntityStatusAC('failed', todolistId))
        }
    }
}
export const deleteTodolistsThunkCreator = (todolistId: string) => async (dispatch: Dispatch<DomainActionsCreatorsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodolistEntityStatusAC('loading', todolistId))
        const response = await todolistsApi.deleteTodolist(todolistId)
        if (response.data.resultCode === 0) {
            dispatch(setTodolistEntityStatusAC('succeeded', todolistId))
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTodolistEntityStatusAC('failed', todolistId))
        }
    }
}

