import React, {useEffect, useState} from 'react'
import {tasksApi} from "../../api/tasks-api";
import axios from "axios";


export default {
    title: 'API/TASKS'
}


export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ebbddc7-e782-41a1-8288-5779e61816cf'
        tasksApi.getTasks(todolistId)
            .then(resolve => {
                setState(resolve.data.items)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const createTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ebbddc7-e782-41a1-8288-5779e61816cf'
        tasksApi.createTask(todolistId, 'new task')
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ebbddc7-e782-41a1-8288-5779e61816cf'
        const taskId = '5eb35851-0ba5-4d32-8a59-f4ed5a7d96d0'
        tasksApi.updateTask(todolistId, taskId, 'updated task')
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ebbddc7-e782-41a1-8288-5779e61816cf'
        const taskId = '5eb35851-0ba5-4d32-8a59-f4ed5a7d96d0'
        tasksApi.deleteTask(todolistId, taskId)
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

