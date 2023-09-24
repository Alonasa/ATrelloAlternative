import type {Meta, StoryObj} from '@storybook/react';
import {Task} from '../components/Task/Task';
import {TaskStoreProviderDecorator} from './decorators/TaskStoreProviderDecorator';
import {store} from '../app/store';

const meta: Meta<typeof Task> = {
  title: 'Task/TaskWithRedux',
  component: Task,
  parameters: {
	layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [TaskStoreProviderDecorator],
  args: {
	task: {id: '01', title: 'Task for storybook', status: 0, description: '', priority: 2, startDate: '', deadline:'', todoListId: '3', order: 2, addedDate: ''},
	todoListId: store.getState().todolists[1]['id']
  },
};


export default meta;
type Story = StoryObj<typeof Task>;

export const TaskWithReduxUnchecked: Story = {}

export const TaskWithReduxChecked: Story = {
  args: {
	task: {id: '01', title: 'Task for storybook', status: 1, description: '', priority: 2, startDate: '', deadline:'', todoListId: '3', order: 2, addedDate: ''},
  }
}