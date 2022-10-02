import React, {useCallback, useEffect} from "react";
import classes from './Todolist.module.css'
import {FilterValuesType} from "../state/TodolistReducer";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {createTaskThunkCreator, fetchTasksThunkCreator, TasksDomainType} from "../state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "../state/store";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import {RequestStatusType} from "../state/AppReducer";
import {Navigate} from "react-router-dom";


type TodoListPropsType = {
    title: string
    changeFilter: (valueFilter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    changeTitleTodolist: (titleTodolist: string, todolistId: string) => void
    entityStatus:RequestStatusType
}


export let Todolist = React.memo((props: TodoListPropsType) => {
    const tasks = useSelector<AppRootReducerType, Array<TasksDomainType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(fetchTasksThunkCreator(props.todolistId))
    },[])

    const onClickChangeHandler = useCallback((name: FilterValuesType, todolistId: string) => {
        props.changeFilter(name, props.todolistId)
    }, [props.todolistId, props.changeFilter])


    const onClickHandlerTodolistDelete = useCallback((todolistId: string) => {
        props.deleteTodolist(todolistId)
    }, [props.deleteTodolist])

    const changeTitleTodolist = useCallback((title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }, [props.changeTitleTodolist, props.todolistId])

    const createTask = useCallback((titleTask: string) => {
        dispatch(createTaskThunkCreator(props.todolistId,titleTask))
    }, [dispatch])

    let filteredTasks = tasks
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (props.filter === 'All') {
        filteredTasks = tasks
    }

    const tasksNotFound = filteredTasks.length === 0

    return (<div className={classes.task}>
        <h2 style={{textAlign: 'center'}}>
            <EditableSpan disable={props.entityStatus === 'loading'} title={props.title} changeTitle={changeTitleTodolist}/>
            <IconButton disabled={props.entityStatus === 'loading'}  size={"small"} onClick={() => onClickHandlerTodolistDelete(props.todolistId)}
                        className={classes.buttonDelete}><DeleteForever/>
            </IconButton>
        </h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <AddItemForm addItem={createTask} disable={props.entityStatus === 'loading'}/>
        </div>
        <div>
            {tasksNotFound ? <h4>Tasks not found</h4> : filteredTasks.map((t) => <Task
                todolistId={props.todolistId}
                taskId={t.id}
                title={t.title}
                status={t.status}
                key={t.id}
                entityTaskStatus={t.entityTaskStatus}
            />)}
        </div>
        <div style={{textAlign: 'center'}}>
            <Button color={props.filter === 'All' ? "secondary" : "default"} size={"small"} variant={"contained"}
                    onClick={() => onClickChangeHandler('All', props.todolistId)}>All
            </Button>
            <Button color={props.filter === 'Active' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={() => onClickChangeHandler('Active', props.todolistId)}
            >Active
            </Button>
            <Button color={props.filter === 'Completed' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={() => onClickChangeHandler('Completed', props.todolistId)}>Completed
            </Button>
        </div>
    </div>)
})

