import {EditableSpan} from "../../EditableSpan/EditableSpan";
import classes from "../Todolist.module.css";
import React from "react";
import {arrTasksPropsType} from "../Todolist";

type TasksTypeProps = {
    filteredTasks: Array<arrTasksPropsType>
    todolistId: string
    deleteTask: (id: string, todolistId: string) => void
    addCheckedTask: (id: string, isDoneValue: boolean, idTodolist: string) => void
    changeTitleTaks: (titleTask: string, id: string, idTodolist: string) => void
    tasksNotFound: boolean
}
export const Tasks = (props: TasksTypeProps) => {


    const onClickHandlerDeleteTask = (id: string, todolistId: string) => {
        props.deleteTask(id, todolistId)
    }

    const onChangeCheckHandler = (id: string, isDone: boolean, idTodolist: string) => {
        props.addCheckedTask(id, isDone, idTodolist)
    }
    const changeTitleTask = (title: string, id: string) => {
        props.changeTitleTaks(title, id, props.todolistId)
    }

    return (<>{props.tasksNotFound ? <h4>Tasks not found</h4> : props.filteredTasks.map((t) => {
        return (<div key={t.id} className={t.isDone ? 'complitedCheckbox' : ''}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => onChangeCheckHandler(t.id, e.currentTarget.checked, props.todolistId)}/>
            <EditableSpan title={t.title} changeTitle={(title) => changeTitleTask(title, t.id)}/>
            <button className={classes.buttonDelete}
                    onClick={() => onClickHandlerDeleteTask(t.id, props.todolistId)}>x
            </button>
        </div>)
    })}</>)
}