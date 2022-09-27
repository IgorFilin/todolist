import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {deleteTaskThunkCreator, updateTaskThunkCreator} from "../../state/TasksReducer";
import {TaskStatuses} from "../../api/tasks-api";
import {RequestStatusType} from "../../state/AppReducer";

export type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    status: TaskStatuses
    entityTaskStatus: RequestStatusType
}
export const Task = React.memo(({taskId, status, todolistId, title, entityTaskStatus}: TaskPropsType) => {

    const disabledValue = entityTaskStatus === 'loading'

    const dispatch = useDispatch()

    const onClickHandlerDeleteTask = useCallback(() => {
        // @ts-ignore
        dispatch(deleteTaskThunkCreator(todolistId, taskId))
    }, [dispatch])

    const onChangeCheckHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const statusTask = e.currentTarget.checked
        // @ts-ignore
        dispatch(updateTaskThunkCreator(todolistId, taskId, {status: statusTask ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch])

    const changeTitleTask = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(updateTaskThunkCreator(todolistId, taskId, {title: newTitle}))
    }, [dispatch])

    return <div style={status === TaskStatuses.Completed ? {
        textDecoration: 'line-through',
        marginLeft: '10px',
        opacity: '0.5'
    } : {marginLeft: '10px'}}>
        <FormControlLabel
            control={
                <Checkbox disabled={disabledValue} checked={status === TaskStatuses.Completed}
                          onChange={onChangeCheckHandler}
                          icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>
            } label=""/>
        <EditableSpan disable={entityTaskStatus === 'loading'} title={title}
                      changeTitle={(newTitle) => changeTitleTask(newTitle)}/>
        <IconButton style={{float:'right'}} disabled={disabledValue} size={"small"}
                    onClick={onClickHandlerDeleteTask}><Delete/>
        </IconButton>
    </div>
})