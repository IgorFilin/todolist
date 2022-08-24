import {FilterValuesType, TodolistsType} from "../AppWithRedux";
import {v1} from "uuid";


export type ActionsType = ChangeFilterACType | DeleteTodolistACType | AddTodolistACType | ChangeTitleTodolistACType
export type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>

export let todolist1 = v1()
export let todolist2 = v1()

const initialState: Array<TodolistsType> = [
    {id: todolist1, title: 'What to learn', filter: 'All'},
    {id: todolist2, title: 'What to buy', filter: 'All'}
]


export const TodolistReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.isDoneStatus} : tl)
        }

        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.idTodolist)
        }

        case "ADD-TODOLIST": {
            debugger
            return [{id: action.todolistID, title: action.title, filter: 'All'}, ...state]
        }

        case "CHANGE-TITLE-TODOLIST": {
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        }

        default:
            return state
    }


};

export const changeFilterTodolistAC = (isDoneStatus: FilterValuesType, todolistId: string) => {
    return {type: 'CHANGE-FILTER', isDoneStatus, todolistId} as const
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
