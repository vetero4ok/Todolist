import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';


type PropsTodoListType = {
    title: string,
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void// пустота, не возвращает функция
    changeTodoListFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskID:string, isDone:boolean) =>void
};


function Todolist(props: PropsTodoListType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const taskJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)

        let taskClass = t.isDone ? 'is-Done' : ''

        return (
            <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(e) => props.changeTaskStatus(t.id, e.target.checked)}
                />
                <span className={taskClass}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const onClickAddTasks = () => {
        const validatedTitle = title.trim()// trim - обрезает все пробели до и после
        if (validatedTitle) {
            props.addTask(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangePress = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onChangeKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTasks()
        }
    }
    const onClickSetAllFilter = () => props.changeTodoListFilter('all')
    const onClickSetActiveFilter = () => props.changeTodoListFilter('active')
    const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed')
    //const errorMessage = error ? <div style = {{color:'red' }}> Text  is required!</div>: null
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangePress}// event
                    onKeyPress={onChangeKeyPress}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTasks}>+</button>
            {/*{errorMessage}*/}
            {/* другой код*/}
            {error && <div style = {{color:'red' }}> Text  is required!</div>}
            </div>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickSetAllFilter}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickSetActiveFilter}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
