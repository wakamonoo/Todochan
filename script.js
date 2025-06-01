const input = document.getElementById('inputField');
const add = document.getElementById('addButton');
const todos = document.getElementById('todolist');

let tasks = [];

// Task element
function createTaskElement(task) {
  const container = document.createElement('div');
  container.className =
    `flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
      task.done ? 'bg-indigo-100' : 'bg-white'
    } hover:bg-indigo-50`;

  const left = document.createElement('div');
  left.className = 'flex items-center gap-3 cursor-pointer flex-1';
  left.innerHTML = `
    <i class="fa-regular ${
      task.done ? 'fa-circle-check text-indigo-500' : 'fa-circle text-gray-400'
    } text-lg transition"></i>
    <span class="${
      task.done ? 'line-through text-gray-400' : 'text-gray-800'
    } transition">${task.text}</span>
  `;

  left.addEventListener('click', () => {
    task.done = !task.done;
    saveTasks();
    renderTasks();
  });

  const del = document.createElement('button');
  del.innerHTML =
    '<i class="fa-solid fa-trash text-gray-400 hover:text-red-500 transition"></i>';
  del.className = 'ml-4';
  del.addEventListener('click', () => {
    tasks = tasks.filter(t => t !== task);
    saveTasks();
    renderTasks();
  });

  container.appendChild(left);
  container.appendChild(del);
  return container;
}

function renderTasks() {
  todos.innerHTML = '';
  tasks.forEach(task => {
    todos.appendChild(createTaskElement(task));
  });
}

function saveTasks() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

add.addEventListener('click', () => {
  const text = input.value.trim();
  if (text !== '') {
    tasks.unshift({ text, done: false });
    saveTasks();
    renderTasks();
    input.value = '';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('myTasks');
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
});
