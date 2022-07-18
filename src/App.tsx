import React, {useState} from 'react';
import './App.css';
import {arrTasksPropsType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function deleteTask(id: string, idTodolist: string) {
        let NewArrTask = arrTasks[idTodolist].filter(t => t.id !== id)
        arrTasks[idTodolist] = NewArrTask
        setTasks({...arrTasks})
    }

    function changeFilter(isDoneStatus: FilterValuesType, todolistId: string) {
        let NewTodolist = todolist.find(t => t.id === todolistId)
        if (NewTodolist) {
            NewTodolist.filter = isDoneStatus
            setTodolist([...todolist])
        }

    }

    const addNewTask = (str: string, idTodolist: string) => {

        let newTask = [{id: v1(), title: str, isDone: false}, ...arrTasks[idTodolist]]
        arrTasks[idTodolist] = newTask
        setTasks({...arrTasks})
    }

    const addCheckedTask = (id: string, isDone: boolean, idTodolist: string) => {

        let newCheckObj = arrTasks[idTodolist].find(el => el.id === id)
        if (newCheckObj) {
            newCheckObj.isDone = isDone
            setTasks({...arrTasks})
        }
    }
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'}
    ])

    let [arrTasks, setTasks] = useState({
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


    return (<div className="App">
        {todolist.map(t => {


            let filterTask = arrTasks[t.id]
            if (t.filter === 'Completed') {
                filterTask = arrTasks[t.id].filter(el => el.isDone === true)
            }
            if (t.filter === 'Active') {
                filterTask = arrTasks[t.id].filter(el => el.isDone === false)
            }
            if (t.filter === 'All') {
                filterTask = arrTasks[t.id]
            }

            return (<Todolist key={t.id}
                              todolistId={t.id}
                              title={t.title}
                              tasks={filterTask}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              addNewTask={addNewTask}
                              addCheckedTask={addCheckedTask}
                              filter={t.filter}
                />
            )
        })}
    </div>)


}


export default App;
