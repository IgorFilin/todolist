import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import classes from './Todolist.module.css'
import {FilterValuesType} from ".././App";


type TodoListPropsType = {
    title: string
    tasks: Array<arrTasksPropsType>// Джинерики
    deleteTask: (id: string, idTodolist: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addNewTask: (str: string, idTodolist: string) => void
    addCheckedTask: (id: string, isDone: boolean, idTodolist: string) => void
    filter: FilterValuesType
    todolistId: string
}

export type arrTasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export let Todolist = (props: TodoListPropsType) => {


    let [filterInput, setFilterInput] = useState("")
    let [error, setError] = useState<string | null>(null)
    let filterInputTrim = filterInput.trim()

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setFilterInput(event.currentTarget.value)
    }

    const onClickHandler = () => {
        if (filterInputTrim === '') {
            return setError('Title is requider')
        }
        props.addNewTask(filterInputTrim, props.todolistId)
        setFilterInput('')
    }
    const onClickChandgeHandler = (name: FilterValuesType, todolistId: string) => {
        props.changeFilter(name, props.todolistId)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && filterInput !== '') {
            props.addNewTask(filterInputTrim, props.todolistId)
            setFilterInput('')
        } else setError('Title is requider')
    }

    const onClickHandlerDeleteTask = (id: string, todolistId: string) => {
        props.deleteTask(id, todolistId)
    }
    const onChangeCheckHandler = (id: string, isDone: boolean, idTodolist: string) => {
        props.addCheckedTask(id, isDone, idTodolist)
    }

    return (<div className={classes.task}>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? 'classErrorInput' : classes.inputClass} value={filterInput}
                   onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button className={classes.buttonAdd} onClick={onClickHandler}>+</button>
            {error && <div>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(el => {
                return (<li key={el.id} className={el.isDone === true ? 'complitedCheckbox' : ''}>
                    <input type="checkbox" checked={el.isDone}
                           onChange={(e) => onChangeCheckHandler(el.id, e.currentTarget.checked, props.todolistId)}/>
                    <span>{el.title}</span>
                    <button className={classes.buttonDelete}
                            onClick={() => onClickHandlerDeleteTask(el.id, props.todolistId)}>x
                    </button>
                </li>)
            })}

        </ul>
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