// This is a single-line comment in JavaScript. The browser ignores it.
// We use comments to explain what the code does.

// --- Step 1: Select HTML elements ---
const taskInput = document.getElementById('taskInput'); // The text box where we type
const addButton = document.getElementById('addButton'); // The 'Add' button
const taskList = document.getElementById('taskList');   // The <ul> list where tasks go

// --- NEW FEATURE: Data Storage (State) ---
// We create an empty array '[]' to store our tasks.
// Each task will be an "object" with text and a 'completed' status.
let tasks = [];

// Check if we have saved data in localStorage when the page first loads
// localStorage is your browser's memory. It only saves plain text strings.
if (localStorage.getItem("myTasks")) {
    // JSON.parse converts the saved text string back into a real JavaScript array
    tasks = JSON.parse(localStorage.getItem("myTasks"));
    renderTasks(); // Draw the saved tasks on the screen
}

// --- Step 2: Define a function to add a new task ---
function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task first!");
        return;
    }

    // Instead of just making HTML directly, we create a JavaScript object
    const newTask = {
        text: taskText,
        completed: false // Brand new tasks are always incomplete!
    };

    // Add it to the end of our array
    tasks.push(newTask);

    // Save to browser memory, then redraw the screen
    saveData();
    renderTasks();

    // Clear the input box
    taskInput.value = "";
}

// --- NEW FEATURE: Render the entire list from our Array ---
// This function clears the screen and recreates it based on our 'tasks' array.
// Separating data from visuals is a very important concept in programming!
function renderTasks() {
    // 1. Clear everything currently on the screen inside the <ul>
    taskList.innerHTML = "";

    // 2. Loop through our array of tasks
    // 'forEach' runs a function for every single item inside the array
    tasks.forEach(function(task, index) {
        
        const newTaskElement = document.createElement('li');
        
        // If this specific task object is marked completed, add our CSS class
        if (task.completed === true) {
            newTaskElement.classList.add('completed');
        }

        newTaskElement.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // --- NEW FEATURE: Mark as complete ---
        const textSpan = newTaskElement.querySelector('.task-text');
        
        // When the user clicks on the text...
        textSpan.addEventListener('click', function() {
            // Flip the completed status in our data!
            // If it's true it becomes false; if it's false it becomes true.
            task.completed = !task.completed; 
            
            saveData(); // Save the new status
            renderTasks(); // Redraw the screen so the CSS updates!
        });

        // Make the Delete button work
        const deleteButton = newTaskElement.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            // .splice() removes an item from an array. 
            // We tell it: start at this 'index', and remove 1 item.
            tasks.splice(index, 1);
            
            saveData();    // Save the array (now missing this item)
            renderTasks(); // Redraw the screen (task will disappear)
        });

        // Add the new element to the page
        taskList.appendChild(newTaskElement);
    });
}

// --- Helper Function: Save data to memory ---
function saveData() {
    // JSON.stringify converts our array of objects into a text string
    // because localStorage CANNOT save arrays directly.
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// --- Step 3: Tell the buttons to run our functions ---
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
