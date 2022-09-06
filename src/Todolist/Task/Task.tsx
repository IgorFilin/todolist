import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC} from "../../state/TasksReducer";

export type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
}
export const Task = React.memo(({taskId, isDone, todolistId, title}: TaskPropsType) => {
    console.log('rerender Task')
    const dispatch = useDispatch()

    const onClickHandlerDeleteTask = useCallback(() => {
        dispatch(deleteTaskAC(taskId, todolistId))
    }, [dispatch])

    const onChangeCheckHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        dispatch(changeStatusTaskAC(taskId, e.target.checked, todolistId))
    }, [dispatch])

    const changeTitleTask = useCallback((newTitle: string) => {
        dispatch(changeTitleTaskAC(newTitle, taskId, todolistId))
    }, [dispatch])

    return <div style={isDone ? {
        textDecoration: 'line-through',
        marginLeft: '10px',
        opacity: '0.5'
    } : {marginLeft: '10px'}}>
        <FormControlLabel
            control={<Checkbox checked={isDone}
                               onChange={onChangeCheckHandler}
                               icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>} label=""/>
        <EditableSpan title={title} changeTitle={(newTitle) => changeTitleTask(newTitle)}/>
        <IconButton size={"small"}
                    onClick={onClickHandlerDeleteTask}><Delete/>
        </IconButton>
    </div>
})