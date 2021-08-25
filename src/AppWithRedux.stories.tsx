import React from 'react';
import {ComponentStory, ComponentMeta,} from '@storybook/react';

import {ReduxStoreProviderDecorator} from './Store/ReduxStoreProviderDecorator';
import { AppWithRedux } from './AppWithRedux';


export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/> ;


export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
