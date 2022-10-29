import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {deleteTaskThunkCreator, fetchTasksThunkCreator, updateTaskThunkCreator} from "../../../../state/TasksReducer";
import {TaskStatuses} from "../../../../api/tasks-api";
import {RequestStatusType} from "../../../../state/AppReducer";
import {AppDispatch} from "../../../../state/store";

export type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    status: TaskStatuses
    entityTaskStatus: RequestStatusType
}
export const Task = React.memo(({taskId, status, todolistId, title, entityTaskStatus}: TaskPropsType) => {
    const dispatch = useDispatch<AppDispatch>()

    const disabledValue = entityTaskStatus === 'loading'

    const onClickHandlerDeleteTask = useCallback(() => {
        dispatch(deleteTaskThunkCreator(todolistId, taskId))
    }, [dispatch])

    const onChangeCheckHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const statusTask = e.currentTarget.checked
        dispatch(updateTaskThunkCreator(todolistId, taskId, {status: statusTask ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch])

    const changeTitleTask = useCallback((newTitle: string) => {
        dispatch(updateTaskThunkCreator(todolistId, taskId, {title: newTitle}))
    }, [dispatch])

    return <div style={status === TaskStatuses.Completed ? {
        textDecoration: 'line-through',
        marginLeft: '10px',
        opacity: '0.5'
    } : {marginLeft: '10px'}}>
        <Checkbox
            disabled={disabledValue} checked={status === TaskStatuses.Completed}
            onChange={onChangeCheckHandler}
            name="checkedH"
            color="secondary"
        />
        <EditableSpan disable={entityTaskStatus === 'loading'} title={title}
                      changeTitle={(newTitle) => changeTitleTask(newTitle)}/>
        <IconButton style={{float: 'right'}} disabled={disabledValue} size={"small"}
                    onClick={onClickHandlerDeleteTask}><Delete/>
        </IconButton>

    </div>
})