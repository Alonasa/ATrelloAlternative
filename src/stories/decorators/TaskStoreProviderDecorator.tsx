import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";

export const TaskStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={store}>{storyFn()}</Provider>;
};
