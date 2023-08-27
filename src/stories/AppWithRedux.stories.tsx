import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {AppWithReduxProviderDecorator} from './decorators/AppWithReduxProviderDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'App/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
  decorators: [AppWithReduxProviderDecorator]
};


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux/>
}
