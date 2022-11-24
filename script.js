function updateClock() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;
  setInterval(updateClock, 1000);
}

updateClock();

//  validateTaskForm function queries the DOM for the task form and validates the input

//  validateTaskForm function queries the DOM for the task form and validates the input
function validateTaskForm() {
  let taskname = document.getElementById("name-task-input");
  let description = document.getElementById("description-task-input");
  let assignedTo = document.getElementById("assigned-to-task-input");
  let dueDate = document.getElementById("due-date-task-input");
  let status = document.getElementById("status-task-input");
  let taskForm = document.getElementById("form");

  // check if the task name is at least 8 characters long switchstatement
  if (taskname.value.length < 8) {
    document.getElementById("name-task-input").style.borderColor = "red";
    document.getElementById("name-task-error").innerHTML =
      "Task name must be at least 8 characters long";
    document.getElementById("name-task-input").style.borderColor = "red";
    document.getElementById("name-task-input").placeholder = "";
  
  } else {

    document.getElementById("name-task-input").style.borderColor = "green";
    document.getElementById("name-task-error").innerHTML = "";
  }

  if (description.value.length < 15) {
    document.getElementById("description-task-input").style.borderColor = "red";
    document.getElementById("description-task-error").innerHTML =
      "Task description must be at least 15 characters long";
    document.getElementById("description-task-input").placeholder = "";
  } else {
    document.getElementById("description-task-input").style.borderColor =
      "green";
    document.getElementById("description-task-error").innerHTML = "";
  }

  if (assignedTo.value.length < 8) {
    document.getElementById("assigned-to-task-input").style.borderColor = "red";
    document.getElementById("assigned-to-task-error").innerHTML =
      "Assignee must be at least 8 characters long";
    document.getElementById("assigned-to-task-input").placeholder = "";
  } else {
    document.getElementById("assigned-to-task-error").innerHTML = "";
    document.getElementById("assigned-to-task-input").style.borderColor =
      "green";
  }
  if (dueDate.value < new Date().toISOString().split("T")[0]) {
    document.getElementById("due-date-task-input").style.borderColor = "red";
    document.getElementById("due-date-task-error").innerHTML =
      "Due date must be today or later";
    document.getElementById("due-date-task-input").placeholder = "";
  } else {
    document.getElementById("due-date-task-input").style.borderColor = "green";
    document.getElementById("due-date-task-error").innerHTML = "";
  }

  if (status.value === "0") {
    document.getElementById("status-task-input").style.borderColor = "red";
    document.getElementById("status-task-error").innerHTML =
      "Status must be selected";
    document.getElementById("status-task-input").placeholder = "";
  } else {
    document.getElementById("status-task-error").innerHTML = "";
    document.getElementById("status-task-input").style.borderColor = "green";
    document.getElementById("status-task-input").placeholder = "";
  }
  return true;
}

// reset button for input form
const reset = document.querySelector("#btnReset");
reset.addEventListener("click", function () {
  Clearforms();
});

// on button submit
const submit = document.querySelector("#btnSubmit");
submit.addEventListener("click", function () {
  validateTaskForm();
  if (validateTaskForm === true) {
    document.querySelector("#form").reset();
  
  }
});

// on button close 
const close = document.querySelector("#btnClose");
close.addEventListener("click", function () {
  Clearforms();
});


function Clearforms () {
  document.querySelector("#form").reset();
  document.getElementById("name-task-error").innerHTML = "";
  document.getElementById("name-task-input").placeholder = "Task name must be at least 8 characters long";
  document.getElementById("description-task-error").innerHTML = "";
  document.getElementById("description-task-input").placeholder = "Task description must be at least 15 characters long";
  document.getElementById("assigned-to-task-error").innerHTML = "";
  document.getElementById("assigned-to-task-input").placeholder = "Assignee must be at least 8 characters long";
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


//  validateTaskForm function queries the DOM for the task form and validates the input
