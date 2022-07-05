import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    title2?: number
    tasks: Array<arrTasksPropsType>// Джинерики
    deleteTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (str: string) => void
}

export type arrTasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export let Todolist = (props: TodoListPropsType) => {

    let [filterInput, setFilterInput] = useState("")


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterInput(event.currentTarget.value)
    }

    const onClickHandler = () => {
        props.addNewTask(filterInput)
        setFilterInput('')
    }
    const onClickChandgeHandler = (name: FilterValuesType) => {
        props.changeFilter(name)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addNewTask(filterInput)
            setFilterInput('')
        }
    }

    const onClickHandlerDeleteTask = (id:string) => {
        props.deleteTask(id)
    }


    return (<div>
        <h3>{props.title}</h3>
        <h3>{props.title2}</h3>
        <div>
            <input value={filterInput} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>  {props.tasks.map(el => {
            return (<li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                <button onClick={()=>onClickHandlerDeleteTask(el.id)}>X
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