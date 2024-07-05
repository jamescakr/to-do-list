let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", () => (taskInput.value = ""));

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete) {
      resultHTML += `<div class="task task-done-bg">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjlPHXXPWAGMtZWtEC4Rn6GONLAJSg3uEDQ&s */
" alt="Undo" style="width: 20px; height: 20px;" /> 
                        </button>
                        <button onclick="deleteTask('${taskList[i].id}')">
                        <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png
" alt="Delete" style="width: 20px; height: 20px;" />
                        </button>
                    </div>
                </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div>
          <button onclick="toggleComplete('${taskList[i].id}')">
          <img src="https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png
" alt="Check" style="width: 20px; height: 20px;" /> 
          </button>
          <button onclick="deleteTask('${taskList[i].id}')">
          <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png
" alt="Delete" style="width: 20px; height: 20px;" /> 
          </button>
      </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).slice(2, 11);
}
