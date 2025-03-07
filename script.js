const data = [
    { "Model": "GPT‑4o mini", "HP": "2024-10-20", "del": "VERB", "score": 71, "normed": 1.7, "test_date": "2025-02-18", "link": "", "Organization": "Open AI", "open_weights": "false"},
    { "Model": "GPT‑4o", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Open AI", "open_weights": "false" },
    { "Model": "GPT‑4.5 (preview)", "HP": "2024-10-20", "del": "VERB", "score": 78, "normed": 2.0, "test_date": "2025-03-04", "link": "", "Organization": "Open AI", "open_weights": "false" },
    
    { "Model": "LLama 3.2 8b instruct", "HP": "2024-10-20", "del": "VERB", "score": 33, "normed": 0.5, "test_date": "2025-02-18", "link": "", "Organization": "Meta", "open_weights": "true" },
    { "Model": "LLama 3.3 70b instruct", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Meta", "open_weights": "true" },
    
    { "Model": "Claude 3.5 Haiku", "HP": "2024-10-20", "del": "VERB", "score": 72, "normed": 1.8, "test_date": "2025-02-18", "link": "https://openrouter.ai/anthropic/claude-3.5-haiku-20241022", "Organization": "Anthropic", "open_weights": "false" },
    { "Model": "Claude 3.5 Sonnet", "HP": "2024-10-20", "del": "VERB", "score": 77, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Anthropic", "open_weights": "false" },
    { "Model": "Claude 3.7 Sonnet", "HP": "2024-10-20", "del": "VERB", "score": 80, "normed": 2.0, "test_date": "2025-02-27", "link": "", "Organization": "Anthropic", "open_weights": "false" },
    
    { "Model": "Gemini 2.0 flash", "HP": "2024-10-20", "del": "VERB", "score": 76, "normed": 2.0, "test_date": "2025-02-18", "link": "", "Organization": "Google", "open_weights": "false" },
    
    { "Model": "Grok-2-1212", "HP": "2024-10-20", "del": "VERB", "score": 76, "normed": 2.0, "test_date": "2025-02-18", "link": "https://openrouter.ai/x-ai/grok-2-1212", "Organization": "xAI", "open_weights": "false" },
    
    { "Model": "DeepSeek-V3", "HP": "2024-10-20", "del": "VERB", "score": 75, "normed": 1.9, "test_date": "2025-02-18", "link": "", "Organization": "DeepSeek", "open_weights": "true" },
    { "Model": "DeepSeek-R1", "HP": "2024-10-20", "del": "VERB", "score": 73, "normed": 1.8, "test_date": "2025-02-18", "link": "", "Organization": "DeepSeek", "open_weights": "true" },

    { "Model": "Mistral Small 24b instruct", "HP": "2024-10-20", "del": "VERB", "score": 67, "normed": 1.5, "test_date": "2025-02-18", "link": "", "Organization": "Mistral", "open_weights": "true" },
    { "Model": "mistral-large-2411", "HP": "2024-10-20", "del": "VERB", "score": 73, "normed": 1.8, "test_date": "2025-02-18", "link": "", "Organization": "Mistral", "open_weights": "true" },
    
    { "Model": "Qwen-Max", "HP": "2024-10-20", "del": "VERB", "score": 68, "normed": 1.6, "test_date": "2025-02-18", "link": "https://openrouter.ai/qwen/qwen-max", "Organization": "Alibaba", "open_weights": "true" },
    { "Model": "Qwen QwQ 32b", "HP": "2024-10-20", "del": "VERB", "score": 65, "normed": 1.5, "test_date": "2025-03-06", "link": "https://openrouter.ai/qwen/qwq-32b", "Organization": "Alibaba", "open_weights": "true" },
    
    { "Model": "utter-project/EuroLLM-9B-Instruct", "HP": "2024-10-20", "del": "VERB", "score": 43, "normed": 0.8, "test_date": "2025-02-19", "link": "", "Organization": "Utter project", "open_weights": "true" },
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
    "GPT‑4o mini": "https://openai.com/blog/gpt-4o",
    "GPT‑4o": "https://cdn.openai.com/gpt-4o-system-card.pdf",
    "GPT‑4.5 (preview)": "https://openai.com/index/introducing-gpt-4-5/",
    
    "LLama 3.2 8b instruct": "https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_2/",
    "LLama 3.3 70b instruct": "https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_3/",
    
    "Claude 3.5 Haiku": "https://www.anthropic.com/news/claude-3-5-haiku",
    "Claude 3.5 Sonnet": "https://www.anthropic.com/news/claude-3-5-sonnet",
    "Claude 3.7 Sonnet": "https://assets.anthropic.com/m/785e231869ea8b3b/original/claude-3-7-sonnet-system-card.pdf",
    
    "Gemini 2.0 flash": "https://deepmind.google/technologies/gemini/flash/",
    
    "Grok-2-1212": "https://openrouter.ai/x-ai/grok-2-1212",
    
    "DeepSeek-V3": "https://openrouter.ai/deepseek-ai/deepseek-v3",
    "DeepSeek-R1": "https://openrouter.ai/deepseek-ai/deepseek-r1",
    
    "Mistral Small 24b instruct": "https://mistral.ai/news/mistral-small/",
    "mistral-large-2411": "https://mistral.ai/news/mistral-large-2411/",
    
    "Qwen-Max": "https://qwenlm.github.io/blog/qwen-max/",
    "Qwen QwQ 32b": "https://qwenlm.github.io/blog/qwen-max/",
    
    "utter-project/EuroLLM-9B-Instruct": "https://he-utter.eu/news/eurollm-models-released/",
}

const csvs = {
    "GPT‑4o mini": "joined_results_gpt-4o-mini.csv",
    "GPT‑4o": "joined_results_gpt-4o.csv",
    "GPT‑4.5 (preview)": "joined_results_gpt-4-5-preview.csv",

    "LLama 3.2 8b instruct": "joined_results_meta-llama-3-8b.csv",
    "LLama 3.3 70b instruct": "joined_results_meta-llama-3-3-70b.csv",
    
    "Claude 3.5 Haiku": "joined_results_claude-3-5-haiku-20241022.csv",
    "Claude 3.5 Sonnet": "joined_results_claude-3-5-sonnet.csv",
    "Claude 3.7 Sonnet": "joined_results_claude-3-7-sonnet.csv",
    
    "Gemini 2.0 flash": "joined_results_gemini-2-flash.csv",
    
    "Grok-2-1212": "joined_results_grok-2-1212.csv",
    
    "DeepSeek-R1": "joined_results_deepseek-r1.csv",
    "DeepSeek-V3": "joined_results_deepseek-v3.csv",
    
    "Mistral Small 24b instruct": "joined_results_mistral-small-24b-instruct-2501.csv",
    "mistral-large-2411": "joined_results_mistral-large-2411.csv",
    
    "Qwen-Max": "joined_results_qwen-max.csv",
    "Qwen QwQ 32b": "joined_results_qwen-qwq-32b.csv",
    
    "utter-project/EuroLLM-9B-Instruct": "joined_results_utter-project_eurollm-9b-instruct.csv",
}

// Global sort state
let sortDirection = {};

/**
 * Main initialization function - executes when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check for language preference
    const isEnglish = document.documentElement.lang === 'en';
    
    // Initialize default sorting (score descending - higher is better)
    initializeDefaultSort();
    
    // Setup page components
    setupLanguageSpecificText();
    populateTable(data);
    setupSortingListeners();
    setupBackButton();
    setupHistoryManagement();
    updateSortIndicators('score', false);
    restoreScrollPositionIfNeeded();
    
    /**
     * Set language-specific text elements
     */
    function setupLanguageSpecificText() {
        if (isEnglish) {
            document.getElementById('backBtn').textContent = 'Back';
        }
    }
    
    /**
     * Sort data by score in descending order by default
     */
    function initializeDefaultSort() {
        sortDirection['score'] = false; // false = descending order
        
        data.sort((a, b) => {
            const scoreA = parseFloat(a.score);
            const scoreB = parseFloat(b.score);
            return scoreB - scoreA; // Descending order (higher score on top)
        });
    }
    
    /**
     * Update visual sort indicators in table headers
     */
    function updateSortIndicators(column, isAscending) {
        document.querySelectorAll('th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
        const sortedTh = document.querySelector(`th[data-sort="${column}"]`);
        if (sortedTh) {
            sortedTh.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
        }
    }
    
    /**
     * Restore scroll position if returning from detail view
     */
    function restoreScrollPositionIfNeeded() {
        if (window.sessionStorage.getItem('fromDetailView') === 'true') {
            setTimeout(() => {
                const savedPosition = window.sessionStorage.getItem('scrollPosition');
                if (savedPosition) {
                    window.scrollTo(0, parseInt(savedPosition));
                    window.sessionStorage.removeItem('fromDetailView');
                    window.sessionStorage.removeItem('scrollPosition');
                }
            }, 50);
        }
    }
});

/**
 * Populates the results table with data
 * @param {Array} data - Array of model result objects to display
 */
function populateTable(data) {
    const tbody = document.querySelector('#benchmarkTable tbody');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><a href="${models[row.Model] || '#'}" target="_blank">${row.Model}</a></td>
          <td><b>${parseFloat(row.normed).toFixed(1)}</b></td>
          <td>${row.score} / 80</td>
          <td><a href="${orgs[row.Organization] || '#'}" target="_blank">${row.Organization}</a></td>
        `;
        
        // Make entire row clickable (ignoring clicks on links)
        tr.addEventListener("click", (e) => {
          if(e.target.tagName.toLowerCase() !== "a"){
             showDetailView(row.Model);
          }
        });
        
        tbody.appendChild(tr);
    });    
}

/**
 * Display detailed results view for a specific model
 * @param {string} modelName - The name of the model to show details for
 * @param {boolean} skipSaveScroll - Whether to skip saving scroll position (used when navigating via history)
 */
function showDetailView(modelName, skipSaveScroll) {
    // Store current scroll position if not skipped
    if (!skipSaveScroll) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        window.sessionStorage.setItem('scrollPosition', scrollPosition);
        window.sessionStorage.setItem('fromDetailView', 'true');
        window.sessionStorage.setItem('currentModel', modelName);
        
        // Push a new state to history for browser back button
        if (window.history && window.history.pushState) {
            window.history.pushState({ detail: true, model: modelName }, 
                document.title, window.location.pathname + "#detail=" + encodeURIComponent(modelName));
        }
    }
    
    // Hide main sections
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.links').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    
    // Check if we're on the English or Swedish page
    const isEnglish = document.documentElement.lang === 'en';
    
    // Show detail view
    const detailView = document.getElementById("detailView");
    detailView.style.display = "block";
    
    // Scroll to top to ensure header is visible
    window.scrollTo(0, 0);
    
    // Set title based on language
    const detailTitle = isEnglish ? " - Detailed Results" : " - Detaljerade resultat";
    document.getElementById("detailTitle").innerText = modelName + detailTitle;
    
    // Get the appropriate CSV file for this model
    const csvFile = "results/" + csvs[modelName];
    
    // Show loading state with language-specific text
    const loadingText = isEnglish ? 'Loading data...' : 'Laddar data...';
    document.getElementById("csvContainer").innerHTML = `<div class="loading">${loadingText}</div>`;
    
    // Fetch and process the CSV data
    fetch(csvFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvText => {
            // Parse CSV using PapaParse
            const parsed = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            });
            
            // Generate HTML table from parsed data
            const tableHTML = generateHtmlTable(parsed.meta.fields, parsed.data);
            document.getElementById("csvContainer").innerHTML = tableHTML;
        })
        .catch(err => {
            console.error('Error loading CSV data:', err);
            const errorText = isEnglish 
                ? 'An error occurred while loading data. Please try again later.' 
                : 'Ett fel uppstod vid laddning av data. Försök igen senare.';
            document.getElementById("csvContainer").innerHTML = 
                `<div class="error-message">${errorText}</div>`;
        });
}

/**
 * Generates HTML table from parsed CSV data
 * @param {Array} headers - Column headers from CSV
 * @param {Array} data - Rows of data from CSV
 * @returns {string} HTML table markup
 */
function generateHtmlTable(headers, data) {
    // Start with table and header
    let html = '<table class="csv-table"><thead><tr>';
    
    // Add header cells with consistent formatting
    headers.forEach(header => {
        const headerText = header.length > 20 ? header.substring(0, 20) + '...' : header;
        html += `<th title="${header}">
            <span class="header-text">${headerText}</span>
        </th>`;
    });
    
    // Start table body
    html += '</tr></thead><tbody>';
    
    // Add data rows
    data.forEach(row => {
        html += '<tr>';
        
        // Add cells for each column
        headers.forEach(header => {
            const cellContent = row[header] || "";
            
            // Format cell content for optimal display in fixed size cells
            let displayContent = cellContent;
            
            // Limit characters per cell for readability (showing first 120 chars)
            // since we've reduced cell size
            if (cellContent.length > 120) {
                displayContent = cellContent.substring(0, 120) + '...';
            }
            
            // Create cell with data attributes for modal interaction
            html += `<td 
                data-fulltext="${escapeHtml(cellContent)}" 
                data-column="${escapeHtml(header)}"
                title="Double-click to view full content">
                ${escapeHtml(displayContent)}
            </td>`;
        });
        
        html += '</tr>';
    });
    
    // Close table
    html += '</tbody></table>';
    
    // Setup interaction after rendering (using timeout to ensure DOM is ready)
    setTimeout(setupCellInteractions, 100);
    
    return html;
}

/**
 * Sets up interaction handlers for data table cells and modal
 */
function setupCellInteractions() {
    // Get all required DOM elements
    const modal = document.getElementById('cellModal');
    const modalTitle = document.getElementById('cellModalTitle');
    const modalBody = document.getElementById('cellModalBody');
    const closeBtn = document.querySelector('.cell-modal-close');
    const tableCells = document.querySelectorAll('.csv-table td');
    
    /**
     * Shows the modal with content from a cell
     * @param {string} content - The full text content to display
     * @param {string} columnName - The name of the column
     */
    function showModal(content, columnName) {
        modalTitle.textContent = columnName;
        modalBody.textContent = content;
        modal.style.display = 'flex';
    }
    
    /**
     * Hides the modal
     */
    function hideModal() {
        modal.style.display = 'none';
    }
    
    // Add double-click event to all table cells
    tableCells.forEach(cell => {
        cell.addEventListener('dblclick', () => {
            const fullText = cell.getAttribute('data-fulltext');
            const columnName = cell.getAttribute('data-column');
            showModal(fullText, columnName);
        });
    });
    
    // Setup modal close handlers
    closeBtn.addEventListener('click', hideModal);
    
    // Close when clicking outside the modal content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) hideModal();
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            hideModal();
        }
    });
}

// Escaping HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Set up the back button in the detail view
 * Uses browser history when available, with fallback for older browsers
 */
function setupBackButton() {
    document.getElementById("backBtn").addEventListener("click", function() {
        // If we used pushState, use history.back() to go back
        if (window.history && window.history.pushState) {
            window.history.back();
        } else {
            // Fallback if history API isn't available
            returnToMainView();
        }
    });
}

/**
 * Return from detail view to the main table view
 * Restores previous scroll position and manages browser history state
 */
function returnToMainView() {
    // Restore visibility of main page sections
    document.getElementById("detailView").style.display = "none";
    document.querySelector('.intro').style.display = 'block';
    document.querySelector('.results').style.display = 'block';
    document.querySelector('.links').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    
    // Clean up URL if needed without breaking navigation
    if (window.history && window.location.hash && (!history.state || history.state.detail !== false)) {
        window.history.replaceState({ detail: false }, document.title, window.location.pathname);
    }
    
    // Restore scroll position after a short delay to allow DOM to update
    setTimeout(() => {
        const savedPosition = window.sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            // Don't remove scrollPosition here since we need it if user refreshes the page
        }
    }, 50);
}

/**
 * Set up click event listeners for table column sorting
 */
function setupSortingListeners() {
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-sort');
            sortTable(column);
        });
    });
}

/**
 * Set up browser history management for navigation
 * Handles browser back/forward buttons and direct URL access with hash fragments
 */
function setupHistoryManagement() {
    // Initialize with a state for the main view
    if (!window.location.hash) {
        history.replaceState({ detail: false }, document.title, window.location.pathname);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        // Check if we're navigating to a detail view
        if (event.state && event.state.detail === true) {
            const modelName = event.state.model;
            // Don't save current scroll position again (already saved earlier)
            const skipSaveScroll = true;
            showDetailView(modelName, skipSaveScroll);
        } 
        // Check if we're navigating to main view
        else if (event.state && event.state.detail === false) {
            returnToMainView();
        }
        // Fallback for older history entries or direct URL with hash
        else if (window.location.hash && window.location.hash.startsWith('#detail=')) {
            const modelName = decodeURIComponent(window.location.hash.substring(8));
            showDetailView(modelName, true);
        } 
        // Fallback if somehow in detail view without proper state
        else if (document.getElementById("detailView").style.display === "block") {
            returnToMainView();
        }
    });
    
    // Handle direct loading with hash fragment in URL
    if (window.location.hash && window.location.hash.startsWith('#detail=')) {
        const modelName = decodeURIComponent(window.location.hash.substring(8));
        // Set timeout to ensure DOM is ready
        setTimeout(() => showDetailView(modelName, true), 100);
    }
}

/**
 * Sort the data table by the specified column
 * @param {string} column - The column to sort by
 */
function sortTable(column) {
    // Toggle sort direction or set default (true = ascending, false = descending)
    sortDirection[column] = sortDirection[column] !== undefined ? !sortDirection[column] : true;
    const isAscending = sortDirection[column];
    
    data.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        // Convert numeric columns to numbers for proper sorting
        if (column === 'score' || column === 'normed') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }
        
        // Compare values based on sort direction
        if (valA < valB) return isAscending ? -1 : 1;
        if (valA > valB) return isAscending ? 1 : -1;
        return 0;
    });
    
    // Update sorting indicators
    document.querySelectorAll('th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
    const sortedTh = document.querySelector(`th[data-sort="${column}"]`);
    sortedTh.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    
    // Refresh the table with sorted data
    populateTable(data);
}