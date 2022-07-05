import React, {useState} from 'react';
import './App.css';
import {arrTasksPropsType, Todolist} from "./Todolist";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    let [arrTasks, setTasks] = useState<Array<arrTasksPropsType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('All')

     //////////////////////////////////////////////////////////////////////////////////
    function deleteTask(id: number) {

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


    const addNewTask = (str:string) => {
        let newTask = [{id: 4, title: str, isDone: false},...arrTasks]
        setTasks(newTask)
    }


    return (<div className="App">
        <Todolist title={'What to learn'}
                  title2={1}
                  tasks={filterTask}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  addNewTask={addNewTask}
        />

    </div>)


}


export default App;
