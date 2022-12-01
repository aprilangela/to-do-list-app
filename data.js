export class taskMaster {
    'use strict'
// the object that stores the data and has methods to manipulate the data
  constructor() {
    this.tasklist = [];
    this.load();
  }

  // this makes the html card 
  createHtmlCard(task) {
    //create a card
    document.getElementById("task_list").innerHTML += `

    <div  class="card text-white bg-primary">
      <div class="card-body">
      
         
        <h5 class="card-header">Task name: ${task.task}</h5>
        <div class="card-body">
        <p class="card-text">Description: ${task.description}</p>
          <p class="card-text">due date: ${task.dueDate}</p>
          <p class="card-text">Assigned to: ${task.assignedTo}</p> 
          <p class="card-text">Status: ${task.status}</p>

          <div class="options">  
          <i onclick="taskMaster.editTask(${task.id})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onclick="deleteTask(this)" class="fas fa-trash-alt"></i>

          </div>
        </div>
      </div>
            </div>

    `;
  }



// this renders the html card 
  render() {
    this.tasklist.forEach(task => this.createHtmlCard(task));
  }
// this passes the data from valdate/ input forms to the task object

 alertUser() {
    alert("Alert");
    }
  addTask(task) {
    this.tasklist.push(task);
    this.save();
  }
  // this saves the data to local storage
  save() {
    localStorage.setItem("tasklist", JSON.stringify(this.tasklist));
  }
// this loads the data from local storage

  load() {
    this.tasklist = JSON.parse(localStorage.getItem("tasklist"));
    if (this.tasklist == null) {
      this.tasklist = [];
    }
  }
  getAllTasks() {
    return this.tasklist;

  }
  getTasksWithStatus(status) {
    this.tasklist.filter(task => task.status === status);

    if (status == "Done") {
      document.getElementById("(${task.id}icon").style.display = "none";
    }
  }

    deleteTask(task) {
    this.tasklist.splice(this.tasklist.indexOf(task),1);
    this.save();
    this.render();

}
}


