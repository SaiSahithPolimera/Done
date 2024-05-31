import { showToDos, createToDo, deleteToDo, updateToDo } from "./todo";
import { loadEditor } from "./taskEditor";

const todayList = document.createElement("div");
const Done = document.createElement("h3");
const Today = document.createElement("h3");
const createTask = (todo) => {
  const container = document.createElement("div");
  const checkBox = document.createElement("input");
  const taskGroup = document.createElement("div");
  const taskContent = document.createElement("p");
  const taskCategory = document.createElement("p");
  const deleteIcon = document.createElement("img");
  const deleteButton = document.createElement("button");
  container.id = "task";
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todo.isCompleted;
  container.appendChild(checkBox);
  taskContent.textContent = todo.task;
  taskCategory.textContent = todo.category;
  deleteIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTlhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWN0g2ek04IDloOHYxMEg4em03LjUtNWwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+PC9zdmc+";
  deleteButton.classList.add("deleteButton");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => {
    deleteToDo(todo.id);
    if (checkBox.checked) {
      removeChild(Done, container);
    } else {
      removeChild(todayList, container);
    }
  });
  if (todo.isCompleted) {
    taskContent.style.textDecoration = "line-through";
  }
  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      taskContent.style.textDecoration = "line-through";
      todo.isCompleted = true;
      todo.dateCompleted = new Date();
      removeChild(todayList, container);
      updateToDo(todo);
      addToCompleted(todo);
    } else {
      todo.isCompleted = false;
      removeChild(Done, container);
      updateToDo(todo);
      addToDo(todayList, container);
      taskContent.style.textDecoration = "none";
    }
  });
  taskGroup.appendChild(taskContent);
  taskGroup.appendChild(taskCategory);
  container.appendChild(taskGroup);
  container.appendChild(deleteButton);
  taskGroup.addEventListener("click", () => {
    loadEditor(todo);
  });
  return container;
};

const addToCompleted = (todo) => {
  const task = createTask(todo);
  addToDo(Done, task);
};

const removeChild = (listContainer, task) => {
  listContainer.removeChild(task);
};

const loadList = (Done, todayList) => {
  const todoList = showToDos();
  todoList.forEach((todo) => {
    if (todo.isCompleted) {
      Done.appendChild(createTask(todo));
    } else {
      todayList.appendChild(createTask(todo));
    }
  });
};

const addToDo = (container, task) => {
  container.appendChild(task);
};

const tasksContainer = (category) => {
  const taskContainer = document.createElement("div");
  const line = document.createElement("hr");
  const miscellaneous = document.createElement("div");
  const quickAdder = document.createElement("div");
  const input = document.createElement("input");
  const addButton = document.createElement("button");
  const buttonIcon = document.createElement("img");
  taskContainer.id = "tasksContainer";
  todayList.id = "todayList";
  Today.id = "today";
  Today.textContent = "Today";
  todayList.appendChild(Today);
  miscellaneous.id = "miscellaneous";
  Done.id = "done";
  Done.textContent = "Done";
  miscellaneous.appendChild(Done);
  quickAdder.id = "quickAdder";
  input.placeholder = "Add task";
  input.id = "addTask";
  addButton.id = "addButton";
  buttonIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIHRyYW5zZm9ybT0icm90YXRlKC05MCAxMiAxMikgdHJhbnNsYXRlKDI0IDApIHNjYWxlKC0xIDEpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjIwIiBzdHJva2UtZGFzaG9mZnNldD0iMjAiIGQ9Ik0yMSAxMkgzLjUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC4zcyIgdmFsdWVzPSIyMDswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjEyIiBzdHJva2UtZGFzaG9mZnNldD0iMTIiIGQ9Ik0zIDEyTDEwIDE5TTMgMTJMMTAgNSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuM3MiIGR1cj0iMC4ycyIgdmFsdWVzPSIxMjswIi8+PC9wYXRoPjwvZz48L2c+PC9zdmc+";
  loadList(Done, todayList);
  quickAdder.appendChild(input);
  addButton.appendChild(buttonIcon);
  quickAdder.appendChild(addButton);
  taskContainer.appendChild(todayList);
  taskContainer.appendChild(line);
  taskContainer.appendChild(miscellaneous);
  taskContainer.appendChild(quickAdder);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  function addTask() {
    if (input.value !== "") {
      const task = createToDo(
        showToDos().length + 1,
        input.value.toString(),
        false,
        category,
        new Date(),
        new Date(),
        ""
      );
      addToDo(todayList, createTask(task));
      input.value = "";
    }
  }
  addButton.addEventListener("click", () => {
    addTask();
  });
  return taskContainer;
};

export { tasksContainer };
