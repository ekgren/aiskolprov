const data = [
    { "Model": "gpt-4o", "HP": "2024-10-20", "del": "VERB", "score": 78, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Open AI" },
    { "Model": "LLama 3.3 70b instruct", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Meta" },
    { "Model": "claude-3.5-sonnet", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Anthropic" },
    { "Model": "claude-3.7-sonnet", "HP": "2024-10-20", "del": "VERB", "score": 80, "normed": 2.0, "test_date": "2025-02-27", "link": "", "Organization": "Anthropic" },
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
const orgs = {
    "Open AI": "https://openai.com",
    "Meta": "https://meta.com",
    "Anthropic": "https://anthropic.com",
    "Google": "https://google.com",
    "xAI": "https://x.ai/",
    "DeepSeek": "https://deepseek.com",
    "Mistral": "https://mistral.ai",
    "Alibaba": "https://alibaba.com",
    "Utter project": "https://he-utter.eu/",
}

const models = {
    "gpt-4o": "https://cdn.openai.com/gpt-4o-system-card.pdf",
    "LLama 3.3 70b instruct": "https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_3/",
    "claude-3.5-sonnet": "https://www.anthropic.com/news/claude-3-5-sonnet",
    "claude-3.7-sonnet": "https://assets.anthropic.com/m/785e231869ea8b3b/original/claude-3-7-sonnet-system-card.pdf",
    "Gemini 2.0 flash": "https://deepmind.google/technologies/gemini/flash/",
    "Grok-2-1212": "https://openrouter.ai/Grok-2-1212",
    "DeepSeek-V3": "https://openrouter.ai/DeepSeek-V3",
    "DeepSeek-R1": "https://openrouter.ai/DeepSeek-R1",
    "mistral-large-2411": "https://openrouter.ai/mistral-large-2411",
    "claude-3.5-haiku-20241022": "https://openrouter.ai/claude-3.5-haiku-20241022",
    "gpt-4o-mini": "https://openrouter.ai/gpt-4o-mini",
    "qwen-max": "https://openrouter.ai/qwen-max",
    "Mistral Small 24b instruct": "https://openrouter.ai/mistralai/mistral-small-24b-instruct-2501",
    "utter-project/EuroLLM-9B-Instruct": "https://openrouter.ai/utter-project/EuroLLM-9B-Instruct",
    "LLama 3.2 8b instruct": "https://openrouter.ai/LLama%203.2%208b%20instruct",
}

const tbody = document.querySelector('#benchmarkTable tbody');
let sortDirection = {};
let currentSort = 'score';

function populateTable(data) {
    tbody.innerHTML = '';
    const baseUrl = "https://openrouter.ai/";

    data.forEach(row => {
        const tr = document.createElement('tr');
        const displayText = (row.link.startsWith(baseUrl) ? row.link.replace(baseUrl, "") : row.link).substring(0, 10);

        tr.innerHTML = `
            <td><a href="${models[row.Model]}" target"_blank">${row.Model}</a></td>
            <td><b>${parseFloat(row.normed).toFixed(1)}</b></td>
            <td>${row.score} / 80</td>
            <td><a href="${orgs[row.Organization]}" target"_blank">${row.Organization}</a></td>
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