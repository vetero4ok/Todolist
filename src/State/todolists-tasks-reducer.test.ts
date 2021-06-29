import {TasksStateType, TodolistType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {AddTodoListAC, todoListsReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    let startTodolistsState: Array<TodolistType>;
    startTodolistsState = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListsID);
    expect(idFromTodolists).toBe(action.todoListsID);
});
