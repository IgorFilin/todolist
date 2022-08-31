import React, {useCallback} from "react";
import classes from './Todolist.module.css'
import {TasksType, FilterValuesType} from "../AppWithRedux";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Tasks} from "./Tasks/Tasks";
import {Button, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {addNewTaskAC} from "../state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../state/store";


type TodoListPropsType = {
    title: string
    changeFilter: (valueFilter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    deleleTodolist: (todolistId: string) => void
    changeTitleTodolist: (titleTodolist: string, todolistId: string) => void
}


export let Todolist = React.memo((props: TodoListPropsType) => {

    console.log('render Todolist')
    const tasks = useSelector<AppRootReducerType, Array<TasksType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const onClickChangeHandler = useCallback((name: FilterValuesType, todolistId: string) => {
        props.changeFilter(name, props.todolistId)
    }, [props.todolistId, props.changeFilter])


    const onClickHandlerTodolistDelete = (todolistId: string) => {
        props.deleleTodolist(todolistId)
    }


    const changeTitleTodolist = useCallback((title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }, [props.changeTitleTodolist, props.todolistId])

    const addTask = useCallback((titleTask: string) => {
        dispatch(addNewTaskAC(titleTask, props.todolistId))
    }, [dispatch])

    let filteredTasks = tasks
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(el => !el.isDone)
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
        <Tasks filteredTasks={filteredTasks}
               todolistId={props.todolistId}
               tasksNotFound={tasksNotFound}
        />
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

