import {v1} from 'uuid';

import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    TodolistDomainType,
    todoListsReducer
} from './todolist-reducer';
import {TodolistType} from '../../Api/Api';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>
let todolistWithServer: TodolistType


beforeEach(() => {
    todolistWithServer = {
        id: 'string',
        title: 'Beer',
        addedDate: '',
        order: 1
    }
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all',entityStatus:'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',entityStatus:'idle', addedDate: '', order: 0}
    ]
})
test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    const endState = todoListsReducer(startState, addTodoListAC(todolistWithServer))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('Beer');
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});






