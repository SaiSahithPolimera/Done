import { showToDos, createToDo, deleteToDo, updateToDo } from "./todo";
import { loadEditor } from "./taskEditor";

const todayList = document.createElement("div");
const Done = document.createElement("h3");
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
      todo.dueDate = new Date();
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

const tasksContainer = () => {
  const taskContainer = document.createElement("div");
  const line = document.createElement("hr");
  const header = document.createElement("header");
  const todayHeading = document.createElement("h3");
  const miscellaneous = document.createElement("div");
  const quickAdder = document.createElement("div");
  const input = document.createElement("input");
  const addButton = document.createElement("button");
  const buttonIcon = document.createElement("img");
  taskContainer.id = "tasksContainer";
  todayList.id = "todayList";
  header.appendChild(todayHeading);
  todayHeading.textContent = "Today";
  todayList.appendChild(header);
  miscellaneous.id = "miscellaneous";
  Done.id = "done";
  Done.textContent = "Done";
  miscellaneous.appendChild(Done);
  quickAdder.id = "quickAdder";
  input.placeholder = "Add task";
  input.id = "addTask";
  addButton.id = "addButton";
  buttonIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExLjI1IDIwYS43NS43NSAwIDAgMCAxLjUgMHptMS41IDBWNGgtMS41djE2eiIgb3BhY2l0eT0iMC41Ii8+PHBhdGggc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Im0xOCAxMGwtNi02bC02IDYiLz48L2c+PC9zdmc+";
  loadList(Done, todayList);
  quickAdder.appendChild(input);
  addButton.appendChild(buttonIcon);
  quickAdder.appendChild(addButton);
  taskContainer.appendChild(todayList);
  taskContainer.appendChild(line);
  taskContainer.appendChild(miscellaneous);
  taskContainer.appendChild(quickAdder);
  input.addEventListener("keypress", () => {
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
        "Personal",
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
