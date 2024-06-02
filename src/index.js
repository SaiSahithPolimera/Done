import "./styles.css";
import { createToDo, deleteToDo, updateToDo, showToDos } from "./todo.js";
import { load, save } from "./save.js";
import { formatDistance, subDays, isToday } from "date-fns";
import { Personal } from "./Personal.js";
import { allTasks } from "./allTasks.js";
import { tasksContainer } from "./taskContainer.js";
import { taskEditor } from "./taskEditor.js";

const body = document.querySelector("body");
const container = document.createElement("div");
container.style.display = "grid";
container.id = "container";
const defaultSection = "Personal";
container.style.gridTemplateColumns = "1fr 5.5fr";
body.appendChild(container);
const Dashboard = document.createElement("div");
Dashboard.id = "dashboard";
const navbar = document.createElement("nav");
navbar.id = "navBar";
navbar.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M20 7H4"/><path d="M15 12H4" opacity="0.7"/><path d="M9 17H4" opacity="0.4"/></g></svg>`;
let options = load("dashBoardOptions");
// [
//   {
//       value: "New List",
//       path: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIxOCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDVWMTkiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjRzIiBkdXI9IjAuM3MiIHZhbHVlcz0iMTg7MCIvPjwvcGF0aD48cGF0aCBkPSJNNSAxMkgxOSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgZHVyPSIwLjNzIiB2YWx1ZXM9IjE4OzAiLz48L3BhdGg+PC9nPjwvc3ZnPg==",
//     },
//     {
//         value: "Personal",
//         path: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIyOCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTQgMjFWMjBDNCAxNi42ODYzIDYuNjg2MjkgMTQgMTAgMTRIMTRDMTcuMzEzNyAxNCAyMCAxNi42ODYzIDIwIDIwVjIxIj48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBkdXI9IjAuNHMiIHZhbHVlcz0iMjg7MCIvPjwvcGF0aD48cGF0aCBkPSJNMTIgMTFDOS43OTA4NiAxMSA4IDkuMjA5MTQgOCA3QzggNC43OTA4NiA5Ljc5MDg2IDMgMTIgM0MxNC4yMDkxIDMgMTYgNC43OTA4NiAxNiA3QzE2IDkuMjA5MTQgMTQuMjA5MSAxMSAxMiAxMVoiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjVzIiBkdXI9IjAuNHMiIHZhbHVlcz0iMjg7MCIvPjwvcGF0aD48L2c+PC9zdmc+",
//       },
//         {
//     value: "All tasks",
//     path: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48ZyBzdHJva2UtZGFzaGFycmF5PSIxMCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEwIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMS41Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBkdXI9IjAuMnMiIHZhbHVlcz0iMTA7MCIvPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0iZmlsbC1vcGFjaXR5IiBiZWdpbj0iMi4wcyIgZHVyPSIwLjVzIiB2YWx1ZXM9IjA7MSIvPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUiIGN5PSIxMiIgcj0iMS41Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBiZWdpbj0iMC43cyIgZHVyPSIwLjJzIiB2YWx1ZXM9IjEwOzAiLz48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgYmVnaW49IjIuMnMiIGR1cj0iMC41cyIgdmFsdWVzPSIwOzEiLz48L2NpcmNsZT48Y2lyY2xlIGN4PSI1IiBjeT0iMTkiIHI9IjEuNSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjEuNHMiIGR1cj0iMC4ycyIgdmFsdWVzPSIxMDswIi8+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiIGJlZ2luPSIyLjRzIiBkdXI9IjAuNXMiIHZhbHVlcz0iMDsxIi8+PC9jaXJjbGU+PC9nPjxnIHN0cm9rZS1kYXNoYXJyYXk9IjI4IiBzdHJva2UtZGFzaG9mZnNldD0iMjgiPjxyZWN0IHdpZHRoPSIxMSIgaGVpZ2h0PSIzIiB4PSI5LjUiIHk9IjMuNSIgcng9IjEuNSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuMXMiIGR1cj0iMC41cyIgdmFsdWVzPSIyODswIi8+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiIGJlZ2luPSIyLjBzIiBkdXI9IjAuNXMiIHZhbHVlcz0iMDsxIi8+PC9yZWN0PjxyZWN0IHdpZHRoPSIxMSIgaGVpZ2h0PSIzIiB4PSI5LjUiIHk9IjEwLjUiIHJ4PSIxLjUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjhzIiBkdXI9IjAuNXMiIHZhbHVlcz0iMjg7MCIvPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0iZmlsbC1vcGFjaXR5IiBiZWdpbj0iMi4ycyIgZHVyPSIwLjVzIiB2YWx1ZXM9IjA7MSIvPjwvcmVjdD48cmVjdCB3aWR0aD0iMTEiIGhlaWdodD0iMyIgeD0iOS41IiB5PSIxNy41IiByeD0iMS41Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBiZWdpbj0iMS41cyIgZHVyPSIwLjVzIiB2YWx1ZXM9IjI4OzAiLz48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgYmVnaW49IjIuNHMiIGR1cj0iMC41cyIgdmFsdWVzPSIwOzEiLz48L3JlY3Q+PC9nPjwvZz48L3N2Zz4=",
//   },
// ];
save("dashBoardOptions", options);
let currentChild;

let currentTab = "Personal";
const dialogBox = document.createElement("dialog");
dialogBox.id = "dialogBox";
const closeButton = document.createElement("button");
const PersonalTasks = Personal();
const AllTasks = allTasks();
closeButton.id = "closeButton";
const closeIcon = document.createElement("img");
closeIcon.src = `
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIxNiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTcgN0wxNyAxNyI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgZHVyPSIwLjRzIiB2YWx1ZXM9IjE2OzAiLz48L3BhdGg+PHBhdGggZD0iTTE3IDdMNyAxNyI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuNHMiIGR1cj0iMC40cyIgdmFsdWVzPSIxNjswIi8+PC9wYXRoPjwvZz48L3N2Zz4=
`;
closeButton.appendChild(closeIcon);
const form = document.createElement("form");
form.id = "newTaskForm";
const listName = document.createElement("input");
listName.id = "listName";
listName.ariaRequired;
listName.setAttribute("placeholder", "Enter task name");
const saveButton = document.createElement("button");
saveButton.textContent = "Save";
form.appendChild(listName);
form.appendChild(saveButton);
dialogBox.appendChild(closeButton);
dialogBox.appendChild(form);

const itemsList = document.createElement("ul");
const createListItem = (option, index) => {
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  let icon = document.createElement("img");
  const saveItem = () => {
    if (listName.value === "") {
      alert("This field cannot be empty!");
      return;
    } else {
      dialogBox.close();
      let option = {};
      option.value = listName.value;
      option.path = "user";
      dialogBox.style.display = "none";
      let newListItem = document.createElement("li");
      let child = Dashboard.lastChild;
      newListItem.textContent = option.value;
      if (option.path === "" || option.path === "user") {
        const deleteButton = document.createElement("img");
        deleteButton.src =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTlhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWN0g2ek04IDloOHYxMEg4em03LjUtNWwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+PC9zdmc+";
        newListItem.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
          alert("clicked");
          options.splice(index, 1);
          save("dashBoardOptions", options);
          child.removeChild(newListItem);
          options = load("dashBoardOptions");
        });
      }
      options.push(option);
      save("dashBoardOptions", options);
      options = load("dashBoardOptions");
      createList(itemsList);
    }
  };
  if (option.path !== "user") {
    icon.src = option.path;
    listItem.appendChild(icon);
  }
  button.classList.add("category");
  button.textContent = option.value;
  if (button.textContent === defaultSection) {
    listItem.style.background = "#e1e2ec";
  }
  container.appendChild(dialogBox);
  dialogBox.style.display = "none";
  listItem.addEventListener("click", () => {
    if (button.textContent === "Personal" && currentTab !== "Personal") {
      currentTab = "Personal";
      container.removeChild(currentChild);
      currentChild = container.appendChild(Personal());
      return;
    }
    if (button.textContent === "All tasks" && currentTab !== "All tasks") {
      currentTab = "All tasks";
      container.removeChild(currentChild);
      currentChild = container.appendChild(AllTasks);
      return;
    }
    if (button.textContent === "New List") {
      currentTab = "New List";
      dialogBox.style.display = "flex";
      listName.value = "";
      dialogBox.showModal();
      listName.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          saveItem();
        }
      });
      return;
    }
    if (
      currentTab !== button.textContent
    ) {
      container.removeChild(currentChild);
      const newContainer = document.createElement("div");
      newContainer.id = "newContainer";
      const heading = document.createElement("h2");
      heading.textContent = button.textContent;
      newContainer.appendChild(heading)
      newContainer.appendChild(tasksContainer(button.textContent));
      newContainer.appendChild(taskEditor());
      currentChild = container.appendChild(newContainer);
      currentTab = button.textContent;
    }
    closeButton.addEventListener("click", () => {
      dialogBox.close();
      dialogBox.style.display = "none";
    });
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveItem();
    });
  });

  listItem.appendChild(button);
  if (option.path === "" || option.path === "user") {
    const deleteButton = document.createElement("img");
    deleteButton.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTlhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWN0g2ek04IDloOHYxMEg4em03LjUtNWwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+PC9zdmc+";
    listItem.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      options.splice(index, 1);
      save("dashBoardOptions", options);
      itemsList.removeChild(listItem);
      options = load("dashBoardOptions");
    });
  }
  itemsList.appendChild(listItem);
  return itemsList;
};

const createList = (itemsList) => {
  while (itemsList.hasChildNodes()) {
    itemsList.removeChild(itemsList.lastChild);
  }
  options.forEach((option, index) => {
    Dashboard.appendChild(createListItem(option, index));
  });
};

Dashboard.appendChild(navbar);
createList(itemsList);
container.appendChild(Dashboard);
currentChild = container.appendChild(PersonalTasks);

const optionsList = itemsList.querySelectorAll("li");
optionsList.forEach((button) => {
  button.addEventListener("click", () => {
    resetColor(optionsList);
    button.style.background = "#e1e2ec";
  });
});

const resetColor = (buttons) => {
  buttons.forEach((button) => {
    button.style.background = "none";
  });
};
