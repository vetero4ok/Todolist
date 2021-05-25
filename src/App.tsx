import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log(v1())
    //BLL: Business Logic Layer
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])

    function changeTodoListFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        console.log(filteredTasks)
        setTasks(filteredTasks)
        // if(filteredTasks  !== tasks) {
        // tasks = filteredTasks
        // React.render()
        //}
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks];  // добавляем содержимое масива
        setTasks(newTasks)
        //setTasks([newTask, ...tasks])

    }

    function changeTaskStatus(taskID: string, isDone: boolean) {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t) // isDane (можно так записать)
        setTasks(updatedTasks)
    }

    function getFilteredTask() {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)//t.isDone === false
            case 'completed':
                return tasks.filter(t => t.isDone)//t.isDone === true
            default:
                return tasks
        }

    }

    //UI: User Interface
    return (
        <div className="App">
            <Todolist tasks={getFilteredTask()}
                      title={'What to learn'}
                      filter={filter}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}

            />


        </div>
    );
}

export default App;
