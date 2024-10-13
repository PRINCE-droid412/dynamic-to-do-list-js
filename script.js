document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');  // Add Task button
    const taskInput = document.getElementById('task-input');    // Input field
    const taskList = document.getElementById('task-list');      // Task list container

    // Function to add tasks to the list and optionally save them to localStorage
    function addTask(taskText, save = true) {
        taskText = taskInput.value.trim();  // Ensure the taskText is trimmed of spaces

        if (taskText === "") {
            alert("Please enter a task.");  // Alert if the task is empty
            return;
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create the remove button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Event listener to remove the task from the DOM and localStorage
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);  // Remove task from DOM
            removeTaskFromLocalStorage(taskText);  // Remove from localStorage
        };

        taskItem.appendChild(removeButton);  // Append remove button to task item
        taskList.appendChild(taskItem);      // Add task item to the task list

        if (save) {
            saveTaskToLocalStorage(taskText);  // Save to localStorage
        }

        taskInput.value = "";  // Clear the input field after adding the task
    }

    // Event listener for Add Task button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);  // Add task when button is clicked
    });

    // Event listener for pressing the Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);  // Add task when Enter key is pressed
        }
    });

    // Function to save tasks to localStorage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // Retrieve stored tasks
        storedTasks.push(taskText);  // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  // Save the updated task list back to localStorage
    }

    // Function to remove tasks from localStorage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // Retrieve stored tasks
        const updatedTasks = storedTasks.filter(task => task !== taskText);  // Filter out the task to be removed
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save the updated task list back to localStorage
    }

    // Function to load tasks from localStorage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // Retrieve stored tasks
        storedTasks.forEach(taskText => addTask(taskText, false));  // Add each task to the list without saving it again
    }

    // Call loadTasks function when the DOM content is loaded
    loadTasks();
});
