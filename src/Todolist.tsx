import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    title2?: number
    tasks: Array<arrTasksPropsType>// Джинерики
    deleteTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (str:string) => void
}

export type arrTasksPropsType = {
    id: number,
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


    return (<div>
        <h3>{props.title}</h3>
        <h3>{props.title2}</h3>
        <div>
            <input value={filterInput} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>  {props.tasks.map(el => {
            return (<li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                <button onClick={() => {
                    props.deleteTask(el.id)
                }}>X
                </button>
            </li>)
        })}

        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter('All')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('Active')
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter('Completed')
            }}>Completed
            </button>
        </div>
    </div>)
}