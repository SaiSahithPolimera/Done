import { format } from "date-fns";
import { updateToDo } from "./todo";

format(new Date(2014, 1, 11), "MM/dd/yyyy");
const Editor = document.createElement("div");
const taskEditor = () => {
  Editor.id = "taskEditor";
  return Editor;
};

const loadEditor = (todo) => {
  const title = document.createElement("input");
  const notes = document.createElement("textarea");
  const categoryChip = document.createElement("span");
  const notesContainer = document.createElement("div");
  notesContainer.id = "notesContainer";
  const notesHeading = document.createElement("h4");
  notesHeading.textContent = "Notes:";
  notesContainer.appendChild(notesHeading);
  notesContainer.appendChild(notes);
  categoryChip.id = "categoryChip";
  categoryChip.textContent = todo.category;
  notes.value = "fight";
  title.value = todo.task;
  notes.value = todo.notes;
  notes.addEventListener("keyup", () => {
    todo.notes = notes.value;
    updateToDo(todo);
  });
  title.addEventListener("keyup", () => {
    todo.task = title.value;
    updateToDo(todo);
  });
  title.id = "taskInput";
  title.style.fontWeight = "800";
  if (todo.isCompleted) {
    title.style.color = "rgba(128, 128, 128, 0.41)";
    Editor.style.color = "rgba(128, 128, 128, 0.41)"
    title.style.fontWeight = "500";
  }
  else {
    title.style.color = "";
    Editor.style.color = ""
    title.style.fontWeight = "";

  }
  const chipContainer = document.createElement("div");
  chipContainer.id = "chipContainer";
  chipContainer.appendChild(
    createChip(
      format(new Date(todo.dateCreated), "dd/MM/yyyy"),
      `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTggMnYyTTYgMnYybTUuMDUgMThjLTQuMDMgMC02LjA0NiAwLTcuMjk4LTEuMzU0QzIuNSAxOS4yOTMgMi41IDE3LjExNCAyLjUgMTIuNzU2di0uNTEzYzAtNC4zNTcgMC02LjUzNiAxLjI1Mi03Ljg5QzUuMDA0IDMgNy4wMiAzIDExLjA1IDNoMS45YzQuMDMgMCA2LjA0NiAwIDcuMjk4IDEuMzU0QzIxLjQ3NyA1LjY4MiAyMS41IDcuODA0IDIxLjUgMTJNMyA4aDE4bS04IDEwaDhtLTQtNHY4IiBjb2xvcj0iY3VycmVudENvbG9yIi8+PC9zdmc+`
    )
  );
  chipContainer.appendChild(
    createChip(
      format(new Date(todo.dateCompleted), "dd/MM/yyyy"),
      `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xIDAtMiAuOS0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGMxLjExIDAgMi0uODkgMi0yVjVhMiAyIDAgMCAwLTItMm0wIDE2SDVWOWgxNHpNNSA3VjVoMTR2MnptNS41NiAxMC40Nmw1Ljk0LTUuOTNsLTEuMDctMS4wNmwtNC44NyA0Ljg3bC0yLjExLTIuMTFsLTEuMDYgMS4wNnoiLz48L3N2Zz4=`
    )
  );
  const appendEditor = () => {
    Editor.appendChild(title);
    Editor.appendChild(chipContainer);
    Editor.appendChild(categoryChip);
    Editor.appendChild(notesContainer);
  }
  if (!Editor.hasChildNodes()) {
    appendEditor();
  }
  else {
    while(Editor.hasChildNodes()) {
      Editor.removeChild(Editor.firstChild);
    }
    appendEditor();
  }
  return Editor;
};

const createChip = (date, iconPath) => {
  const chip = document.createElement("div");
  chip.id = "dateChip";
  const icon = document.createElement("img");
  icon.src = iconPath;
  const span = document.createElement("span");
  span.textContent = date;
  chip.appendChild(icon);
  chip.appendChild(span);
  return chip;
};

export { taskEditor, loadEditor };