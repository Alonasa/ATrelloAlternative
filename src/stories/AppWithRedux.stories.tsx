import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from '../app/AppWithRedux';
import {AppWithReduxProviderDecorator} from './decorators/AppWithReduxProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
  title: 'App/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
  decorators: [AppWithReduxProviderDecorator]
};


export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux/>
}
