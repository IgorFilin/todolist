import React, {useState} from 'react';
import './App.css';
import {arrTasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    let [arrTasks, setTasks] = useState<Array<arrTasksPropsType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('All')

    //////////////////////////////////////////////////////////////////////////////////
    function deleteTask(id: string) {

        let filterTask = arrTasks.filter(el => el.id !== id)
        setTasks(filterTask)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let filterTask = arrTasks
    const ChangeTask = (filter: FilterValuesType, arrTasks: Array<arrTasksPropsType>): Array<arrTasksPropsType> => {
        if (filter === 'Completed') {
            filterTask = arrTasks.filter(el => el.isDone === true)
        } else if (filter === 'Active') {
            filterTask = arrTasks.filter(el => el.isDone === false)
        } else if (filter === 'All') {
            filterTask = arrTasks
        }
        return filterTask
    }

    filterTask = ChangeTask(filter, arrTasks)

    /////////////////////////////////////////////////////////////////////////////////


    const addNewTask = (str: string) => {
        let newTask = [{id: v1(), title: str, isDone: false}, ...arrTasks]
        setTasks(newTask)
    }
    ///////////////////////////////////////////////////////////////////////////////////

    const addCheckedTask = (id: string, isDone: boolean) => {

        let newCheckObj = arrTasks.find(el => el.id === id)
        if (newCheckObj) {
            newCheckObj.isDone = isDone
            setTasks([...arrTasks])
        }
    }


    return (<div className="App">
        <Todolist title={'What to learn'}
                  tasks={filterTask}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  addNewTask={addNewTask}
                  addCheckedTask={addCheckedTask}
        />

    </div>)


}


export default App;
