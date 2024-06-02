import { isBefore } from "date-fns";
import { createToDo, showToDos, deleteToDo, updateToDo } from "./todo.js";
import { loadEditor } from "./taskEditor.js";

const createTask = (todo, container) => {
  const task = document.createElement("div");
  task.id = "task";
  const checkBox = document.createElement("input");
  const taskGroup = document.createElement("div");
  checkBox.setAttribute("type", "checkbox");
  let taskName = document.createElement("p")
  const taskCategory = document.createElement("p");
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  const deleteIcon = document.createElement("img");
  deleteIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTlhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWN0g2ek04IDloOHYxMEg4em03LjUtNWwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+PC9zdmc+";
  taskName.textContent = todo.task;
  taskCategory.textContent = todo.category;
  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      taskName.style.textDecoration = "line-through";
      todo.isCompleted = true;
      updateToDo(todo);
    } else {
        taskName.style.textDecoration = "none";
        todo.isCompleted = false;
    }
  });
  task.appendChild(checkBox);
  taskGroup.appendChild(taskName);
  taskGroup.appendChild(taskCategory);
  deleteButton.appendChild(deleteIcon);
  task.appendChild(taskGroup);
  task.appendChild(deleteButton);
  taskGroup.addEventListener("click", () => {
      const dialogBox = document.createElement("dialog");
      const closeButton = document.createElement("img");
      closeButton.addEventListener("click", () => {
          dialogBox.close();
          container.removeChild(dialogBox);
    });
    dialogBox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        dialogBox.close();
        container.removeChild(dialogBox);
        taskName.textContent = todo.task;
      }
    });
    dialogBox.id = "todoEditor";
    closeButton.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIxNiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTcgN0wxNyAxNyI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgZHVyPSIwLjRzIiB2YWx1ZXM9IjE2OzAiLz48L3BhdGg+PHBhdGggZD0iTTE3IDdMNyAxNyI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuNHMiIGR1cj0iMC40cyIgdmFsdWVzPSIxNjswIi8+PC9wYXRoPjwvZz48L3N2Zz4=";
    dialogBox.appendChild(closeButton);
    dialogBox.appendChild(loadEditor(todo));
    container.appendChild(dialogBox);
    dialogBox.showModal();
});
deleteButton.addEventListener("click", () => {
  deleteToDo(todo.id);
  container.removeChild(task);
});
return task;
};

const taskContainer = (containerCategory) => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    const todoList = showToDos().filter(
        (todo) => todo.category === containerCategory
  );
  const taskContainer = document.createElement("div");
  taskContainer.id = "taskContainer";
  const inputContainer = document.createElement("div");
  const addButton = document.createElement("button");
  const addIcon = document.createElement("img");
  addIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIHRyYW5zZm9ybT0icm90YXRlKC05MCAxMiAxMikgdHJhbnNsYXRlKDI0IDApIHNjYWxlKC0xIDEpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjIwIiBzdHJva2UtZGFzaG9mZnNldD0iMjAiIGQ9Ik0yMSAxMkgzLjUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC4zcyIgdmFsdWVzPSIyMDswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjEyIiBzdHJva2UtZGFzaG9mZnNldD0iMTIiIGQ9Ik0zIDEyTDEwIDE5TTMgMTJMMTAgNSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuM3MiIGR1cj0iMC4ycyIgdmFsdWVzPSIxMjswIi8+PC9wYXRoPjwvZz48L2c+PC9zdmc+";
  const inputBox = document.createElement("input");
  addIcon.id = "addIcon";
  addButton.id = "addButton";
  inputContainer.id = "inputContainer";
  inputBox.placeholder = "Add task";
  inputBox.id = "addInput";
  todoList.forEach((todo) => {
    taskContainer.appendChild(createTask(todo, taskContainer));
  });
  inputContainer.appendChild(inputBox);
  addButton.appendChild(addIcon);
  inputContainer.appendChild(addButton);
  mainContainer.appendChild(taskContainer);
  mainContainer.appendChild(inputContainer);
  const addToDo = () => {
    const todo = createToDo(
      showToDos().length + 1,
      inputBox.value,
      false,
      containerCategory,
      new Date(),
      new Date(),
      ""
    );
    console.log(todo);
    return todo;
  };
  addButton.addEventListener("click", () => {
    taskContainer.appendChild(createTask(addToDo()));
    inputBox.value = "";
  });

  inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      taskContainer.appendChild(createTask(addToDo()));
      inputBox.value = "";
    }
  });
  return mainContainer;
};

export { taskContainer };
