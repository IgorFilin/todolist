
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type errorValueType = string | null
type initialStateType = { status:RequestStatusType ,error:errorValueType}
export type AppReducerActionsType = setAppStatusACType | setAppErrorACType
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

const initialState = {
    status:'idle' as const,
    error:null
}

export const AppReducer = (state:initialStateType = initialState,action:AppReducerActionsType):initialStateType => {
    switch (action.type){
        case 'SET-APP-STATUS':{
            return {...state,status: action.status}
        }
        case "SET-APP-ERROR":{
            return {...state,error:action.errorValue}
        }
        default:{
            return state
        }
    }
};

export const setAppStatusAC = (status:RequestStatusType) => {
    return {type:'SET-APP-STATUS',status} as const
}

export const setAppErrorAC = (errorValue:errorValueType) => {
    return {type:'SET-APP-ERROR',errorValue} as const
}
