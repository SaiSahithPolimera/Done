const dashboard = () => {
  const Dashboard = document.createElement("div");
  Dashboard.id = "dashboard";
  const itemsList = document.createElement("ul");
  const navbar = document.createElement("nav");
  navbar.id = "navBar";
  navbar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M20 7H4"/><path d="M15 12H4" opacity="0.7"/><path d="M9 17H4" opacity="0.4"/></g></svg>`;
  const options = [
    {
      value: "Project",
      path: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik05IDE1djhIMXYtOHptMTQgMHY4aC04di04ek05IDF2OEgxVjF6bTE0IDB2OGgtOFYxeiIvPjwvc3ZnPg==`,
    },
    {
      value: "Priorities",
      path: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgMTEuNDc1cTAgMS43NzUgMS4xODggMy4wNVQ4LjE1IDE1Ljk1bC0uODUtLjg1cS0uMjc1LS4yNzUtLjI3NS0uN3QuMjc1LS43dC43LS4yNzV0LjcuMjc1bDIuNiAyLjZxLjMuMy4zLjd0LS4zLjdsLTIuNiAyLjZxLS4yNzUuMjc1LS43LjI3NXQtLjctLjI3NXQtLjI3NS0uN3QuMjc1LS43bC45LS45cS0yLjYyNS0uMTUtNC40MTItMi4wMjVUMiAxMS41cTAtMi43MjUgMS44ODgtNC42MTJUOC41IDVIMTFxLjQyNSAwIC43MTMuMjg4VDEyIDZ0LS4yODguNzEzVDExIDdIOC41UTYuNjI1IDcgNS4zMTMgOC4zVDQgMTEuNDc1TTE1IDE2aDZxLjQyNSAwIC43MTMuMjg4VDIyIDE3dC0uMjg4LjcxM1QyMSAxOGgtNnEtLjQyNSAwLS43MTItLjI4OFQxNCAxN3QuMjg4LS43MTJUMTUgMTZtMC01LjVoNnEuNDI1IDAgLjcxMy4yODhUMjIgMTEuNXQtLjI4OC43MTNUMjEgMTIuNWgtNnEtLjQyNSAwLS43MTItLjI4OFQxNCAxMS41dC4yODgtLjcxMlQxNSAxMC41TTE1IDVoNnEuNDI1IDAgLjcxMy4yODhUMjIgNnQtLjI4OC43MTNUMjEgN2gtNnEtLjQyNSAwLS43MTItLjI4OFQxNCA2dC4yODgtLjcxMlQxNSA1Ii8+PC9zdmc+`,
    },
    {
      value: "Inbox",
      path: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTQzIDEuMjVoLjExNGMyLjMwOSAwIDQuMTE4IDAgNS41My4xOWMxLjQ0NC4xOTQgMi41ODQuNiAzLjQ3OSAxLjQ5NGMuODk1Ljg5NSAxLjMgMi4wMzUgMS40OTQgMy40OGMuMTkgMS40MTEuMTkgMy4yMi4xOSA1LjUyOXYxLjAzYS44LjggMCAwIDEgMCAuMDU3Yy0uMDA0IDEuODUyLS4wMjcgMy4zNS0uMTkgNC41NTZjLS4xOTQgMS40NDUtLjYgMi41ODUtMS40OTQgMy40OGMtLjg5NS44OTUtMi4wMzUgMS4zLTMuNDggMS40OTRjLTEuNDExLjE5LTMuMjIuMTktNS41MjkuMTloLS4xMTRjLTIuMzA5IDAtNC4xMTggMC01LjUzLS4xOWMtMS40NDQtLjE5NC0yLjU4NC0uNi0zLjQ3OS0xLjQ5NGMtLjg5NS0uODk1LTEuMy0yLjAzNS0xLjQ5NC0zLjQ4Yy0uMTYzLTEuMjA3LS4xODYtMi43MDQtLjE5LTQuNTU2YS43Ni43NiAwIDAgMSAwLS4wNTd2LTEuMDNjMC0yLjMwOSAwLTQuMTE4LjE5LTUuNTNjLjE5NC0xLjQ0NC42LTIuNTg0IDEuNDk0LTMuNDc5Yy44OTUtLjg5NSAyLjAzNS0xLjMgMy40OC0xLjQ5NGMxLjQxMS0uMTkgMy4yMi0uMTkgNS41MjktLjE5bS05LjE5IDEyLjVjLjAxIDEuNTAzLjA0NSAyLjY4LjE3MyAzLjYzNmMuMTcyIDEuMjc5LjUgMi4wNSAxLjA2OSAyLjYyYy41Ny41NjkgMS4zNC44OTYgMi42MTkgMS4wNjhjMS4zLjE3NCAzLjAwOC4xNzYgNS4zODYuMTc2czQuMDg2LS4wMDIgNS4zODYtLjE3NmMxLjI3OS0uMTcyIDIuMDUtLjUgMi42Mi0xLjA2OWMuNTY5LS41Ny44OTYtMS4zNCAxLjA2OC0yLjYxOWMuMTI4LS45NTYuMTYzLTIuMTMzLjE3Mi0zLjYzNkgxOC44NGMtLjk3NCAwLTEuMjI5LjAxNi0xLjQ0Mi4xMTRjLS4yMTQuMDk5LS4zOTIuMjgyLTEuMDI2IDEuMDJsLS42MDUuNzA3bC0uMDg4LjEwMmMtLjUwMi41ODctLjkgMS4wNTItMS40NSAxLjMwNWMtLjU1LjI1My0xLjE2Mi4yNTMtMS45MzQuMjUyaC0uNTg5Yy0uNzczIDAtMS4zODUuMDAyLTEuOTM1LS4yNTJjLS41NS0uMjUzLS45NDgtLjcxOC0xLjQ1LTEuMzA1Yy0uMDMtLjAzMy0uMDU4LS4wNjctLjA4OC0uMTAybC0uNjA1LS43MDZjLS42MzQtLjc0LS44MTItLjkyMi0xLjAyNi0xLjAyYy0uMjEzLS4wOTktLjQ2OC0uMTE1LTEuNDQyLS4xMTV6bTE4LjQ5Ny0xLjVoLTIuNTQ0Yy0uNzczIDAtMS4zODUtLjAwMi0xLjkzNS4yNTJjLS41NS4yNTMtLjk0OC43MTgtMS40NSAxLjMwNWMtLjAzLjAzMy0uMDU4LjA2Ny0uMDg4LjEwMmwtLjYwNS43MDZjLS42MzQuNzQtLjgxMi45MjItMS4wMjYgMS4wMmMtLjIxMy4wOTktLjQ2OC4xMTUtMS40NDIuMTE1aC0uMzJjLS45NzQgMC0xLjIyOS0uMDE2LTEuNDQyLS4xMTRjLS4yMTQtLjA5OS0uMzkyLS4yODItMS4wMjYtMS4wMmwtLjYwNS0uNzA3bC0uMDg4LS4xMDJjLS41MDItLjU4Ny0uOS0xLjA1Mi0xLjQ1LTEuMzA1Yy0uNTUtLjI1NC0xLjE2Mi0uMjUzLTEuOTM0LS4yNTJIMi43NVYxMmMwLTIuMzc4LjAwMi00LjA4Ni4xNzYtNS4zODZjLjE3Mi0xLjI3OS41LTIuMDUgMS4wNjktMi42MmMuNTctLjU2OSAxLjM0LS44OTYgMi42MTktMS4wNjhjMS4zLS4xNzQgMy4wMDgtLjE3NiA1LjM4Ni0uMTc2czQuMDg2LjAwMiA1LjM4Ni4xNzZjMS4yNzkuMTcyIDIuMDUuNSAyLjYyIDEuMDY5Yy41NjkuNTcuODk2IDEuMzQgMS4wNjggMi42MTljLjE3NCAxLjMuMTc2IDMuMDA4LjE3NiA1LjM4NnoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==`,
    },
    {
      value: "Archive",
      path: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0zLjUgNy41aDE0djcuOTk4YTIgMiAwIDAgMS0yIDJoLTEwYTIgMiAwIDAgMS0yLTJ6bTAtMy45NzhoMTRhMSAxIDAgMCAxIDEgMVY2LjVhMSAxIDAgMCAxLTEgMWgtMTRhMSAxIDAgMCAxLTEtMVY0LjUyMmExIDEgMCAwIDEgMS0xbTUgNi45NzhoNCIvPjwvc3ZnPg==`,
    },
  ];
  options.forEach((option) => {
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    let icon = document.createElement("img");
    icon.src = option.path;
    listItem.appendChild(icon);
    button.classList.add("category");
    button.textContent = option.value;
    listItem.appendChild(button);
    itemsList.appendChild(listItem);
  });

  const optionsList = itemsList.querySelectorAll("li");
  optionsList.forEach((button) => {
    button.addEventListener("click", () => {
        resetColor(optionsList);
        button.style.background = "#e1e2ec";
    });
  });

  const resetColor = (buttons) => {
    buttons.forEach(button => button.style.background = "none");
  }

  Dashboard.appendChild(navbar);
  Dashboard.appendChild(itemsList);
  return Dashboard;
};

export { dashboard };
