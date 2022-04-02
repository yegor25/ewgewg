import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Todolist from '../Todolist';
import { action } from '@storybook/addon-actions';
import { TaskPriorities, TaskStatuses } from '../todolists-api';



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/TASK',
  component: Todolist,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    Todolist: { description: 'crud operations with tasks' },
  },
} as ComponentMeta<typeof Todolist>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistIsDoneStory.args = {
    title:'task',
    tasks:[{id:'q', title:'React',status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}],
    removeTask:action('remove task'),
    id:'dw',
    filter: 'all',
    changeFilter:action('change filter'),
    changeTaskStatus: action(' change status'),
    addTask: action('add task'),
    removeTodolist:action('remove todo'),
    changeTaskTitle: action('change task'),
    changeTodolistTilte: action('change todolist')
};

