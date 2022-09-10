import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";


export default {
    title: 'API/TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolist()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('Samurai')
            .then(response => {
                setState(response.data.data.item)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.deleteTodolist('ed6d58ce-8c4c-4789-82e5-a2be302ebc36')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.updateTodolist('1ebbddc7-e782-41a1-8288-5779e61816cf', 'todolist with tasks')
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
