import type {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from '../components/Task/TaskWithRedux';
import {TaskStoreProviderDecorator} from './decorators/TaskStoreProviderDecorator';
import {store} from '../state/store';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
  title: 'Task/TaskWithRedux',
  component: TaskWithRedux,
  tags: ['autodocs'],
  decorators: [TaskStoreProviderDecorator],
  args: {
    task: {id: '01', title: 'Task for storybook', isDone: false},
    tlId: store.getState().todolists[1].id
  }
};


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

export const TaskWithReduxUnchecked: Story={
}

export const TaskWithReduxChecked: Story={
  args: {
    task: {id: '01', title: 'Task for storybook', isDone: true},
  }
}