
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type errorValueType = string | null
type initialStateType = { status:RequestStatusType ,error:errorValueType,isInitialized:boolean}
export type AppReducerActionsType = setAppStatusACType | setAppErrorACType | setInitializedAppErrorACType
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setInitializedAppErrorACType = ReturnType<typeof setInitializedAppErrorAC>
export type clearAppStateACType = ReturnType<typeof clearAppStateAC>

const initialState = {
    status:'idle' as const, // отображаем полоску загрузка если loading
    error:null, // тест ошибки если промис резолвится
    isInitialized:false // проинициалзированно приложение или нет(показываем общую крутилку)
}
export const AppReducer = (state:initialStateType = initialState,action:AppReducerActionsType):initialStateType => {

    switch (action.type){
        case 'APP/SET-APP-STATUS':{
            return {...state,status: action.status}
        }
        case "APP/SET-APP-ERROR":{
            return {...state,error:action.errorValue}
        }
        case "APP/SET-INITIALIZED-APP":{
            return  {...state,isInitialized:action.initializeValue}
        }
        default:{
            return state
        }
    }
};

export const setAppStatusAC = (status:RequestStatusType) => {
    return {type:'APP/SET-APP-STATUS',status} as const
}

export const setInitializedAppErrorAC = (initializeValue:boolean) => {
    return {type:'APP/SET-INITIALIZED-APP',initializeValue} as const
}
export const setAppErrorAC = (errorValue:errorValueType) => {
    return {type:'APP/SET-APP-ERROR',errorValue} as const
}
export const clearAppStateAC = () => {
    return {type:'APP/CLEAR-APP-STATE'} as const
}
