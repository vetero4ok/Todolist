import React from 'react';
import {ComponentStory, ComponentMeta,} from '@storybook/react';
import {AppWithRedux} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/> ;


export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
