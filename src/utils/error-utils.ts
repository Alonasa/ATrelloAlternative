import {
  setAppErrorAC,
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType,
} from "../app/app-reducer";
import { Dispatch } from "redux";
import { ResponseType } from "../api/todolists-api";

export const handleServerNetworkError = (
  dispatch: Dispatch<ErrorUtilsDispatchType>,
  error: string,
) => {
  dispatch(setAppStatusAC("failed"));
  dispatch(setAppErrorAC(error));
};

type ErrorUtilsDispatchType = SetAppErrorACType | SetAppStatusACType;

export const handleServerAppError = <T>(
  dispatch: Dispatch<ErrorUtilsDispatchType>,
  data: ResponseType<T>,
) => {
  const error = data.messages[0];
  if (error) {
    dispatch(setAppErrorAC(error));
  } else {
    dispatch(setAppStatusAC("failed"));
  }
  dispatch(setAppStatusAC("failed"));
};
