import {EditableSpan} from "../../EditableSpan/EditableSpan";
import React from "react";
import {TasksType} from "../../AppWithRedux";
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC} from "./../../state/TasksReducer";
import {useDispatch} from "react-redux";


type TasksTypeProps = {
    filteredTasks: Array<TasksType>
    todolistId: string
    tasksNotFound: boolean
}
export const Tasks = React.memo((props: TasksTypeProps) => {


    const dispatch = useDispatch()

    const onClickHandlerDeleteTask = (id: string, todolistId: string) => {
        dispatch(deleteTaskAC(id, props.todolistId))
    }

    const onChangeCheckHandler = (id: string, isDone: boolean, idTodolist: string) => {
        dispatch(changeStatusTaskAC(id, isDone, idTodolist))
    }
    const changeTitleTask = (title: string, id: string) => {
        dispatch(changeTitleTaskAC(title, id, props.todolistId))
    }

    return (<div>{props.tasksNotFound ? <h4>Tasks not found</h4> : props.filteredTasks.map((t) => {
        return (<div style={t.isDone ? {
            textDecoration: 'line-through',
            marginLeft: '10px',
            opacity: '0.5'
        } : {marginLeft: '10px'}}
                     key={t.id}>
            <FormControlLabel
                control={<Checkbox checked={t.isDone}
                                   onChange={(e) => onChangeCheckHandler(t.id, e.currentTarget.checked, props.todolistId)}
                                   icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>} label=""/>
            <EditableSpan title={t.title} changeTitle={(title) => changeTitleTask(title, t.id)}/>
            <IconButton size={"small"}
                        onClick={() => onClickHandlerDeleteTask(t.id, props.todolistId)}><Delete/>
            </IconButton>
        </div>)
    })}</div>)
})