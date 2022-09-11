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
            .then(response => setState(response.data))
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

    const updateTaskModel:updateTaskType = {
        title: 'my perfect updated task',
        description: '',
        completed: true,
        status: 2,
        priority: 1,
        startDate:'',
        deadline: ''
    }

    const onChangeHandlerTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeHandlerTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        tasksApi.updateTask(todolistId,taskId,updateTaskModel)
            .then(response => setState(response.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input value={todolistId} onChange={onChangeHandlerTodolistId} placeholder={'todolist id'}/>
                <input value={taskId} onChange={onChangeHandlerTaskId} placeholder={'task id'}/>
                <button onClick={onClickHandler}>Update task</button>
            </div>
            <div>
                <textarea style={{width:'400px',height:'100px'}} placeholder={'for save value id todo and id task'}></textarea>
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
        tasksApi.deleteTask(todolistId,taskId)
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
                <textarea style={{width:'400px',height:'100px'}} placeholder={'for save value id todo and id task'}></textarea>
            </div>
        </div>
    )
}

