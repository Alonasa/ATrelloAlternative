import { v1 } from "uuid";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  TodolistDomainType,
  TodolistsReducer,
} from "./TodolistsReducer";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    {
      id: todolistID1,
      title: "What to learn",
      filter: "All",
      addedDate: "2023-08-17T17:03:14.933",
      order: -4,
      entityStatus: "idle",
    },
    {
      id: todolistID2,
      title: "What to buy",
      filter: "All",
      addedDate: "2023-08-17T17:03:14.933",
      order: -2,
      entityStatus: "idle",
    },
  ];
});

test("New todolist should be added", () => {
  const endState = TodolistsReducer(startState, AddTodolistAC("New Title"));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New Title");
});

test("Selected Todolist should be removed", () => {
  const endState = TodolistsReducer(startState, RemoveTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
  expect(endState[0].title).toBe("What to buy");
});

test("Filter in selected Todolist should be changed", () => {
  const endState = TodolistsReducer(
    startState,
    ChangeTodolistFilterAC(todolistID1, "Completed"),
  );

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todolistID1);
  expect(endState[0].filter).toBe("Completed");
});

test("Title of selected todolist should be changed", () => {
  const endState = TodolistsReducer(
    startState,
    ChangeTodolistTitleAC(todolistID1, "NewTitle"),
  );

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todolistID1);
  expect(endState[0].title).toBe("NewTitle");
});
