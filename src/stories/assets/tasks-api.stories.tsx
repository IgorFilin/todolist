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
        tasksApi.createTask(todolistId, 'new task2')
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
        const taskId = 'cc82380f-8105-41c3-bd6f-fb989ccf3976'
        tasksApi.updateTask(todolistId, taskId)
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
        const taskId = 'ea18a950-1c2f-44b2-892a-ee29803528cc'
        tasksApi.deleteTask(todolistId, taskId)
            .then(resolve => {
                setState(resolve.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

