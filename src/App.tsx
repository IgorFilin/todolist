import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    addNewTaskAC,
    deleleTasksForTodolistAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    deleteTaskAC,
    TasksReducer, addTasksForTodolistAC
} from "./reducers/TasksReducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type arrTasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskType = {
    [key: string]: Array<arrTasksPropsType>
}

function App() {
    let todolist1 = v1()
    let todolist2 = v1()
    let [tasks, dispatchTasks] = useReducer(TasksReducer, {
        [todolist1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolist2]: [
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "VideoGame", isDone: false},
            {id: v1(), title: "VideoFilm", isDone: false}
        ]


    })

    let [todolist, dispatchTodolist] = useReducer(TodolistReducer, [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'}
    ])
    const deleteTask = (id: string, idTodolist: string) => {
        dispatchTasks(deleteTaskAC(id, idTodolist))
    }

    const changeFilter = (isDoneStatus: FilterValuesType, todolistId: string) => {
        dispatchTodolist(changeFilterAC(isDoneStatus, todolistId))
    }

    const addNewTask = (titleTask: string, idTodolist: string) => {
        dispatchTasks(addNewTaskAC(titleTask, idTodolist))
    }

    const changeStatusTask = (id: string, isDone: boolean, idTodolist: string) => {
        dispatchTasks(changeStatusTaskAC(id, isDone, idTodolist))
    }

    const deleleTodolist = (idTodolist: string) => {
        dispatchTodolist(deleteTodolistAC(idTodolist))
        dispatchTasks(deleleTasksForTodolistAC(idTodolist))
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        dispatchTodolist(addTodolistAC(title, todolistID))
        dispatchTasks(addTasksForTodolistAC(todolistID))
    }

    const changeTitleTodolist = (title: string, idtodolist: string) => {
        dispatchTodolist(changeTitleTodolistAC(title, idtodolist))
    }
    const changeTitleTask = (title: string, id: string, idTodolist: string) => {
        dispatchTasks(changeTitleTaskAC(title, id, idTodolist))
    }
    const mappingTodolists = todolist.map(t => {
        let arrayTasks = tasks[t.id]
        return (<Grid key={t.id} item>
            <Paper style={{padding: '5px 10px 10px 10px'}}>
                <Todolist deleleTodolist={deleleTodolist}
                          todolistId={t.id}
                          title={t.title}
                          tasks={arrayTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          addNewTask={addNewTask}
                          addCheckedTask={changeStatusTask}
                          filter={t.filter}
                          changeTitleTodolist={changeTitleTodolist}
                          changeTitleTaks={changeTitleTask}
                />
            </Paper>
        </Grid>)
    })

    return (<div className="App">
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge="start" color="secondary" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h5">
                    Todolists
                </Typography>
                <Button color="inherit" variant={"outlined"}>Logout</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappingTodolists}
            </Grid>
        </Container>

    </div>)


}


export default App;
