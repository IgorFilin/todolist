import React, {useCallback} from "react";
import {TasksType} from "../../AppWithRedux";
import {changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC} from "./../../state/TasksReducer";
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";


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
    const changeTitleTask = useCallback((title: string, id: string) => {
        dispatch(changeTitleTaskAC(title, id, props.todolistId))
    }, [props.todolistId, dispatch])

    return (<div>
        {props.tasksNotFound ? <h4>Tasks not found</h4> : props.filteredTasks.map((t) => <Task
            onClickHandlerDeleteTask={onClickHandlerDeleteTask}
            onChangeCheckHandler={onChangeCheckHandler}
            changeTitleTask={changeTitleTask}
            todolistId={props.todolistId}
            taskId={t.id}
            title={t.title}
            isDone={t.isDone}
            key={t.id}
        />)}
    </div>)
})

