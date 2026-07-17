// Local Database to support network isolation requirements
const workspaceTasks = [
    { userId: 1, id: 101, title: "Review pull requests and merge database branches", completed: true },
    { userId: 1, id: 102, title: "Optimize system query responses for real-time traffic", completed: false },
    { userId: 2, id: 201, title: "Write comprehensive unit testing modules for user login", completed: true },
    { userId: 3, id: 304, title: "Design clean layout templates for mobile application dashboards", completed: false },
    { userId: 4, id: 402, title: "Refactor legacy framework configurations and catch routing errors", completed: false }
];

// Banner notifications array for automated cycling
const bannerMessages = [
    "🔔 System Notice: Database sync completed successfully.",
    "🚀 Tip: Use keywords like 'database' or 'login' to test filters.",
    "⚡ Performance Status: All application response latency metrics optimal."
];

// DOM Core Selectors
const tasksGrid = document.getElementById('tasks-grid');
const searchInput = document.getElementById('search-input');
const promoBanner = document.getElementById('promo-banner');
const chatLogs = document.getElementById('chat-logs');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');

// --- Feature 1: Reusable Rendering Function ---
function renderUIComponents(filteredArray) {
    tasksGrid.innerHTML = ""; // Clear active UI view
    
    if (filteredArray.length === 0) {
        tasksGrid.innerHTML = `<p style="text-align:center; color:#7f8c8d; margin-top:20px;">No workspace tasks found matching that query.</p>`;
        return;
    }

    filteredArray.forEach(task => {
        // Build card container programmatically
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'completed' : 'pending'}`;
        
        card.innerHTML = `
            <div class="card-header">
                <span>User: ${task.userId} | ID: ${task.id}</span>
                <span class="badge ${task.completed ? 'comp' : 'pend'}">${task.completed ? 'Done' : 'Pending'}</span>
            </div>
            <p class="task-desc"><strong>${task.title}</strong></p>
        `;
        tasksGrid.appendChild(card);
    });
}

// --- Feature 2: Live Search Input Filter Execution ---
searchInput.addEventListener('input', (event) => {
    const searchString = event.target.value.toLowerCase().trim();
    const filteredResults = workspaceTasks.filter(task => 
        task.title.toLowerCase().includes(searchString)
    );
    renderUIComponents(filteredResults);
});

// --- Feature 3: Automatic Content Switcher (Every 5 seconds) ---
let bannerIndex = 0;
setInterval(() => {
    bannerIndex = (bannerIndex + 1) % bannerMessages.length;
    promoBanner.textContent = bannerMessages[bannerIndex];
    
    // Aesthetic flavor: change banner background-color automatically during shift
    promoBanner.style.backgroundColor = bannerIndex === 0 ? "#2c3e50" : bannerIndex === 1 ? "#2980b9" : "#27ae60";
}, 5000);

// --- Feature 4: Chatbot Widget Auto-Responder Logic ---
function processChatbotSubmission() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Append user bubble to view screen
    chatLogs.innerHTML += `<p class="user-msg">${userText}</p>`;
    chatInput.value = ""; // Flush inputs
    chatLogs.scrollTop = chatLogs.scrollHeight; // Auto Scroll down

    // Analyze statement triggers to issue responses programmatically
    setTimeout(() => {
        let botText = "🤖 I didn't quite catch that. Try asking for 'status', 'tasks', or 'help'.";
        const cleanQuery = userText.toLowerCase();

        if (cleanQuery.includes("status")) {
            botText = "🤖 Core status indicator: Active. Local simulation stack operational.";
        } else if (cleanQuery.includes("tasks") || cleanQuery.includes("work")) {
            botText = `🤖 System is indexing ${workspaceTasks.length} active database tracking records right now.`;
        } else if (cleanQuery.includes("help") || cleanQuery.includes("hello")) {
            botText = "🤖 Automated Desk Assistant: Type 'status' for health parameters, or use the top input bar to isolate records instantly.";
        }

        chatLogs.innerHTML += `<p class="bot-msg">${botText}</p>`;
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }, 600);
}

// Attach execution hooks
sendChatBtn.addEventListener('click', processChatbotSubmission);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processChatbotSubmission(); });

// Initial components display step on instantiation
renderUIComponents(workspaceTasks);