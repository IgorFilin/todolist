import {v1} from "uuid";
import {todolistsApi, TodolistsType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type ActionsType =
    ChangeFilterACType
    | DeleteTodolistACType
    | AddTodolistACType
    | ChangeTitleTodolistACType
    | SetTodolistACType
export type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>

export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'


const initialState: Array<TodolistDomainType> = []


export const TodolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filterStatus} : tl)
        }

        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.idTodolist)
        }

        case "ADD-TODOLIST": {
            return [{
                id: action.todolistID,
                title: action.title,
                addedDate: '',
                order: 0,
                filter: 'All'
            }, ...state]
        }

        case "CHANGE-TITLE-TODOLIST": {
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        }
        case "SET-TODOLIST": {
            return action.todolists.map(el => ({...el, filter: 'All'}))
        }

        default:
            return state
    }


};

export const changeFilterTodolistAC = (filterStatus: FilterValuesType, todolistId: string) => {
    return {type: 'CHANGE-FILTER', filterStatus, todolistId} as const
}
export const deleteTodolistAC = (idTodolist: string) => {
    return {type: 'DELETE-TODOLIST', idTodolist} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistID: v1()} as const
}
export const changeTitleTodolistAC = (title: string, todolistID: string) => {
    return {type: 'CHANGE-TITLE-TODOLIST', title, todolistID} as const
}
export const setTodolistAC = (todolists: Array<TodolistsType>) => {
    return {type: 'SET-TODOLIST', todolists} as const
}


export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolist()
        .then(response => dispatch(setTodolistAC(response.data)))
}