import React from 'react';
import {ComponentStory, ComponentMeta,} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskStatuses} from '../../Api/Api';


export default {
    title: 'TODOLIST/Task',
    component: Task,

    argTypes: {
        /**
         * інший варіант коли закидають baseArgs спільні пропси в тайпи, а потім baseArgs можна видалити
         removeTask: action('removeTask'),
         changeTaskStatus: action('changeTaskStatus'),
         changeTaskTitle: action('changeTaskTitle'),
         * */

    },

} as ComponentMeta<typeof Task>;
const removeTaskCallback = action('Remove Button inside Task clicked')
const changeTaskStatusCallback = action('Task status is changed')
const changeTaskTitleCallback = action('Title changed inside task')

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
}
/** Лібо пишемо на пряму в лоб*/
/**
 export const TaskIsDoneStories = Template.bind({});
 TaskIsDoneStories.args = {
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    task: {id: '2', isDone: true, title: 'js'},
    todoListsID: 'todolistId1',
};
 */

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    ...baseArgs,
    task: {
        id: '2', status: TaskStatuses.Completed, title: 'js', description: '',
        todoListId: 'todoListsID',
        order: 0,
        priority: 0,
        startDate: '',
        deadline: 'string',
        addedDate: ''
    },
    todoListsID: 'todolistId1',
};
export const TaskISNotDoneStories = Template.bind({});
TaskISNotDoneStories.args = {
    ...baseArgs,
    task: {id: '2', status: TaskStatuses.New, title: 'js', description: '',
        todoListId: 'todoListsID',
        order: 0,
        priority: 0,
        startDate: '',
        deadline: 'string',
        addedDate: ''},
    todoListsID: 'todolistId1',
};