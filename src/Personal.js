import { taskContainer } from "./taskContainer";
import { taskEditor } from "./taskEditor";
import {save, load} from './save';

const Personal = () => {
  const personal = document.createElement("div");
  personal.style.gridArea = "1/2";
  personal.id = "personal";
  const greetings = [
    "Have a fruitful day ahead 💐",
    "Make today amazing 💫",
    "You're doing great 😉",
    "Keep up the good work 🌱",
    "Believe in yourself 🧙🏻‍♂️",
    "You've got this 💪🏻",
    "Stay positive 👍🏻",
    "Keep moving forward 🎯",
    "You're capable of more than you know ⚡",
    "Don't forget to be awesome 😄",
  ];
  const getTimeOfDay = () => {
    let hour = new Date().getHours();
    if (hour >= 12) {
      hour = hour - 12;
      if (hour > 12 || hour < 3) {
        return "Afternoon";
      } else if (hour >= 3 && hour < 7) {
        return "Evening";
      } else if (hour >= 7 || hour == 12) {
        return "Night";
      }
    } else {
      if (hour >= 1 && hour < 12) {
        return "Morning";
      }
    }
  };

  const getCurrentTime = () => {
    let hour = new Date().getHours();
    let hours = hour > 12 ? hour - 12 : hour;
    hours = hours <= 9 ? "0" + hours : hours;
    let minutes = new Date().getMinutes();
    minutes = minutes <= 9 ? "0" + minutes : minutes;
    let meridian = hour > 12 ? "pm" : "am";
    return hours + "." + minutes + " " + meridian;
  };

  const createGreeting = () => {
    let userName;
    if (load("userName") === null || load("userName") === undefined || load("userName") === "") {  
      userName = prompt("Please enter your name to continue");
      if(userName.length >= 0) {
         save("userName", userName);
       }
    }
    userName = load("userName");
    const Greeting = "Good " + getTimeOfDay() + ", " + userName;
    const wish = greetings[Math.floor(Math.random() * 10)];
    const time = getCurrentTime();
    return { Greeting, wish, time };
  };
  const helloCard = document.createElement("div");
  helloCard.id = "helloCard";
  const greetingContainer = document.createElement("div");
  greetingContainer.id = "greetingContainer";
  const greetingCard = document.createElement("hgroup");
  const greetingHeading = document.createElement("h1");
  greetingHeading.style.fontWeight = 500;
  greetingHeading.textContent = createGreeting().Greeting;
  const subHeading = document.createElement("p");
  subHeading.style.fontWeight = "500";
  greetingCard.appendChild(greetingHeading);
  greetingCard.appendChild(subHeading);
  subHeading.textContent = createGreeting().wish;
  const timeContainer = document.createElement("h1");
  timeContainer.textContent = createGreeting().time;
  greetingContainer.appendChild(greetingCard);
  greetingContainer.appendChild(timeContainer);
  const imageContainer = document.createElement("div");
  imageContainer.id = "imageContainer";
  const image = document.createElement("img");
  image.src =
    "https://cdn.pixabay.com/photo/2022/07/30/08/01/notes-7353278_1280.png";
  image.alt = "An image illustrating office task management";
  imageContainer.appendChild(image);
  greetingContainer.appendChild(imageContainer);
  helloCard.appendChild(greetingContainer);
  helloCard.appendChild(imageContainer);
  personal.appendChild(helloCard);
  const mainContainer = document.createElement("main");
  mainContainer.id = "mainContainer";
  mainContainer.appendChild(taskContainer("Personal"));
  personal.appendChild(mainContainer);
  return personal;  
};

export { Personal };