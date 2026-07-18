// Local Database Matrix properties
const projectData = [
    { id: 101, title: "Review production pull requests", category: "Development", priority: "high", hours: 8 },
    { id: 102, title: "Optimize system query responses", category: "Database", priority: "medium", hours: 5 },
    { id: 103, title: "Refactor legacy middleware routing", category: "Development", priority: "low", hours: 3 },
    { id: 104, title: "Design clean checkout UI mockups", category: "Design", priority: "high", hours: 12 },
    { id: 105, title: "Index customer profile datasets", category: "Database", priority: "high", hours: 7 },
    { id: 106, title: "Build interaction asset libraries", category: "Design", priority: "medium", hours: 4 }
];

// Core UI Element Anchors
const tasksGrid = document.getElementById('tasks-grid');
const categorySelect = document.getElementById('category-select');
const viewToggleBtn = document.getElementById('view-toggle');
const listViewContainer = document.getElementById('list-view-container');
const chartViewContainer = document.getElementById('chart-view-container');
const customBarGraph = document.getElementById('custom-bar-graph');

let currentViewMode = "list"; // Screen tracking variable

// --- 1. List Rendering Component ---
function renderListView(dataArray) {
    tasksGrid.innerHTML = "";
    if (dataArray.length === 0) {
        tasksGrid.innerHTML = `<p style="text-align:center;color:#64748b;margin:30px 0;">No tasks match your selections.</p>`;
        return;
    }
    dataArray.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.priority}`;
        card.innerHTML = `
            <div class="card-details">
                <h3>${task.title}</h3>
                <span class="card-tag">${task.category}</span>
                <span class="card-tag">Estimated: ${task.hours}hrs</span>
            </div>
            <span class="priority-badge ${task.priority}">${task.priority}</span>
        `;
        tasksGrid.appendChild(card);
    });
}

// --- 2. Custom Local Graph Aggregator Function ---
function renderCustomGraph(dataArray) {
    customBarGraph.innerHTML = ""; // Reset graph nodes
    
    const categories = [
        { name: "Development", key: "fill-dev" },
        { name: "Database", key: "fill-db" },
        { name: "Design", key: "fill-design" }
    ];

    // Compute aggregated totals for hour calculations
    const totals = categories.map(cat => {
        const sum = dataArray
            .filter(item => item.category === cat.name)
            .reduce((total, item) => total + item.hours, 0);
        return { name: cat.name, colorClass: cat.key, totalHours: sum };
    });

    // Establish maximum relative bounds (cap max at 20 hours to compute percentages nicely)
    const maxHourThreshold = 20;

    totals.forEach(item => {
        // Calculate rendering percentage widths dynamically
        const graphPercentage = Math.min((item.totalHours / maxHourThreshold) * 100, 100);
        
        const row = document.createElement('div');
        row.className = "graph-row";
        row.innerHTML = `
            <div class="bar-label">${item.name}</div>
            <div class="bar-track">
                <div class="bar-fill ${item.colorClass}" style="width: ${graphPercentage}%;"></div>
            </div>
            <div class="bar-value">${item.totalHours} hrs</div>
        `;
        customBarGraph.appendChild(row);
    });
}

// --- 3. Change Interaction Selector Hooks ---
categorySelect.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    const filteredData = selectedCategory === "all" 
        ? projectData 
        : projectData.filter(item => item.category === selectedCategory);
        
    renderListView(filteredData);
    renderCustomGraph(filteredData);
});

// --- 4. Interface View-State Layout Switcher ---
viewToggleBtn.addEventListener('click', () => {
    const activeCategory = categorySelect.value;
    const currentDataset = activeCategory === "all" ? projectData : projectData.filter(item => item.category === activeCategory);

    if (currentViewMode === "list") {
        currentViewMode = "chart";
        viewToggleBtn.textContent = "Switch to List View";
        listViewContainer.classList.add('hidden');
        chartViewContainer.classList.remove('hidden');
        renderCustomGraph(currentDataset);
    } else {
        currentViewMode = "list";
        viewToggleBtn.textContent = "Switch to Chart View";
        chartViewContainer.classList.add('hidden');
        listViewContainer.classList.remove('hidden');
        renderListView(currentDataset);
    }
});