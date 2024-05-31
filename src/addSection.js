import { tasksContainer } from "./taskContainer";
import { taskEditor } from "./taskEditor";

const addSection = (name) => {
    const section = document.createElement("div");
    section.id = "userSection";
    const heading = document.createElement("h2");
    heading.textContent = name;
    const taskManager = document.createElement("div");
    taskManager.id = "taskManager";
    section.appendChild(heading);
    if(name === "Personal"){taskManager.appendChild(tasksContainer(name));
    taskManager.appendChild(taskEditor());}
    section.appendChild(taskManager);
    return section;
}

export {addSection};