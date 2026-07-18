// DOM Element Selections
const fetchBtn = document.getElementById('fetch-btn');
const taskTitle = document.getElementById('task-title');
const userIdSpan = document.getElementById('user-id');
const taskIdSpan = document.getElementById('task-id');
const taskStatus = document.getElementById('task-status');
const loadingState = document.getElementById('loading-state');
const dataContainer = document.getElementById('data-container');

// A local mock database to guarantee it works without network blocks
const mockTasks = [
    { userId: 1, id: 12, title: "Review pull requests and merge branches", completed: true },
    { userId: 1, id: 24, title: "Optimize database queries for dashboard metrics", completed: false },
    { userId: 2, id: 45, title: "Write comprehensive unit tests for user authentication", completed: true },
    { userId: 3, id: 78, title: "Design responsive layout configurations for mobile viewports", completed: false },
    { userId: 4, id: 91, title: "Refactor legacy API middleware and exception handling", completed: false }
];

// Asynchronous function simulating a live network request
async function fetchDynamicTask() {
    // 1. Show loading state to fulfill assignment criteria
    loadingState.classList.remove('hidden');
    dataContainer.classList.add('hidden');

    // 2. Simulate a realistic network delay (800 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        // Pick a random task from our mock database array
        const randomIndex = Math.floor(Math.random() * mockTasks.length);
        const data = mockTasks[randomIndex];

        // 3. Dynamic DOM Manipulation updates
        taskTitle.textContent = data.title;
        userIdSpan.textContent = data.userId;
        taskIdSpan.textContent = data.id;

        // Render badge colors conditionally based on completion state
        if (data.completed) {
            taskStatus.textContent = "Completed";
            taskStatus.className = "badge completed";
        } else {
            taskStatus.textContent = "Pending";
            taskStatus.className = "badge pending";
        }

    } catch (error) {
        console.error("Data processing error:", error);
        taskTitle.textContent = "Error rendering local data elements.";
    } finally {
        // 4. Hide loading indicators and display updated visual content
        loadingState.classList.add('hidden');
        dataContainer.classList.remove('hidden');
    }
}

// Attach event listener for manual dynamic updates
fetchBtn.addEventListener('click', fetchDynamicTask);

// Initial application load simulation
fetchDynamicTask();