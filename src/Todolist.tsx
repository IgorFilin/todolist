import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<arrTasksPropsType>// Джинерики
    deleteTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (str: string) => void
    addCheckedTask: (id: string, isDone: boolean) => void
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
        props.addNewTask(filterInputTrim)
        setFilterInput('')
    }
    const onClickChandgeHandler = (name: FilterValuesType) => {
        props.changeFilter(name)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && filterInput !== '') {
            props.addNewTask(filterInputTrim)
            setFilterInput('')
        }else setError('Title is requider')
    }

    const onClickHandlerDeleteTask = (id: string) => {
        props.deleteTask(id)
    }
    const onChangeCheckHandler = (id: string, isDone: boolean) => {
        props.addCheckedTask(id, isDone)
    }

    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input className= {error? 'classErrorInput': ''} value={filterInput} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(el => {
                return (<li key={el.id} className={el.isDone === true? 'complitedCheckbox': ''}>
                    <input type="checkbox" checked={el.isDone} onChange={(e) => onChangeCheckHandler(el.id, e.currentTarget.checked)}/>
                    <span>{el.title}</span>
                    <button onClick={() => onClickHandlerDeleteTask(el.id)}>X
                    </button>
                </li>)
            })}

        </ul>
        <div>
            <button onClick={() => onClickChandgeHandler('All')}>All
            </button>
            <button onClick={() => onClickChandgeHandler('Active')}>Active
            </button>
            <button onClick={() => onClickChandgeHandler('Completed')}>Completed
            </button>
        </div>
    </div>)
}