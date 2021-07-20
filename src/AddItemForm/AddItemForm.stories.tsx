import React from 'react';
import {ComponentStory, ComponentMeta, } from '@storybook/react';
import {AddItemForm, } from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    /** argTypes  описує властивості які може мати обєкт , а потім на основі цього попадає в  description
     *  при чому описуємо тими ж назвами які передаються в пропсах*/
    argTypes: {
      addItem: {
          description: 'Button clicked'
        }
    },

} as ComponentMeta<typeof AddItemForm>;
/** В  першому варіанті стара типізація для AddItemForm, другий - нова*/

//const Template: Story<AddItemFormProps> = (args) => <AddItemForm {...args} />;
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('Button clicked')
};
