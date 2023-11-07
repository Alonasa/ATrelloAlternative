import React, { memo } from "react";
import { Button } from "@mui/material";

type ButtonWithMemoPropsType = {
  title: string;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  onClick: () => void;
};

export const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
  return (
    <Button
      sx={{
        flexGrow: 1,
        wordWrap: "break-word",
        overflow: "hidden",
      }}
      size={props.size}
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
});
