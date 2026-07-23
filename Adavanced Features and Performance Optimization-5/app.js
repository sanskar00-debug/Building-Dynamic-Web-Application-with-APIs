// Simulated Data Array Mirror
const centralServerDatabase = [
    { id: 501, title: "Initialize framework configuration scripts", priority: "High" },
    { id: 502, title: "Audit system error log files for leaks", priority: "Medium" },
    { id: 503, title: "Generate localization strings for dashboard templates", priority: "Low" }
];

// Operational Limits Setup
const RATE_LIMIT_CEILING = 5;
let sessionRequestCounter = 0;
let requestThrottlingTimer = null;

// DOM Anchors
const themePref = document.getElementById('theme-pref');
const limitInput = document.getElementById('limit-input');
const secureFetchBtn = document.getElementById('secure-fetch-btn');
const rateBadge = document.getElementById('rate-badge');
const toastNotification = document.getElementById('toast-notification');
const skeletonLoader = document.getElementById('skeleton-loader');
const dataViewport = document.getElementById('data-viewport');

// --- 1. Preference Storage & Initialization Mechanism ---
function loadUserCustomPreferences() {
    const cachedTheme = localStorage.getItem('user-dashboard-theme') || 'light-mode';
    const cachedRecordLimit = localStorage.getItem('user-record-limit') || '10';

    // Apply cached settings to inputs and HTML document properties
    themePref.value = cachedTheme;
    document.body.className = cachedTheme;
    limitInput.value = cachedRecordLimit;
}

// Watchers to update and save settings instantly
themePref.addEventListener('change', (e) => {
    document.body.className = e.target.value;
    localStorage.setItem('user-dashboard-theme', e.target.value);
});
limitInput.addEventListener('input', (e) => {
    localStorage.setItem('user-record-limit', e.target.value);
});

// --- 2. Toast Messaging & Fallback System ---
function triggerSystemToast(message, messageStyleType) {
    toastNotification.textContent = message;
    toastNotification.className = `toast ${messageStyleType}`;
    
    // Auto-dismiss the notification banner after 4 seconds
    setTimeout(() => { toastNotification.classList.add('hidden'); }, 4000);
}

// --- 3. Synchronize Processor logic (with Loading Skeletons) ---
async function synchronizeApplicationData() {
    // Inject and activate loading structural skeletons
    skeletonLoader.classList.remove('hidden');
    dataViewport.classList.add('hidden');

    // Recreate artificial connection delay parameters
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
        // Validation Layer: Verify input limits match guidelines
        const maxDisplayCount = parseInt(limitInput.value, 10);
        if (isNaN(maxDisplayCount) || maxDisplayCount <= 0) {
            throw new TypeError("Configuration Parameter Error: Record Limit parameter must be a positive integer.");
        }

        // Render dynamic task rows cleanly
        dataViewport.innerHTML = "";
        const visibleTasks = centralServerDatabase.slice(0, maxDisplayCount);

        visibleTasks.forEach(task => {
            const row = document.createElement('div');
            row.className = "task-item";
            row.innerHTML = `<strong>[ID: ${task.id}]</strong> ${task.title} - <em>Priority: ${task.priority}</em>`;
            dataViewport.appendChild(row);
        });

        triggerSystemToast("Data synchronized successfully with terminal structures.", "success");

    } catch (validationError) {
        console.error(validationError);
        dataViewport.innerHTML = `<p class="fallback-msg" style="color:#ef4444;">${validationError.message}</p>`;
        triggerSystemToast("Synchronization Aborted: Invalid parameters detected.", "error");
    } finally {
        // Teardown skeleton UI views
        skeletonLoader.classList.add('hidden');
        dataViewport.classList.remove('hidden');
    }
}

// --- 4. Optimization Layer: Throttling & Debouncing Controls ---
secureFetchBtn.addEventListener('click', () => {
    // Stability Check A: Stop execution loop if rate limits are exceeded
    if (sessionRequestCounter >= RATE_LIMIT_CEILING) {
        triggerSystemToast("API Safety Violation: Maximum hourly fetch rate cap reached. Request rejected.", "error");
        return;
    }

    // Stability Check B: Throttling / Debouncing to catch rapid multi-clicks
    if (requestThrottlingTimer) {
        triggerSystemToast("Request Throttled: De-duplication logic active. Please wait.", "error");
        return;
    }

    // Advance Request Counters and track badges
    sessionRequestCounter++;
    rateBadge.textContent = `Requests Sent Today: ${sessionRequestCounter}/${RATE_LIMIT_CEILING}`;

    // Execute synchronization core operation
    synchronizeApplicationData();

    // Lock transaction actions out for 3 seconds to throttle connection lines
    requestThrottlingTimer = setTimeout(() => {
        requestThrottlingTimer = null;
    }, 3000);
});

// Run preferences initializer on page mount
loadUserCustomPreferences();