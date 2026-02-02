const taskInput = document.querySelector('input[placeholder^="เพิ่มงานใหม่"]');
const prioritySelect = document.querySelector("select");
const addBtn = document.querySelector(".btn-penguin");
const taskList = document.querySelector(".task-list");
const searchInput = document.querySelector('input[placeholder^="ค้นหา"]');
const filterBtns = document.querySelectorAll(".filter-group .btn");
const counterBadge = document.querySelector(".col-md-5 span");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "All";

/* ---------- Utils ---------- */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function priorityClass(p) {
  if (p === "High") return "badge-high";
  if (p === "Medium") return "badge-medium";
  return "badge-low";
}

/* ---------- Render ---------- */
function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter((t) => {
    if (currentFilter === "Active") return !t.completed;
    if (currentFilter === "Completed") return t.completed;
    return true;
  });

  const keyword = searchInput.value.toLowerCase();
  filtered = filtered.filter((t) => t.title.toLowerCase().includes(keyword));

  filtered.forEach((task) => {
    const div = document.createElement("div");
    div.className =
      "task-item d-flex align-items-center justify-content-between shadow-sm";
    div.dataset.id = task.id;

    div.innerHTML = `
        <div class="d-flex align-items-center">
            <button class="btn btn-light rounded-circle me-1 toggle">
            <i class="fa-solid fa-check"></i>
            </button>
          <div class="me-3 fs-4 ${task.completed ? "text-info" : "text-muted"} toggle">
            <i class="bi ${
              task.completed ? "bi-check-circle-fill" : "bi-circle"
            }"></i>
          </div>
          <div>
            <div class="fw-bold fs-5 ${
              task.completed ? "text-muted text-decoration-line-through" : ""
            }">
              <span class="task-title">${task.title}</span>
              <span class="badge ${priorityClass(task.priority)} ms-2">
                ${task.priority}
              </span>
            </div>
            <div class="text-time">
              <i class="bi bi-calendar3"></i>
              ${new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div>
            <button class="btn btn-light rounded-circle me-1 edit">
            <i class="fa-solid fa-wrench"></i>
            </button>
            <button class="btn btn-light rounded-circle text-danger delete">
            <i class="fa-solid fa-dumpster"></i>
            </button>
        </div>
      `;
    taskList.appendChild(div);
  });

  updateCounter();
}

function updateCounter() {
  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  counterBadge.textContent = `❄️ ${total} total • ${active} active`;
}

/* ---------- Add Task ---------- */
function addTask() {
  const title = taskInput.value.trim();
  const priority = prioritySelect.value.split(" ")[0];

  if (!title || priority === "ระดับความสำคัญ") return;

  tasks.push({
    id: Date.now(),
    title,
    priority,
    completed: false,
    createdAt: Date.now(),
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

/* ---------- Event Delegation ---------- */
taskList.addEventListener("click", (e) => {
  const item = e.target.closest(".task-item");
  if (!item) return;

  const id = Number(item.dataset.id);
  const task = tasks.find((t) => t.id === id);

  if (e.target.closest(".toggle")) {
    task.completed = !task.completed;
  }

  if (e.target.closest(".delete")) {
    tasks = tasks.filter((t) => t.id !== id);
  }

  if (e.target.closest(".edit")) {
    const newTitle = prompt("แก้ไขชื่องาน", task.title);
    if (newTitle) task.title = newTitle.trim();
  }

  saveTasks();
  renderTasks();
});

/* ---------- Search ---------- */
searchInput.addEventListener("input", renderTasks);

/* ---------- Filters ---------- */
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.textContent;
    renderTasks();
  });
});

/* ---------- Init ---------- */
renderTasks();
