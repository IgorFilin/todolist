import {todolistsApi, TodolistsType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type ActionsType =
    ChangeFilterACType
    | DeleteTodolistACType
    | updateTitleTodolistACType
    | SetTodolistACType
    | CreateTodolistACType

export type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type updateTitleTodolistACType = ReturnType<typeof updateTitleTodolistAC>
export type SetTodolistACType = ReturnType<typeof setTodolistsAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>

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
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "CREATE-TODOLIST": {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "All"}
            return [newTodolist, ...state]
        }

        case "UPDATE-TITLE-TODOLIST": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: 'All'}))
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


export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolist()
        .then(response => dispatch(setTodolistsAC(response.data)))
}

export const createTodolistsThunkCreator = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title)
        .then(response => dispatch(createTodolistAC(response.item.id, response.item)))
}
export const updateTodolistsThunkCreator = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolist(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTitleTodolistAC(title, todolistId))
            }
        })
}
export const deleteTodolistsThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId))
            }
        })
}