import React from 'react';
import {ComponentStory, ComponentMeta,} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,

    argTypes: {
        // changeTitle:{
        //     description: 'title is changed',
        // },
        // title: {
        //     defaultValue: 'Roman',
        //     description: 'Start title EditableSpan',
        // },

    },

} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title:'ivan',
    changeTitle:action('Title is changed')
};
