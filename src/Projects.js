
import { addSection } from "./addSection";

const Projects = () =>{
    const projectContainer = document.createElement("div");
    projectContainer.id = "projects";
    const heading = document.createElement("h2");
    projectContainer.appendChild(heading);
    const taskManager = addSection(heading.textContent);
    projectContainer.appendChild(taskManager);
    return projectContainer;
}

export {Projects};