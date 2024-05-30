import { loadToDo, saveToDo } from "./saveToDo";

let toDoList = loadToDo();
const createToDo = (
  id,
  task,
  isCompleted,
  category,
  dateCreated,
  dueDate,
  notes,
) => {
  const todo = {};
  todo.id = id;
  todo.task = task;
  todo.dueDate = dueDate;
  todo.dateCreated = dateCreated,
  todo.isCompleted = isCompleted;
  todo.category = category;
  todo.notes = notes;
  addTodo(todo);
  return todo;
};

const deleteToDo = (id) => {
  toDoList = toDoList.filter((todo) => todo.id !== id ? todo : false);
  saveToDo();
  loadToDo();
};



const updateToDo = (
  id,
  task,
  isCompleted,
  category,
  dueDate,
  dateCreated,
  notes,
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
  todo.dateCreated = dateCreated;
  todo.notes = notes;
  saveToDo();
  loadToDo();
};

const addTodo = (task) => {
  toDoList.push(task);
  saveToDo();
  loadToDo();
  return toDoList;
};
const showToDos = () => toDoList;

export { createToDo, deleteToDo, updateToDo, showToDos };
