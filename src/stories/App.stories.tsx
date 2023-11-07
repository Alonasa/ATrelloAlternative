import type { Meta, StoryObj } from "@storybook/react";
import App from "../app/App";
import { AppWithReduxProviderDecorator } from "./decorators/AppWithReduxProviderDecorator";

const meta: Meta<typeof App> = {
  title: "App/AppWithRedux",
  component: App,
  tags: ["autodocs"],
  decorators: [AppWithReduxProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
  render: () => <App />,
};
