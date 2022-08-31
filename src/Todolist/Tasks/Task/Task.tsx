import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";

export type TaskPropsType = {
    onClickHandlerDeleteTask: (taskId: string, todolistId: string) => void
    onChangeCheckHandler: (taskId: string, status: boolean, todolistId: string) => void
    changeTitleTask: (title: string, taskId: string) => void
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
}
export const Task = (props: TaskPropsType) => {

    const onChangeCheckHandlerTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCheckHandler(props.taskId, e.currentTarget.checked, props.todolistId)
    }, [props.onChangeCheckHandler, props.taskId, props.todolistId])

    const changeTitleHandler = useCallback((title: string) => {
        props.changeTitleTask(title, props.taskId)
    }, [props.changeTitleTask, props.taskId])


    const deleteTaskHandler = useCallback(() => {
        props.onClickHandlerDeleteTask(props.taskId, props.todolistId)
    }, [props.onClickHandlerDeleteTask, props.taskId, props.todolistId])


    return <div style={props.isDone ? {
        textDecoration: 'line-through',
        marginLeft: '10px',
        opacity: '0.5'
    } : {marginLeft: '10px'}}>
        <FormControlLabel
            control={<Checkbox checked={props.isDone}
                               onChange={onChangeCheckHandlerTask}
                               icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>} label=""/>
        <EditableSpan title={props.title} changeTitle={changeTitleHandler}/>
        <IconButton size={"small"}
                    onClick={deleteTaskHandler}><Delete/>
        </IconButton>
    </div>
}