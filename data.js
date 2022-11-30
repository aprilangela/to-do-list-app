export class taskMaster {

  //define object structure ID = int , task = string, status = string  DueDate date it is due  AssignedTo  description 
  //define a task 
  constructor() {
    this.tasklist = [];
    this.load();
  }

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
          <i onclick="deleteTask(${task.id})" class="fas fa-trash-alt"></i>
          <i onClick ="alertUser();" class="fas fa-check"></i>

          </div>
        </div>
      </div>
            </div>

    `;
  }

  render() {
    this.tasklist.forEach(task => this.createHtmlCard(task));
  }

  addTask(task) {
    this.tasklist.push(task);
    this.save();
  }
  save() {
    localStorage.setItem("tasklist", JSON.stringify(this.tasklist));
  }

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

  updateTask(taskId) {
    let task = this.tasklist.find(task => task.id === taskId);
    task.status = "Done";
    this.save();
    location.reload();

  }




  alertUser() {
    alert("Task has been added");
  }


  editTask(taskId) {
    let task = this.tasklist.find(task => task.id === taskId);
    document.getElementById("name-task-input").value = task.task;
    document.getElementById("description-task-input").value = task.description;
    document.getElementById("assigned-to-task-input").value = task.assignedTo;
    document.getElementById("due-date-task-input").value = task.dueDate;
    document.getElementById("status-task-input").value = task.status;
    document.getElementById("id-task-input").value = task.id;
    document.getElementById("Modal-label1").innerHTML = "Edit Task";
    document.getElementById("submit").innerHTML = "Edit Task";
    document.getElementById("submit").onclick = function () { taskMaster.updateTask(taskId) };
  }

}
