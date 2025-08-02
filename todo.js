
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
