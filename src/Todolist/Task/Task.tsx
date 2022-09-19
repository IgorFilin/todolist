import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {deleteTaskThunkCreator, updateTaskAC, updateTaskThunkCreator} from "../../state/TasksReducer";
import {TaskStatuses} from "../../api/tasks-api";

export type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    status: TaskStatuses
}
export const Task = React.memo(({taskId, status, todolistId, title}: TaskPropsType) => {
    const dispatch = useDispatch()

    const onClickHandlerDeleteTask = useCallback(() => {
        // @ts-ignore
        dispatch(deleteTaskThunkCreator(todolistId, taskId))
    }, [dispatch])

    const onChangeCheckHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const statusTask = e.currentTarget.checked
        // @ts-ignore
        dispatch(updateTaskThunkCreator(todolistId,taskId, {status:statusTask ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch])

    const changeTitleTask = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(updateTaskThunkCreator(todolistId,taskId, {title:newTitle}))
    }, [dispatch])

    return <div style={status === TaskStatuses.Completed? {
        textDecoration: 'line-through',
        marginLeft: '10px',
        opacity: '0.5'
    } : {marginLeft: '10px'}}>
        <FormControlLabel
            control={<Checkbox checked={status === TaskStatuses.Completed}
                               onChange={onChangeCheckHandler}
                               icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>} label=""/>
        <EditableSpan title={title} changeTitle={(newTitle) => changeTitleTask(newTitle)}/>
        <IconButton size={"small"}
                    onClick={onClickHandlerDeleteTask}><Delete/>
        </IconButton>
    </div>
})