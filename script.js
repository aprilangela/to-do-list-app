import { taskMaster } from "./data.js";
let form = document.querySelector("#form");

const tskmst = new taskMaster();

console.log(tskmst.tasklist);
tskmst.render();
'use strict'
//add new task

function updateClock() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;
  setTimeout(updateClock, 1000);
}

updateClock();

//  Input the data from form, Validate the data and store that data in object format in local storage
form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  let  taskNameInput = document.getElementById("name-task-input").value;
  let taskDescriptionInput = document.getElementById("description-task-input").value;
  let taskAssigneeInput = document.getElementById("assigned-to-task-input").value;
  let taskDateInput = document.getElementById("due-date-task-input").value;
  let TaskStatusInput = document.getElementById("status-task-input").value;
  let taskNameError = document.getElementById("name-task-error");
  let taskDescriptionError = document.getElementById("description-task-error");
  let taskAssigneeError = document.getElementById("assigned-to-task-error");
  let taskDateError = document.getElementById("due-date-task-error");
  let taskStatusError = document.getElementById("status-task-error");


  let task = {
    task: taskNameInput,
    description: taskDescriptionInput,
    assignedTo: taskAssigneeInput,
    dueDate: taskDateInput,
    status: TaskStatusInput,
  };

  if (taskNameInput.length < 8) {
    taskNameError.innerHTML = "Task name must be at least 8 characters";
    taskNameInput.style.borderColor = "red";  // doesn't work change document.getElementById("name-task-input").style.borderColor = "red"; does work
    taskNameInput.classList.add("is-invalid"); // doesn't work change document.getElementById("name-task-input").classList.add("is-invalid"); does work
    taskNameInput.classList.remove("is-valid"); // doesn't work change document.getElementById("name-task-input").classList.remove("is-valid"); does work

  } else {
    taskNameError.innerHTML = "";
    taskNameInput.style.borderColor = "green";
    taskNameInput.classList.add("is-valid");
    taskNameInput.classList.remove("is-invalid");

  }

    tskmst.addTask(task);
    tskmst.render();
    clearForms();
    location.reload();
    return true;
  }
);


function clearForms() {
  document.querySelector("#form").reset();
}

const reset = document.querySelector("#btnReset");
reset.addEventListener("click", function () {
  clearForms();
});
