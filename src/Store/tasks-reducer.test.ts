import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';

import {addTodoListAC, removeTodoListAC} from './todolist-reducer';
import {TaskStatuses, TaskType, TodolistType} from '../Api/Api';

let startState: TasksStateType
let todolistWithServer: TodolistType
let taskWithServer: TaskType
beforeEach(() => {
    todolistWithServer = {
        id: 'string',
        title: 'Beer',
        addedDate: '',
        order: 1
    }
    taskWithServer = {
        id: '1', title: 'juce', description: '', todoListId: 'todolistId2',
        order: 0, status: TaskStatuses.New, priority: 0,
        startDate: '', deadline: '', addedDate: ''
    }
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '2', title: 'JS', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '3', title: 'React', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '2', title: 'milk', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '3', title: 'tea', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '2', title: 'JS', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '3', title: 'React', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: '3', title: 'tea', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            }
        ]
    });

});
test('correct task should be added to correct array', () => {
    const action = addTaskAC(taskWithServer);
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);

});
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'beer', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe('JS');

});
test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC(todolistWithServer);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC('todolistId2');
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});





