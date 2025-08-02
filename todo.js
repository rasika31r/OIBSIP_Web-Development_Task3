/* let taskId = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const timestamp = new Date().toLocaleString();
  const task = {
    id: taskId++,
    text: taskText,
    completed: false,
    createdAt: timestamp
  };

  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const list = task.completed ? document.getElementById("completedList") : document.getElementById("pendingList");

  const li = document.createElement("li");
  li.id = `task-${task.id}`;
  li.setAttribute("data-title", task.text.toLowerCase());

  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.text;

  const time = document.createElement("div");
  time.className = "task-time";
  time.textContent = task.createdAt;

  infoDiv.appendChild(title);
  infoDiv.appendChild(time);

  const badge = document.createElement("span");
  badge.className = `badge ${task.completed ? "completed" : "pending"}`;
  badge.textContent = task.completed ? "Completed" : "Pending";
  badge.onclick = () => toggleComplete(task.id);

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(task.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task.id);

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(infoDiv);
  li.appendChild(badge);
  li.appendChild(actions);

  list.appendChild(li);
}

function toggleComplete(id) {
  const li = document.getElementById(`task-${id}`);
  const text = li.querySelector(".task-title").textContent;
  const time = li.querySelector(".task-time").textContent;
  const isCompleted = li.parentElement.id === "completedList";

  li.remove();

  const task = {
    id,
    text,
    completed: !isCompleted,
    createdAt: time
  };

  renderTask(task);
}

function deleteTask(id) {
  const li = document.getElementById(`task-${id}`);
  li.remove();
}

function editTask(id) {
  const li = document.getElementById(`task-${id}`);
  const title = li.querySelector(".task-title");
  const currentText = title.textContent;

  const newText = prompt("Edit your task:", currentText);
  if (newText && newText.trim() !== "") {
    title.textContent = newText.trim();
    li.setAttribute("data-title", newText.trim().toLowerCase());
  }
}

function filterTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const allTasks = document.querySelectorAll("li");
  allTasks.forEach(task => {
    const title = task.getAttribute("data-title");
    task.style.display = title.includes(search) ? "flex" : "none";
  });
} */



  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    status: "pending",
    timestamp: new Date().toLocaleString()
  });

  saveTasks();
  renderTasks();
  input.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleStatus(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      t.status = t.status === "pending" ? "completed" : "pending";
    }
    return t;
  });
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edit your task:", tasks.find(t => t.id === id).text);
  if (newText === null) return;
  tasks = tasks.map(t => {
    if (t.id === id) t.text = newText.trim() || t.text;
    return t;
  });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const pendingDiv = document.getElementById("pendingTasks");
  const completedDiv = document.getElementById("completedTasks");
  pendingDiv.innerHTML = "";
  completedDiv.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
      <label>
        <input type="checkbox" ${task.status === "completed" ? "checked" : ""} onchange="toggleStatus(${task.id})">
        <strong>${task.text}</strong>
      </label>
      <p class="timestamp">${task.timestamp}</p>
      <div class="task-buttons">
        <button class="btn btn-edit" onclick="editTask(${task.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    const container = task.status === "pending" ? pendingDiv : completedDiv;
    container.appendChild(div);
  });
}

// initialize
renderTasks();