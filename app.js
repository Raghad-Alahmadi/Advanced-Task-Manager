import store from './store.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initial State:', store.getState()); // Log initial state

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(tasks => {
            store.dispatch({ type: 'SET_TASKS', payload: tasks });
            renderTasks(tasks);
        });

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    store.dispatch({ type: 'SET_TASKS', payload: savedTasks });
    renderTasks(savedTasks);
});

function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.setAttribute('draggable', true);
        taskItem.dataset.id = task.id;

        // Add checkbox to mark task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            store.dispatch({ type: 'UPDATE_TASK', payload: { ...task, completed: checkbox.checked } });
            renderTasks(store.getState().tasks);
        });

        // Add task title
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            store.dispatch({ type: 'DELETE_TASK', payload: task.id });
            renderTasks(store.getState().tasks);
        });

        // Add update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update');
        updateButton.addEventListener('click', () => {
            showUpdateModal(task);
        });

        // Append elements to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTitle);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(updateButton);

        taskList.appendChild(taskItem);
    });
}

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (task.length >= 5) {
        const newTask = { id: Date.now(), title: task, completed: false };
        store.dispatch({ type: 'ADD_TASK', payload: newTask });
        renderTasks(store.getState().tasks);
        taskInput.value = '';
        errorMessage.textContent = '';
    } else if (task.length === 0) {
        errorMessage.textContent = 'Task cannot be empty.';
    } else {
        errorMessage.textContent = 'Task must be at least 5 characters long.';
    }
});

document.getElementById('filter').addEventListener('change', (e) => {
    const filter = e.target.value;
    const tasks = store.getState().tasks;
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });
    renderTasks(filteredTasks);
});

store.subscribe(() => {
    const tasks = store.getState().tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('task-item')) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('text/plain');
    const targetTaskId = e.target.dataset.id;

    if (draggedTaskId && targetTaskId && draggedTaskId !== targetTaskId) {
        const tasks = store.getState().tasks;
        const draggedTaskIndex = tasks.findIndex(task => task.id === parseInt(draggedTaskId));
        const targetTaskIndex = tasks.findIndex(task => task.id === parseInt(targetTaskId));

        const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
        tasks.splice(targetTaskIndex, 0, draggedTask);

        store.dispatch({ type: 'SET_TASKS', payload: tasks });
        renderTasks(tasks);
    }
});

// Modal functionality for validation messages
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Modal functionality for updating tasks
function showUpdateModal(task) {
    const updateModal = document.getElementById('update-modal');
    const updateInput = document.getElementById('update-input');
    const updateButton = document.getElementById('update-button');
    const updateErrorMessage = document.createElement('p');
    updateErrorMessage.id = 'update-error-message';
    updateInput.insertAdjacentElement('afterend', updateErrorMessage);
    const closeButton = document.querySelector('.close-button');

    updateInput.value = task.title;
    updateModal.style.display = 'block';

    updateButton.onclick = () => {
        const newTitle = updateInput.value.trim();
        if (newTitle.length >= 5) {
            store.dispatch({ type: 'UPDATE_TASK', payload: { ...task, title: newTitle } });
            renderTasks(store.getState().tasks);
            updateModal.style.display = 'none';
            updateErrorMessage.textContent = '';
        } else if (newTitle.length === 0) {
            updateErrorMessage.textContent = 'Task cannot be empty.';
        } else {
            updateErrorMessage.textContent = 'Task must be at least 5 characters long.';
        }
    };

    closeButton.addEventListener('click', () => {
        updateModal.style.display = 'none';
        updateErrorMessage.textContent = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = 'none';
            updateErrorMessage.textContent = '';
        }
    });
}