import React from 'react';
import {ComponentStory, ComponentMeta,} from '@storybook/react';

import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import { App } from './App';


export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},

} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App/> ;


export const AppStories = Template.bind({});
AppStories.args = {};
