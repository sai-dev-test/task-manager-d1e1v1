const API = "http://localhost:8000";

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.name;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: input.value })
  });

  input.value = "";
  loadTasks();
}

loadTasks();
