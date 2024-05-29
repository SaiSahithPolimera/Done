import { loadToDo } from "./saveToDo";

const createToDo = (
  id,
  task,
  isCompleted,
  category,
  dueDate,
  notes,
  status
) => {
  const todo = {};
  todo.id = id;
  todo.task = task;
  todo.dueDate = dueDate;
  todo.isCompleted = isCompleted;
  todo.category = category;
  todo.notes = notes;
  todo.status = status;
  return addTodo(todo);
};

const deleteToDo = (id) => {
  return toDoList.filter((todo) => todo.id !== id);
};

const updateToDo = (
  id,
  task,
  isCompleted,
  category,
  dueDate,
  notes,
  status
) => {
  const todo = toDoList.filter((todo) => {
    if (todo.id === id) {
      return todo;
    }
  });
  todo.id = id;
  todo.task = task;
  todo.category = category;
  todo.isCompleted = isCompleted;
  todo.dueDate = dueDate;
  todo.notes = notes;
  todo.status = status;
  return todo;
};

const toDoList = loadToDo();

const addTodo = (task) => {
  todoList.push(task);
  return todoList;
};
const showToDos = () => toDoList;

export { createToDo, deleteToDo, updateToDo, showToDos };
