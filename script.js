let form = document.getElementById("form");
let taskNameInput = document.getElementById("name-task-input");
let descriptionInput = document.getElementById("description-task-input");
let assignedToInput = document.getElementById("assigned-to-task-input");
let dueDateInput = document.getElementById("due-date-task-input");
let statusInput = document.getElementById("status-task-input");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


//  looks for event button press submit and runs the form validation function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// validation function for the form inputs and error messages for each input field if not valid and if valid it will add the task to the array and local storage and clear the form
let formValidation = () => {
  if (taskNameInput.value.length < 8) {
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

  if (descriptionInput.value.length < 15) {
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

  if (assignedToInput.value.length < 8) {
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
  if (dueDateInput.value < new Date().toISOString().split("T")[0]) {
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

  if (statusInput.value === "0") {
    document.getElementById("status-task-input").style.borderColor = "red";
    document.getElementById("status-task-error").innerHTML =
      "Please select a status";
    document.getElementById("status-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("status-task-input").classList.remove("is-invalid");
    document.getElementById("status-task-input").classList.add("is-valid");
    document.getElementById("status-task-input").style.borderColor = "green";
    document.getElementById("status-task-error").innerHTML = "";
  }


  if (
    taskNameInput.value.length > 7 &&
    descriptionInput.value.length > 14 &&
    assignedToInput.value.length > 7 &&
    dueDateInput.value > new Date().toISOString().split("T")[0] &&
    statusInput.value !== "0"
  ) {
    acceptData();
    clearForms();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};



let data = [{}];
// this makes object and pushes it to array and local storage
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
// this makes html card for each task

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div class=card ${x.color} id=${y}>
    <h5 class="card-header">Task name: ${x.text}</h5>
    <div class="card-body">
    <p class="card-text">Description: ${x.description} </p>
      <p class="card-text">Due Date: ${x.date}</p>
     
      <p class="card-text">Assigned to: ${x.assignee}</p>
      <p class="card-text">Status: ${x.status}</p>

      <span class="options">
      <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
      <i onclick="markAsDone(this)" class="fas fa-check"></i>
    </div>
  </div>
        </div>
    `);
  });

  resetForm();
};
// delete function on trash icon
// i want to make a confirm modal come up still working on
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

// eslint-disable-next-line no-unused-vars
// edit is a concept that I am still working on
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  taskNameInput.value = selectedTask.children[0].innerHTML;
  descriptionInput.value = selectedTask.children[2].innerHTML;
  assignedToInput.value = selectedTask.children[3].innerHTML;
  dueDateInput.value = selectedTask.children[1].innerHTML;
  statusInput.value = selectedTask.children[4].innerHTML;
  deleteTask(e);
};

// markdone function 
let markAsDone = (e) => {
  let id = e.parentElement.parentElement.parentElement.id;
  data[id].status = "Done";
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
  
  
 }

// reset form  function
let resetForm = () => {
  form.reset();
};
// render function parses data and renders it to the DOM
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();





// clears all the inputs
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
// close button for modal form clears the form
const close = document.querySelector("#btnClose");
close.addEventListener("click", function () {
  clearForms();
});
