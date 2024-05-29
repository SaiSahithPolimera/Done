import { showToDos } from "./todo";

const checkAvailability = () => {
  let availability = false;
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (e.code === 22 ||
          e.code === 1014 ||
          e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        storage &&
        storage.length !== 0
      );
    }
  }

  if (storageAvailable("localStorage")) {
    availability = true;
  }
  return availability;
};

const saveToDo = () => {
  if (checkAvailability) {
    const todoList = showToDos();
    localStorage.setItem("toDoList", JSON.stringify(todoList));
  } else {
    alert("Sorry! We cannot store your tasks locally");
  }
};

const loadToDo = () => {
    let json = localStorage.getItem("toDoList");
    let toDoList = (JSON.parse(json));
    return toDoList;
}

export { saveToDo, loadToDo };
