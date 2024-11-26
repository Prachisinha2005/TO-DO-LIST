// Function to save tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        if (task.completed) li.classList.add('completed');
        taskList.appendChild(li);
        
        // Add click events
        taskText.addEventListener('click', () => {
            taskText.parentElement.classList.toggle('completed');
            saveTasks();
        });
        
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = taskInput.value;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    // Clear input
    taskInput.value = '';
    
    // Add click events
    taskText.addEventListener('click', () => {
        taskText.parentElement.classList.toggle('completed');
        saveTasks();
    });
    
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    
    saveTasks();
}

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Keep your existing Enter key event listener
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Enhanced toggle with smooth animation handling
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
    // Add transition class to body
    document.body.style.transition = 'background 0.4s ease';
    
    if (darkModeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('darkMode', null);
    }
    
    // Remove transition after it's complete
    setTimeout(() => {
        document.body.style.transition = '';
    }, 400);
});

// Check saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
}
