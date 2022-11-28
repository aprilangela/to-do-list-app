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
// write to a json file


  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};
