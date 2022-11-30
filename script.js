import { taskMaster } from './data.js';
let form = document.querySelector("#form");

const tskmst = new taskMaster();



console.log(tskmst.tasklist);
tskmst.render();

//add new task 


function updateClock() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;
  setInterval(updateClock, 1000);

}

updateClock();







//  Input the data from form, Validate the data and store that data in object format in local storage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let taskName = document.getElementById("name-task-input").value;
  let taskDescription = document.getElementById("description-task-input").value;
  let taskAssignedTo = document.getElementById("assigned-to-task-input").value;
  let taskDueDate = document.getElementById("due-date-task-input").value;
  let taskStatus = document.getElementById("status-task-input").value;
  let task = {
    task: taskName,
    description: taskDescription,
    assignedTo: taskAssignedTo,
    dueDate: taskDueDate,
    status: taskStatus,
  };

  if (taskName.length < 8) {
    document.getElementById("name-task-input").focus
    document.getElementById("name-task-error").innerHTML =
      "Please enter a task name thats at least 8 characters long";
    document.getElementById("name-task-input").style.borderColor = "red";
    document.getElementById("name-task-input").placeholder = "";
    document.getElementById("name-task-input").classList.add("is-invalid");

  } else {
    document.getElementById("name-task-input").classList.remove("is-invalid");
    document.getElementById("name-task-input").classList.add("is-valid");
    document.getElementById("name-task-input").style.borderColor = "green";
    document.getElementById("name-task-error").innerHTML = "";
  }

  if (taskDescription.length < 15) {
    document.getElementById("description-task-error").innerHTML =
      "Please enter a description thats at least 15 characters long";
    document.getElementById("description-task-input").style.borderColor = "red";
    document.getElementById("description-task-input").placeholder = "";
    document
      .getElementById("description-task-input")
      .classList.add("is-invalid");

  } else {
    document
      .getElementById("description-task-input")
      .classList.remove("is-invalid");
    document.getElementById("description-task-input").classList.add("is-valid");
    document.getElementById("description-task-input").style.borderColor =
      "green";
    document.getElementById("description-task-error").innerHTML = "";
  }

  if (taskAssignedTo.length < 8) {
    document.getElementById("assigned-to-task-error").innerHTML =
      "Please enter a name thats at least 8 characters long";
    document.getElementById("assigned-to-task-input").style.borderColor = "red";
    document.getElementById("assigned-to-task-input").placeholder = "";
    document
      .getElementById("assigned-to-task-input")
      .classList.add("is-invalid");

  } else {
    document
      .getElementById("assigned-to-task-input")
      .classList.remove("is-invalid");
    document.getElementById("assigned-to-task-input").classList.add("is-valid");
    document.getElementById("assigned-to-task-input").style.borderColor =
      "green";
    document.getElementById("assigned-to-task-error").innerHTML = "";
  }
  if (taskDueDate < new Date().toISOString().split("T")[0]) {
    document.getElementById("due-date-task-input").style.borderColor = "red";
    document.getElementById("due-date-task-error").innerHTML =
      "Due date must be today or later";
    document.getElementById("due-date-task-input").placeholder = "";
    document.getElementById("due-date-task-input").classList.add("is-invalid");

  } else {
    document
      .getElementById("due-date-task-input")
      .classList.remove("is-invalid");
    document.getElementById("due-date-task-input").classList.add("is-valid");
    document.getElementById("due-date-task-input").style.borderColor = "green";
    document.getElementById("due-date-task-error").innerHTML = "";
  }

  if (taskStatus.length == "1") {

    document.getElementById("status-task-input").style.borderColor = "red";
    document.getElementById("status-task-error").innerHTML =
      "Please select a status";
    document.getElementById("status-task-input").classList.add("is-invalid");
    return false;
  } else {
    document.getElementById("status-task-input").classList.remove("is-invalid");
    document.getElementById("status-task-input").classList.add("is-valid");
    document.getElementById("status-task-input").style.borderColor = "green";
    document.getElementById("status-task-error").innerHTML = "";

  }

  if (
    taskName.length >= 8 &&
    taskDescription.length >= 15 &&
    taskAssignedTo.length >= 8 &&
    taskDueDate >= new Date().toISOString().split("T")[0] &&
    taskStatus.value != "0"
  ) {

    tskmst.addTask(task);
    tskmst.render();
    clearForms();
    location.reload();
    return true;
  }
});






function clearForms() {
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
  document.getElementById("name-task-input").classList.remove("is-invalid");
  document.getElementById("name-task-input").classList.remove("is-valid");
  document
    .getElementById("description-task-input")
    .classList.remove("is-invalid");
  document
    .getElementById("description-task-input")
    .classList.remove("is-valid");
  document
    .getElementById("assigned-to-task-input")
    .classList.remove("is-invalid");
  document
    .getElementById("assigned-to-task-input")
    .classList.remove("is-valid");
  document.getElementById("due-date-task-input").classList.remove("is-invalid");
  document.getElementById("due-date-task-input").classList.remove("is-valid");
  document.getElementById("status-task-input").classList.remove("is-invalid");
  document.getElementById("status-task-input").classList.remove("is-valid");
}

const reset = document.querySelector("#btnReset");
reset.addEventListener("click", function () {
  clearForms();
});
