// update users time and date on the page
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
  switch (true) {
    case taskname.value.length < 8:
      document.getElementById("name-task-input").style.borderColor = "red";
      document.getElementById("name-task-error").innerHTML = "Task name must be at least 8 characters long";
      alert("Task name must be at least 8 characters long");
      break;
    case description.value.length < 15:
      document.getElementById("description-task-input").style.borderColor = "red";
      document.getElementById("description-task-error").innerHTML = "Task description must be at least 15 characters long";
      alert("Description must be at least 15 characters long");
      break;
    case assignedTo.value.length < 8:
      document.getElementById("assigned-to-task-input").style.borderColor = "red";
      alert("Assigned to must be at least 8 characters long");
      break;
// due date validation cant be the day before today
    case dueDate.value < new Date().toISOString().split("T")[0]:
      document.getElementById("due-date-task-input").style.borderColor = "red";
      alert("Due date must be today or later");
      break;
      // cant be default selector or empty
    case status.value == "0" || status.value == "":
    case status.value == "Please choose one":
      document.getElementById("status-task-input").style.borderColor = "red";
      alert("Please choose a status");
    default:
      document.getElementById("description-task-error").innerHTML = "";
      document.getElementById("name-task-error").innerHTML = "";
      document.getElementById("assigned-to-task-error").innerHTML = "";
      document.getElementById("due-date-task-error").innerHTML = "";
      document.getElementById("status-task-error").innerHTML = "";
      taskForm.submit();
  }
}

  
  // reset button for input form
  const reset = document.querySelector("#btnReset");
  reset.addEventListener("click", function () {
    document.querySelector("#form").reset();
  });

  // on button submit 
  const submit = document.querySelector("#btnSubmit");
  submit.addEventListener("click", function () {
    if (validateTaskForm()) {
      let task = new Task(taskname.value, description.value, assignedTo.value, dueDate.value, status.value);
      taskList.addTask(task);
      taskList.render();
      document.querySelector("#form").reset();
    }
  });