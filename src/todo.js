import { load, save } from "./save";

let toDoList =  load("toDoList");
if (load("toDoList") === null || load("toDoList") === undefined || load("toDoList") === "") {
  toDoList = [
    {
      id: 1,
      task: "This is a Sample task",
      dateCreated: new Date(),
      dateCompleted: new Date(),
      isCompleted: false,
      category: "Personal",
      notes: "",
    },
  ];
}


const createToDo = (
  id,
  task,
  isCompleted,
  category,
  dateCreated,
  dateCompleted,
  notes,
) => {
  const todo = {};
  todo.id = id;
  todo.task = task;
  todo.dateCreated = dateCreated,
  todo.dateCompleted = dateCompleted;
  todo.isCompleted = isCompleted;
  todo.category = category;
  todo.notes = notes;
  addTodo(todo);
  return todo;
};

const deleteToDo = (id) => {
  toDoList = toDoList.filter((todo) => todo.id !== id ? todo : false);
  save("toDoList", showToDos());
  load("toDoList");
};


const updateToDo = (
  id,
  task,
  isCompleted,
  category,
  dateCreated,
  dateCompleted,
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
  todo.dateCreated = dateCreated;
  todo.dateCompleted = dateCompleted;
  todo.notes = notes;
  save("toDoList", showToDos());
  load("toDoList");
};

const addTodo = (task) => {
  toDoList.push(task);
  save("toDoList", showToDos());
  load("toDoList");
  return toDoList;
};
const showToDos = () => toDoList;

export { createToDo, deleteToDo, updateToDo, showToDos };
