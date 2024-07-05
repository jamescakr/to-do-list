let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let underLine = document.getElementById("under-line");
let mode = "all";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskInput.addEventListener("focus", () => (taskInput.value = ""));

function addTask() {
  let taskContent = taskInput.value.trim();

  if (taskContent === "") {
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();

  taskInput.value = "";
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-done-bg">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjlPHXXPWAGMtZWtEC4Rn6GONLAJSg3uEDQ&s" alt="Undo" style="width: 20px; height: 20px;" /> 
                        </button>
                        <button onclick="deleteTask('${list[i].id}')">
                        <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete" style="width: 20px; height: 20px;" />
                        </button>
                    </div>
                </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
          <button onclick="toggleComplete('${list[i].id}')">
          <img src="https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png" alt="Check" style="width: 20px; height: 20px;" /> 
          </button>
          <button onclick="deleteTask('${list[i].id}')">
          <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete" style="width: 20px; height: 20px;" /> 
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
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;

  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";

  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).slice(2, 11);
}
