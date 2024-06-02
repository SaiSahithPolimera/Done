import { showToDos, updateToDo, deleteToDo } from "./todo";
import { differenceInDays, formatDistance, subDays } from "date-fns";

const allTasksContainer = document.createElement("div");
const createTask = (todo, allTasksContainer) => {
  const task = document.createElement("div");
  const checkBox = document.createElement("input");
  const taskGroup = document.createElement("div");
  const taskContent = document.createElement("p");
  const taskCategory = document.createElement("p");
  const deleteIcon = document.createElement("img");
  const deleteButton = document.createElement("button");
  const result = differenceInDays(todo.dateCreated, todo.dateCompleted);
  const totalDays = document.createElement("span");
  totalDays.textContent = formatDistance(
    subDays(new Date(), result),
    new Date(),
    { addSuffix: true }
  );
  task.id = "task";
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todo.isCompleted;
  task.appendChild(checkBox);
  taskContent.textContent = todo.task;
  taskCategory.textContent = todo.category;
  deleteIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTlhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWN0g2ek04IDloOHYxMEg4em03LjUtNWwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+PC9zdmc+";
  deleteButton.classList.add("deleteButton");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => {
    deleteToDo(todo.id);
    task.style.display = "none";
  });
  if (todo.isCompleted) {
    taskContent.style.textDecoration = "line-through";
  }
  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      taskContent.style.textDecoration = "line-through";
      todo.isCompleted = true;
      todo.dateCompleted = new Date();
      updateToDo(todo);
    } else {
      todo.isCompleted = false;
      updateToDo(todo);
      taskContent.style.textDecoration = "none";
    }
  });
  taskGroup.appendChild(taskContent);
  taskGroup.appendChild(taskCategory);
  task.appendChild(taskGroup);
  task.appendChild(totalDays);
  task.appendChild(deleteButton);
  return task;
};

const allTasks = () => {
  allTasksContainer.id = "allTasks";
  while(allTasksContainer.hasChildNodes()) {
    allTasksContainer.removeChild(allTasksContainer.lastChild);
  }
  const todoList = showToDos();
  todoList.forEach((todo) => {
    allTasksContainer.appendChild(createTask(todo, allTasks));
  });
  return allTasksContainer;
};

export { allTasks };
