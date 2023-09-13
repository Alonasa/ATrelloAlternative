import type {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from '../components/Task/TaskWithRedux';
import {TaskStoreProviderDecorator} from './decorators/TaskStoreProviderDecorator';
import {store} from '../state/store';

const meta: Meta<typeof TaskWithRedux> = {
  title: 'Task/TaskWithRedux',
  component: TaskWithRedux,
  parameters: {
	layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [TaskStoreProviderDecorator],
  args: {
	task: {id: '01', title: 'Task for storybook', isDone: false},
	tlId: store.getState().todolists[1]['id']
  },
};


export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

export const TaskWithReduxUnchecked: Story = {}

export const TaskWithReduxChecked: Story = {
  args: {
	task: {id: '01', title: 'Task for storybook', isDone: true},
  }
}