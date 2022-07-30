import React, {useState} from 'react';
import './App.css';
import {arrTasksPropsType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolist1 = v1()
    let todolist2 = v1()
    let [tasks, setTasks] = useState({
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

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'}
    ])
    const deleteTask = (id: string, idTodolist: string) => {
        let NewArrTask = tasks[idTodolist].filter(t => t.id !== id)
        tasks[idTodolist] = NewArrTask
        setTasks({...tasks})
    }

    const changeFilter = (isDoneStatus: FilterValuesType, todolistId: string) => {
        let NewTodolist = todolist.find(t => t.id === todolistId)
        if (NewTodolist) {
            NewTodolist.filter = isDoneStatus
            setTodolist([...todolist])
        }

    }

    const addNewTask = (str: string, idTodolist: string) => {
        let newTask = [{id: v1(), title: str, isDone: false}, ...tasks[idTodolist]]
        tasks[idTodolist] = newTask
        setTasks({...tasks})
    }

    const addCheckedTask = (id: string, isDone: boolean, idTodolist: string) => {
        let newCheckObj = tasks[idTodolist].find(el => el.id === id)
        if (newCheckObj) {
            newCheckObj.isDone = isDone
            setTasks({...tasks})
        }
    }

    const deleleTodolist = (idTodolist: string) => {
        let newArrTodolist = todolist.filter(tl => tl.id !== idTodolist)
        setTodolist(newArrTodolist)
        delete tasks[idTodolist]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let todolistId = v1()
        setTodolist([...todolist, {id: todolistId, title: title, filter: 'All'}])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTitleTodolist = (title: string, idtodolist: string) => {
        setTodolist(todolist.map(tl => tl.id === idtodolist ? {...tl, title: title} : tl))
    }
    const changeTitleTaks = (title: string, id: string, idTodolist: string) => {
        setTasks({...tasks, [idTodolist]: tasks[idTodolist].map(t => t.id === id ? {...t, title: title} : t)})
    }
    const mappingTodolists = todolist.map(t => {
        let arrayTasks = tasks[t.id]
        return (<Todolist key={t.id}
                          deleleTodolist={deleleTodolist}
                          todolistId={t.id}
                          title={t.title}
                          tasks={arrayTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          addNewTask={addNewTask}
                          addCheckedTask={addCheckedTask}
                          filter={t.filter}
                          changeTitleTodolist={changeTitleTodolist}
                          changeTitleTaks={changeTitleTaks}
        />)
    })

    return (<div className="App">
        <AddItemForm addItem={addTodolist}/>
        {mappingTodolists}
    </div>)


}


export default App;
