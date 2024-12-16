// Get todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
  // Get the todo list container from the HTML
  const todoList = document.getElementById("todoList");
  // Clear existing list items
  todoList.innerHTML = "";
  //* Filter todos based on current filter. filter() returns a new array with elements that respect the condition
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "pending") return !todo.completed;
    return true;
  });
  //* Append to the DOM
  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
    <div class="todo-content">
          <span class="todo-text">${todo.text}</span>
        </div>
        <div class="todo-actions">
          <button data-index="${index}" class="action-btn complete-btn">
            <i class="fas ${
              todo.completed ? "fa-rotate-left" : "fa-check"
            }"></i>
          </button>
          <button data-index="${index}" class="action-btn delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
    `;

    todoList.appendChild(li);
  });
}

// Function to add new todo
// This function will use saveTodos() and renderTods()
function addTodo() {
  //* Get the input
  const input = document.getElementById("todoInput");
  //* Get the value and trim white spaces
  const text = input.value.trim();
  //* Push the todo to the array
  if (text) {
    todos.push({
      text: text,
      completed: false,
    });
  }
  //* Empty the input field
  input.value = "";
  //* Save the todo to the localStorage
  saveTodos();
  //* Render todos in the front end
  renderTodos();
}

// Function to toggle todo completion
// This function will use saveTodos() and renderTods()
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Function to delete todo
// This function will use saveTodos() and renderTods()
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
  saveTodos();
}

// Add event listener
//? Add a todo upon clicking on the add butotn
document.getElementById("addTodoBtn").addEventListener("click", addTodo);
//? Add a todo upon pressing the enter key
document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});
//? Toggeling and deleting the todo
document.getElementById("todoList").addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const todoIndex = parseInt(target.dataset.index);
  if (target.classList.contains("complete-btn")) {
    toggleTodo(todoIndex);
  } else if (target.classList.contains("delete-btn")) {
    deleteTodo(todoIndex);
  }
});

// Add filter functionality
document.querySelector(".filters").addEventListener("click", function (e) {
  const filterBtn = e.target.closest(".filter-btn");
  if (!filterBtn) return;

  // Remove active class from all buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add active class to clicked button
  filterBtn.classList.add("active");

  // Update current filter
  currentFilter = filterBtn.dataset.filter;
  renderTodos();
});

// Intial render
renderTodos();
