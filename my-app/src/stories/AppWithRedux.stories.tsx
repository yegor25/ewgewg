import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import AppWithRedux from '../AppWithRedux';
import { Provider } from 'react-redux';
import { store } from '../store/storeRedux';
import { ReduxStoreProviderDecorator } from '../store/ReduxStoreDecorator';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'APP/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;



export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {};