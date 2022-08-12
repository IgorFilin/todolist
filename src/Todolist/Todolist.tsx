import React from "react";
import classes from './Todolist.module.css'
import {arrTasksPropsType, FilterValuesType} from ".././App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Tasks} from "./Tasks/Tasks";
import {Button, IconButton} from "@material-ui/core";
import {AddCircle, DeleteForever} from "@material-ui/icons";


type TodoListPropsType = {
    title: string
    tasks: Array<arrTasksPropsType>// Джинерики
    deleteTask: (idTask: string, idTodolist: string) => void
    changeFilter: (valueFilter: FilterValuesType, todolistId: string) => void
    addNewTask: (titleTask: string, idTodolist: string) => void
    addCheckedTask: (idTask: string, isDone: boolean, idTodolist: string) => void
    filter: FilterValuesType
    todolistId: string
    deleleTodolist: (todolistId: string) => void
    changeTitleTodolist: (titleTodolist: string, todolistId: string) => void
    changeTitleTaks: (titleTask: string, id: string, todolistId: string) => void
}


export let Todolist = (props: TodoListPropsType) => {

    const onClickChandgeHandler = (name: FilterValuesType, todolistId: string) => {
        props.changeFilter(name, props.todolistId)
    }


    const onClickHandlerTodolistDelete = (todolistId: string) => {
        props.deleleTodolist(todolistId)
    }

    const addTask = (title: string) => {
        props.addNewTask(title, props.todolistId)
    }

    const changeTitleTodo = (title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }


    let filteredTasks = props.tasks
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }
    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'All') {
        filteredTasks = props.tasks
    }

    const tasksNotFound = filteredTasks.length === 0

    return (<div className={classes.task}>
        <h2 style={{textAlign: 'center'}}>
            <EditableSpan title={props.title} changeTitle={changeTitleTodo}/>
            <IconButton size={"small"} onClick={() => onClickHandlerTodolistDelete(props.todolistId)}
                        className={classes.buttonDelete}><DeleteForever/>
            </IconButton>
        </h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <AddItemForm addItem={addTask}/>
        </div>

        <Tasks filteredTasks={filteredTasks}
               todolistId={props.todolistId}
               deleteTask={props.deleteTask}
               addCheckedTask={props.addCheckedTask}
               changeTitleTaks={props.changeTitleTaks}
               tasksNotFound={tasksNotFound}
        />
        <div style={{textAlign: 'center'}}>
            <Button color={props.filter === 'All' ? "secondary" : "default"} size={"small"} variant={"contained"}
                    onClick={() => onClickChandgeHandler('All', props.todolistId)}>All
            </Button>
            <Button color={props.filter === 'Active' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={() => onClickChandgeHandler('Active', props.todolistId)}
            >Active
            </Button>
            <Button color={props.filter === 'Completed' ? "secondary" : "default"} style={{marginLeft: '3px'}}
                    size={"small"} variant={"contained"}
                    onClick={() => onClickChandgeHandler('Completed', props.todolistId)}>Completed
            </Button>
        </div>
    </div>)
}

