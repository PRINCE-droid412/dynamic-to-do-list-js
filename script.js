document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');  // Add Task button
const taskInput = document.getElementById('task-input');    // Input field
const taskList = document.getElementById('task-list');      // Task list container

function addTask(taskText, save = true) {
    if (taskText.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    // Add event listener to the remove button to remove the task
    removeButton.onclick = function () {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText); // Update localStorage after removal
    };

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    if (save) {
        saveTaskToLocalStorage(taskText);  // Save the task to localStorage
    }

    taskInput.value = "";  // Clear input field
}
addButton.addEventListener('click', function () {
    addTask(taskInput.value);
});

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask(taskInput.value);
    }
});
function saveTaskToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
function removeTaskFromLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));  // Avoid saving again to localStorage
}

document.addEventListener('DOMContentLoaded', function () {
    loadTasks();  // Load tasks from localStorage when page is loaded
});


});
