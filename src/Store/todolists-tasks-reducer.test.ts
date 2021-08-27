import {tasksReducer, TasksStateType} from './tasks-reducer';
import {addTodoListAC, TodolistDomainType, todoListsReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    let startTodolistsState: Array<TodolistDomainType>;
    startTodolistsState = [];
    let todolistWithServer = {
        id: 'string',
        title: 'Beer',
        addedDate: '',
        order: 1
    }
    const action = addTodoListAC(todolistWithServer);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
