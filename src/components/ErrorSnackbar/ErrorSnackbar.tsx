import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from 'app/store';
import { setAppErrorAC } from 'app/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

export function ErrorSnackbar() {
  const error = useAppSelector<string | null>((state) => state.app.error);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(!!error);
  
  React.useEffect(() => {
    setOpen(!!error);
  }, [error]);
  
  const handleClose = () => {
    setOpen(false);
    dispatch(setAppErrorAC(null));
  };
  
  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
}