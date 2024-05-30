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
      path: `
      data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIgMy43NUMyIDIuNzg0IDIuNzg0IDIgMy43NSAyaDE2LjVjLjk2NiAwIDEuNzUuNzg0IDEuNzUgMS43NXYxNi41QTEuNzUgMS43NSAwIDAgMSAyMC4yNSAyMkg5Ljc1YS43NS43NSAwIDAgMSAwLTEuNWgxMC41YS4yNS4yNSAwIDAgMCAuMjUtLjI1VjloLTE3djNBLjc1Ljc1IDAgMCAxIDIgMTJaTTkgNy41aDExLjVWMy43NWEuMjUuMjUgMCAwIDAtLjI1LS4yNUg5Wm0tNS41IDBoNHYtNEgzLjc1YS4yNS4yNSAwIDAgMC0uMjUuMjVaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtOS4zMDggMTQuNWwtMi4xMDQtMi4yMzZhLjc1Ljc1IDAgMSAxIDEuMDkyLTEuMDI4bDMuMjk0IDMuNWEuNzUuNzUgMCAwIDEgMCAxLjAyOGwtMy4yOTQgMy41YS43NS43NSAwIDEgMS0xLjA5Mi0xLjAyOEw5LjMwOCAxNkg2LjA5YTIuNTkgMi41OSAwIDAgMC0yLjU5IDIuNTl2Mi42NmEuNzUuNzUgMCAwIDEtMS41IDB2LTIuNjZhNC4wOSA0LjA5IDAgMCAxIDQuMDktNC4wOXoiLz48L3N2Zz4=
      `,
    },
    {
      value: "Priorities",
      path: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgMTEuNDc1cTAgMS43NzUgMS4xODggMy4wNVQ4LjE1IDE1Ljk1bC0uODUtLjg1cS0uMjc1LS4yNzUtLjI3NS0uN3QuMjc1LS43dC43LS4yNzV0LjcuMjc1bDIuNiAyLjZxLjMuMy4zLjd0LS4zLjdsLTIuNiAyLjZxLS4yNzUuMjc1LS43LjI3NXQtLjctLjI3NXQtLjI3NS0uN3QuMjc1LS43bC45LS45cS0yLjYyNS0uMTUtNC40MTItMi4wMjVUMiAxMS41cTAtMi43MjUgMS44ODgtNC42MTJUOC41IDVIMTFxLjQyNSAwIC43MTMuMjg4VDEyIDZ0LS4yODguNzEzVDExIDdIOC41UTYuNjI1IDcgNS4zMTMgOC4zVDQgMTEuNDc1TTE1IDE2aDZxLjQyNSAwIC43MTMuMjg4VDIyIDE3dC0uMjg4LjcxM1QyMSAxOGgtNnEtLjQyNSAwLS43MTItLjI4OFQxNCAxN3QuMjg4LS43MTJUMTUgMTZtMC01LjVoNnEuNDI1IDAgLjcxMy4yODhUMjIgMTEuNXQtLjI4OC43MTNUMjEgMTIuNWgtNnEtLjQyNSAwLS43MTItLjI4OFQxNCAxMS41dC4yODgtLjcxMlQxNSAxMC41TTE1IDVoNnEuNDI1IDAgLjcxMy4yODhUMjIgNnQtLjI4OC43MTNUMjEgN2gtNnEtLjQyNSAwLS43MTItLjI4OFQxNCA2dC4yODgtLjcxMlQxNSA1Ii8+PC9zdmc+`,
    },
    {
      value: "Personal",
      path: `
      data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIyMCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTYgMTlWMThDNiAxNS43OTA5IDcuNzkwODYgMTQgMTAgMTRIMTRDMTYuMjA5MSAxNCAxOCAxNS43OTA5IDE4IDE4VjE5Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBkdXI9IjAuNHMiIHZhbHVlcz0iMjA7MCIvPjwvcGF0aD48cGF0aCBkPSJNMTIgMTFDMTAuMzQzMSAxMSA5IDkuNjU2ODUgOSA4QzkgNi4zNDMxNSAxMC4zNDMxIDUgMTIgNUMxMy42NTY5IDUgMTUgNi4zNDMxNSAxNSA4QzE1IDkuNjU2ODUgMTMuNjU2OSAxMSAxMiAxMVoiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjVzIiBkdXI9IjAuNHMiIHZhbHVlcz0iMjA7MCIvPjwvcGF0aD48L2c+PC9zdmc+      `,
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
    buttons.forEach((button) => (button.style.background = "none"));
  };

  Dashboard.appendChild(navbar);
  Dashboard.appendChild(itemsList);
  return Dashboard;
};

export { dashboard };
