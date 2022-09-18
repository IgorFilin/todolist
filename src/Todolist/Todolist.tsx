import React, {useCallback} from "react";
import classes from './Todolist.module.css'
import {FilterValuesType} from "../AppWithRedux";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {addNewTaskAC} from "../state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../state/store";
import {Task} from "./Task/Task";
import {TaskStatuses, TasksType} from "../api/tasks-api";


type TodoListPropsType = {
    title: string
    changeFilter: (valueFilter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    changeTitleTodolist: (titleTodolist: string, todolistId: string) => void
}


export let Todolist = React.memo((props: TodoListPropsType) => {
    const tasks = useSelector<AppRootReducerType, Array<TasksType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const onClickChangeHandler = useCallback((name: FilterValuesType, todolistId: string) => {
        props.changeFilter(name, props.todolistId)
    }, [props.todolistId, props.changeFilter])


    const onClickHandlerTodolistDelete = useCallback((todolistId: string) => {
        props.deleteTodolist(todolistId)
    }, [props.deleteTodolist])

    const changeTitleTodolist = useCallback((title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }, [props.changeTitleTodolist, props.todolistId])

    const addTask = useCallback((titleTask: string) => {
        dispatch(addNewTaskAC(titleTask, props.todolistId))
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
            <EditableSpan title={props.title} changeTitle={changeTitleTodolist}/>
            <IconButton size={"small"} onClick={() => onClickHandlerTodolistDelete(props.todolistId)}
                        className={classes.buttonDelete}><DeleteForever/>
            </IconButton>
        </h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <AddItemForm addItem={addTask}/>
        </div>
        <div>
            {tasksNotFound ? <h4>Tasks not found</h4> : filteredTasks.map((t) => <Task
                todolistId={props.todolistId}
                taskId={t.id}
                title={t.title}
                status={t.status}
                key={t.id}
            />)}
        </div>
        <div style={{textAlign: 'center'}}>
            <Button color={props.filter === 'All' ? "secondary" : "default"} size={"small"} variant={"contained"}
                    onClick={useCallback(() => onClickChangeHandler('All', props.todolistId), [props.todolistId])}>All
            </Button>
            <Button color={props.filter === 'Active' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={useCallback(() => onClickChangeHandler('Active', props.todolistId), [props.todolistId])}
            >Active
            </Button>
            <Button color={props.filter === 'Completed' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={useCallback(() => onClickChangeHandler('Completed', props.todolistId), [props.todolistId])}>Completed
            </Button>
        </div>
    </div>)
})

