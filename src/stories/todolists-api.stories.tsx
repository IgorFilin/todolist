import React, {ChangeEvent, useEffect, useState} from 'react'
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
    const [title, setTitle] = useState<any>(null)

    const onChangeHandlerCreateTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistsApi.createTodolist(title)
            .then(item => setState(item))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={title} onChange={onChangeHandlerCreateTitle} type="text"/>
                <button onClick={onClickHandler}>Create todolist</button>
            </div>
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [idTodolist, setIdTodolist] = useState<any>(null)
    const onChangeHandlerCreateIdTodolist = (e:ChangeEvent<HTMLInputElement>) => {
        setIdTodolist(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistsApi.deleteTodolist(idTodolist)
            .then(response => setState(response.data))
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={idTodolist} onChange={onChangeHandlerCreateIdTodolist} type="text"/>
                <button onClick={onClickHandler}>Delete todolist</button>
            </div>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const [idTodolist, setIdTodolist] = useState<any>(null)

    const onChangeHandlerCreateIdTodolist = (e:ChangeEvent<HTMLInputElement>) => {
        setIdTodolist(e.currentTarget.value)
    }
    const onChangeHandlerCreateTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistsApi.updateTodolist(idTodolist,title)
            .then(response => setState(response.data))
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={idTodolist} placeholder={'todolist id'} onChange={onChangeHandlerCreateIdTodolist} type="text"/>
                <input value={title} placeholder={'title'} onChange={onChangeHandlerCreateTitle} type="text"/>
                <button onClick={onClickHandler}>Update todolist</button>
            </div>
        </div>
    )
}
