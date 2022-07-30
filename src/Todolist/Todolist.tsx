import React from "react";
import classes from './Todolist.module.css'
import {FilterValuesType} from ".././App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Tasks} from "./Tasks/Tasks";


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

export type arrTasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
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
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTitleTodo}/>
            <button onClick={() => onClickHandlerTodolistDelete(props.todolistId)} className={classes.buttonDelete}>x
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <Tasks filteredTasks={filteredTasks}
               todolistId={props.todolistId}
               deleteTask={props.deleteTask}
               addCheckedTask={props.addCheckedTask}
               changeTitleTaks={props.changeTitleTaks}
               tasksNotFound={tasksNotFound}
        />
        <div>
            <button onClick={() => onClickChandgeHandler('All', props.todolistId)}
                    className={props.filter === 'All' ? 'activeButton' : ''}>All
            </button>
            <button onClick={() => onClickChandgeHandler('Active', props.todolistId)}
                    className={props.filter === 'Active' ? 'activeButton' : ''}>Active
            </button>
            <button onClick={() => onClickChandgeHandler('Completed', props.todolistId)}
                    className={props.filter === 'Completed' ? 'activeButton' : ''}>Completed
            </button>
        </div>
    </div>)
}

