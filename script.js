let form = document.getElementById("form");
let taskNameInput = document.getElementById("name-task-input");
let descriptionInput = document.getElementById("description-task-input");
let assignedToInput = document.getElementById("assigned-to-task-input");
let dueDateInput = document.getElementById("due-date-task-input");
let statusInput = document.getElementById("status-task-input");

let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (taskNameInput.value.length < 8) {
    document.getElementById("name-task-error").innerHTML =
      "Please enter a task name thats at least 8 characters long";
    document.getElementById("name-task-input").style.borderColor = "red";
    document.getElementById("name-task-input").placeholder = "";
  }

  if (descriptionInput.value.length < 15) {
    document.getElementById("description-task-error").innerHTML =
      "Please enter a description thats at least 15 characters long";
    document.getElementById("description-task-input").style.borderColor = "red";
    document.getElementById("description-task-input").placeholder = "";
  }
  if (assignedToInput.value.length < 8) {
    document.getElementById("assigned-to-task-error").innerHTML =
      "Please enter a name thats at least 8 characters long";
    document.getElementById("assigned-to-task-input").style.borderColor = "red";
    document.getElementById("assigned-to-task-input").placeholder = "";
  }
  if (dueDateInput.value < new Date().toISOString().split("T")[0]) {
    document.getElementById("due-date-task-input").style.borderColor = "red";
    document.getElementById("due-date-task-error").innerHTML =
      "Due date must be today or later";
    document.getElementById("due-date-task-input").placeholder = "";
  }

  if (statusInput.value === "0") {
    document.getElementById("status-task-input").style.borderColor = "red";
    document.getElementById("status-task-error").innerHTML =
      "Please select a status";
  } else {
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: taskNameInput.value,
    description: descriptionInput.value,
    assignee: assignedToInput.value,
    date: dueDateInput.value,
    status: statusInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div class=card id=${y}>
    <h5 class="card-header">Task name: ${x.text}</h5>
    <div class="card-body">
    <p class="card-text">Description: ${x.description} </p>
      <p class="card-text">Due Date: ${x.date}</p>
     
      <p class="card-text">Assigned to: ${x.assignee}</p>
      <p class="card-text">Status: ${x.status}</p>

      <span class="options">
      <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
    </div>
  </div>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

// eslint-disable-next-line no-unused-vars
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  taskNameInput.value = selectedTask.children[0].innerHTML;
  descriptionInput.value = selectedTask.children[2].innerHTML;
  dueDateInput.value = selectedTask.children[1].innerHTML;
  assignedToInput.value = selectedTask.children[3].innerHTML;
  statusInput.value = selectedTask.children[4].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  form.reset();
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();

function updateClock() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;
  setInterval(updateClock, 1000);
}

updateClock();

function Clearforms() {
  document.querySelector("#form").reset();
  document.getElementById("name-task-error").innerHTML = "";
  document.getElementById("name-task-input").placeholder =
    "Task name must be at least 8 characters long";
  document.getElementById("description-task-error").innerHTML = "";
  document.getElementById("description-task-input").placeholder =
    "Task description must be at least 15 characters long";
  document.getElementById("assigned-to-task-error").innerHTML = "";
  document.getElementById("assigned-to-task-input").placeholder =
    "Assignee must be at least 8 characters long";
  document.getElementById("due-date-task-error").innerHTML = "";
  document.getElementById("status-task-error").innerHTML = "";
  document.getElementById("name-task-input").style.borderColor = "lightgrey";
  document.getElementById("description-task-input").style.borderColor =
    "lightgrey";
  document.getElementById("assigned-to-task-input").style.borderColor =
    "lightgrey";
  document.getElementById("due-date-task-input").style.borderColor =
    "lightgrey";
  document.getElementById("status-task-input").style.borderColor = "lightgrey";
}

const reset = document.querySelector("#btnReset");
reset.addEventListener("click", function () {
  Clearforms();
});

const close = document.querySelector("#btnClose");
close.addEventListener("click", function () {
  Clearforms();
});
