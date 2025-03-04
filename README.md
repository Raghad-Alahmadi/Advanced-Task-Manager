# Task Manager Application

This is a simple task manager application built using JavaScript and Redux for state management. The application allows users to fetch, add, update, delete, and filter tasks. It also includes features like drag-and-drop sorting and local storage persistence.

## Features

### 1. Fetch and Display Tasks Dynamically
- Fetches a list of tasks from `https://jsonplaceholder.typicode.com/todos?_limit=10`.
- Displays the tasks in the UI.

### 2. Add New Task with Validation
- Allows users to add new tasks.
- Validates that the task title is at least 5 characters long.

### 3. Update Task
- Allows users to update the title of an existing task.
- Validates that the updated title is at least 5 characters long.

### 4. Delete Task
- Allows users to delete tasks.

### 5. Filter Tasks Dynamically
- Filters tasks based on their completion status (All, Completed, Pending).

### 6. Persist Data with Local Storage
- Saves tasks to local storage so that they persist across page reloads.

### 7. Drag & Drop Sorting
- Allows users to reorder tasks using drag-and-drop functionality.

## Usage

### Initial Setup
1. Clone the repository.
2. Open the `index.html` file in your browser.

### Adding a New Task
1. Enter a task title in the input field.
2. Click the "Add Task" button.

### Updating a Task
1. Click the "Update" button next to the task you want to update.
2. Enter the new task title in the modal that appears.
3. Click the "Update" button in the modal.

### Deleting a Task
1. Click the "Delete" button next to the task you want to delete.

### Filtering Tasks
1. Use the dropdown menu to filter tasks by completion status.

### Sorting Tasks
1. Drag and drop tasks to reorder them.

## Code Structure

### `store.js`
- Contains the Redux store configuration and reducers.

### `index.js`
- Contains the main application logic, including:
  - Fetching tasks from an API.
  - Rendering tasks to the DOM.
  - Handling user interactions (adding, updating, deleting, filtering, and sorting tasks).
  - Persisting tasks to local storage.

### `index.html`
- Contains the HTML structure of the application.

### `styles.css`
- Contains the CSS styles for the application.

## Dependencies

- Redux for state management.
- `jsonplaceholder.typicode.com` for fetching sample tasks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
