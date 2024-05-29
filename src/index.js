import './styles.css';
import {createToDo, deleteToDo, updateToDo, showToDos} from './todo.js'
import { saveToDo } from './saveToDo.js';
import { dashboard } from './dashboard.js';
import { formatDistance, subDays, isToday } from "date-fns";
import { home } from './home.js';

console.log(showToDos()[0].dueDate);
const body = document.querySelector("body");
console.log(isToday(("29-05-2024")));
const container = document.createElement("div");
container.style.display = "grid";
container.id = "container";
container.style.gridTemplateColumns = "1fr 4fr";
container.style.borderLeft = "2px solid white";
body.appendChild(container);
const Dashboard = dashboard();
const Home = home();
container.appendChild(Dashboard);
container.appendChild(Home);


