import {EditableSpan} from "../../EditableSpan/EditableSpan";
import classes from "../Todolist.module.css";
import React from "react";
import {arrTasksPropsType} from "../../App";
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Add, Delete, Favorite, FavoriteBorder} from "@material-ui/icons";


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

    return (<div>{props.tasksNotFound ? <h4>Tasks not found</h4> : props.filteredTasks.map((t) => {
        return (<div style={{marginLeft: '10px'}} key={t.id} className={t.isDone ? 'complitedCheckbox' : ''}>
            <FormControlLabel
                control={<Checkbox checked={t.isDone}
                                   onChange={(e) => onChangeCheckHandler(t.id, e.currentTarget.checked, props.todolistId)}
                                   icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>}
                label=""
            />
            <EditableSpan title={t.title} changeTitle={(title) => changeTitleTask(title, t.id)}/>
            <IconButton size={"small"} className={classes.buttonDelete}
                        onClick={() => onClickHandlerDeleteTask(t.id, props.todolistId)}><Delete/>
            </IconButton>
        </div>)
    })}</div>)
}