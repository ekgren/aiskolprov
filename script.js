const data = [
    { "Model": "gpt-4o", "HP": "2024-10-20", "del": "VERB", "score": 78, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Open AI" },
    { "Model": "LLama 3.3 70b instruct", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Meta" },
    { "Model": "claude-3.5-sonnet", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Anthropic" },
    { "Model": "Gemini 2.0 flash", "HP": "2024-10-20", "del": "VERB", "score": 76, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Google" },
    { "Model": "Grok-2-1212", "HP": "2024-10-20", "del": "VERB", "score": 76, "normed": 2.0, "test_date": "2025-02-18", "link": "https://openrouter.ai/x-ai/grok-2-1212", "Organization": "xAI" },
    { "Model": "DeepSeek-V3", "HP": "2024-10-20", "del": "VERB", "score": 75, "normed": 1.9, "test_date": "2025-02-18", "link": "", "Organization": "DeepSeek" },
    { "Model": "DeepSeek-R1", "HP": "2024-10-20", "del": "VERB", "score": 73, "normed": 1.8, "test_date": "2025-02-18", "link": "", "Organization": "DeepSeek" },
    { "Model": "mistral-large-2411", "HP": "2024-10-20", "del": "VERB", "score": 73, "normed": 1.8, "test_date": "2025-02-18", "link": "", "Organization": "Mistral" },
    { "Model": "claude-3.5-haiku-20241022", "HP": "2024-10-20", "del": "VERB", "score": 72, "normed": 1.8, "test_date": "2025-02-18", "link": "https://openrouter.ai/anthropic/claude-3.5-haiku-20241022", "Organization": "Anthropic" },
    { "Model": "gpt-4o-mini", "HP": "2024-10-20", "del": "VERB", "score": 71, "normed": 1.7, "test_date": "2025-02-18", "link": "", "Organization": "Open AI" },
    { "Model": "qwen-max", "HP": "2024-10-20", "del": "VERB", "score": 68, "normed": 1.6, "test_date": "2025-02-18", "link": "https://openrouter.ai/qwen/qwen-max", "Organization": "Alibaba" },
    { "Model": "Mistral Small 24b instruct", "HP": "2024-10-20", "del": "VERB", "score": 67, "normed": 1.5, "test_date": "2025-02-18", "link": "", "Organization": "Mistral" },
    { "Model": "utter-project/EuroLLM-9B-Instruct", "HP": "2024-10-20", "del": "VERB", "score": 43, "normed": 0.8, "test_date": "2025-02-19", "link": "", "Organization": "Utter project" },
    { "Model": "LLama 3.2 8b instruct", "HP": "2024-10-20", "del": "VERB", "score": 33, "normed": 0.5, "test_date": "2025-02-18", "link": "", "Organization": "Meta" },
];

const tbody = document.querySelector('#benchmarkTable tbody');
let sortDirection = {};
let currentSort = 'score';

function populateTable(data) {
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.Model}</td>
            <td>${row.HP}</td>
            <td>${row.del}</td>
            <td>${row.score}</td>
            <td>${parseFloat(row.normed).toFixed(1)}</td>
            <td>${row.test_date}</td>
            <td>${row.Organization}</td>
        `;
        tbody.appendChild(tr);
    });
}

function sortTable(column) {
    sortDirection[column] = sortDirection[column] !== undefined ? !sortDirection[column] : false; // Default descending for score
    const isAscending = sortDirection[column];
    data.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        if (column === 'score' || column === 'normed') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }
        if (valA < valB) return isAscending ? 1 : -1; // Reverse for descending by default on score
        if (valA > valB) return isAscending ? -1 : 1;
        return 0;
    });
    // Update sorting indicators
    document.querySelectorAll('th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
    const sortedTh = document.querySelector(`th[data-sort="${column}"]`);
    sortedTh.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    populateTable(data);
}

document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.getAttribute('data-sort');
        sortTable(column);
        currentSort = column;
    });
});

// Initial population, sorted by raw score (highest at top, descending)
sortDirection['score'] = false; // Default descending (highest first)
sortTable('score');