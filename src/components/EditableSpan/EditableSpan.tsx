import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type SpanPropsType = {
  value: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan = (props: SpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const editOn = () => {
    setEditMode(true);
  };

  const editOff = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      variant={"standard"}
      type={"text"}
      value={title}
      onBlur={editOff}
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={editOn}>{props.value}</span>
  );
};
