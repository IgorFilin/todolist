import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksApi, updateTaskType} from "../api/tasks-api";


export default {
    title: 'API/TASKS'
}


export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId,] = useState<any>(null)

    const onChangeHandlerGetTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.getTasks(todolistId)
            .then(item => setState(item))
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" onChange={onChangeHandlerGetTasks}/>
                <button onClick={onClickHandler}>Get Tasks</button>
            </div>
        </div>
    )
}
export const createTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeHandlerTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.createTask(todolistId, title)
            .then(resolve => setState(resolve.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={todolistId} onChange={onChangeHandlerTodolistId} placeholder={'todolist id'}/>
                <input value={title} onChange={onChangeHandlerTitle} placeholder={'title'}/>
                <button onClick={onClickHandler}>Create task</button>
            </div>
        </div>
    )
}
export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const [title, setTitle] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [completed, setCompleted] = useState<any>(false)
    const [status, setStatus] = useState<any>(0)
    const [priority, setPriority] = useState<any>(0)
    const [startDate, setStartDate] = useState<any>('')
    const [deadline, setDeadline] = useState<any>('')



    const onChangeHandlerTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.updateTask(todolistId, taskId, {title,completed,deadline,description,status,priority,startDate})
            .then(response => setState(response.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={todolistId} onChange={onChangeHandlerTodolistId} placeholder={'todolist id'}/>
                <input value={taskId} onChange={onChangeHandlerTaskId} placeholder={'task id'}/>
                <input type="title" onChange={(e)=> setTitle(e.currentTarget.value)} placeholder={'title'}/>
                <div>
                    <input type="text" onChange={(e)=> setStartDate(e.currentTarget.value)}  placeholder={'startDate'}/>
                    <input type="text" onChange={(e)=> setDescription(e.currentTarget.value)}  placeholder={'description'}/>
                    <input type="text" onChange={(e)=> setCompleted(e.currentTarget.value)}  placeholder={'completed'}/>
                </div>
                <div>
                    <input type="number" onChange={(e)=> setStatus(e.currentTarget.value)}  placeholder={'status'}/>
                    <input type="number" onChange={(e)=> setPriority(e.currentTarget.value)}  placeholder={'priority'}/>
                    <input type="text" onChange={(e)=> setDeadline(e.currentTarget.value)}   placeholder={'deadline'}/>
                </div>

                <button onClick={onClickHandler}>Update task</button>
            </div>
            <div>
                <textarea style={{width: '400px', height: '100px'}}
                          placeholder={'for save value id todo and id task'}></textarea>
            </div>
        </div>
    )
}
export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const onChangeHandlerTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={todolistId} onChange={onChangeHandlerTodolistId} placeholder={'todolist id'}/>
                <input value={taskId} onChange={onChangeHandlerTaskId} placeholder={'task id'}/>
                <button onClick={onClickHandler}>Delete task</button>
            </div>
            <div>
                <textarea style={{width: '400px', height: '100px'}}
                          placeholder={'for save value id todo and id task'}></textarea>
            </div>
        </div>
    )
}

