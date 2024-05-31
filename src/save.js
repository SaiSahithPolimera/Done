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

const save = (name, data) => {
  if (checkAvailability) {
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    alert("Sorry! We cannot store your tasks locally");
  }
};

const load = (name) => {
    let json = localStorage.getItem(name);
    let data = (JSON.parse(json));
    return data;
}

export { save, load };
