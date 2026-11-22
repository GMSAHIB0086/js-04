const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved tasks when the page opens.
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    actions.append(editButton, deleteButton);
    li.append(taskText, actions);
    todoList.appendChild(li);
  });

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

function addTask(text) {
  tasks.push(text);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const updatedTask = prompt("Edit your task:", tasks[index]);

  if (updatedTask === null) return;

  const cleanTask = updatedTask.trim();
  if (cleanTask !== "") {
    tasks[index] = cleanTask;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = todoInput.value.trim();
  if (task === "") {
    todoInput.focus();
    return;
  }

  addTask(task);
  todoInput.value = "";
  todoInput.focus();
});

renderTasks();
