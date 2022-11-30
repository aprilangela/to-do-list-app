let acceptData = () => {
  data.push({
    text: taskNameInput.value,
    description: descriptionInput.value,
    assignee: assignedToInput.value,
    date: dueDateInput.value,
    status: statusInput.value,
  });
  // write to a json file

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

// this makes html card for each task renders it to the page

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
        <i onClick ="markDone(this)" class="fas fa-check"></i>
      </div>
    </div>
          </div>
      `);
  });

  resetForm();
};

// delete task function and removes from local storage
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
// edit task function
let editTask = (e) => {
  // modal title change to edit
  let id = e.parentElement.parentElement.parentElement.id;
  taskNameInput.value = data[id].text;
  descriptionInput.value = data[id].description;
  assignedToInput.value = data[id].assignee;
  dueDateInput.value = data[id].date;
  statusInput.value = data[id].status;
  // change modal title to edit task
  document.getElementById("Modal-label1").innerHTML = "Edit Task";
  // on add delete the task and add the new one
  add.onclick = () => {
    formValidation();
    deleteTask(e);
    acceptData();
    // close modal
    add.setAttribute("data-bs-dismiss", "modal");
  };
};

let markDone = (e) => {
  let id = e.parentElement.parentElement.parentElement.id;
  data[id].status = "Done";
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

export { createTasks, acceptData, deleteTask , editTask, markDone};