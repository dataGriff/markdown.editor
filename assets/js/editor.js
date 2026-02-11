// Markdown Editor with GitHub Integration
// Author: Product Manager Friendly Markdown Editor

(function() {
    'use strict';

    // DOM Elements
    const markdownInput = document.getElementById('markdownInput');
    const markdownPreview = document.getElementById('markdownPreview');
    const repoOwner = document.getElementById('repoOwner');
    const repoName = document.getElementById('repoName');
    const filePath = document.getElementById('filePath');
    const githubToken = document.getElementById('githubToken');
    const loadFileBtn = document.getElementById('loadFile');
    const saveFileBtn = document.getElementById('saveFile');
    const clearTokenBtn = document.getElementById('clearToken');
    const statusMessage = document.getElementById('statusMessage');

    // State
    let currentFileSha = null;
    let autoSaveTimer = null;

    // Initialize
    init();

    function init() {
        // Load saved token and repo info from localStorage
        loadSettings();

        // Set up event listeners
        markdownInput.addEventListener('input', handleInputChange);
        loadFileBtn.addEventListener('click', loadFile);
        saveFileBtn.addEventListener('click', saveFile);
        clearTokenBtn.addEventListener('click', clearSettings);

        // Format buttons
        document.querySelectorAll('.btn-format').forEach(btn => {
            btn.addEventListener('click', () => handleFormat(btn.dataset.format));
        });

        // Initial render
        renderMarkdown();

        // Auto-save settings on change
        repoOwner.addEventListener('change', saveSettings);
        repoName.addEventListener('change', saveSettings);
        githubToken.addEventListener('change', saveSettings);

        // Keyboard shortcuts
        markdownInput.addEventListener('keydown', handleKeyboardShortcuts);
    }

    function handleInputChange() {
        renderMarkdown();
        updateStatus('Editing...');
        
        // Clear existing auto-save timer
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
        }
        
        // Auto-save after 3 seconds of inactivity
        autoSaveTimer = setTimeout(() => {
            updateStatus('Changes ready to save');
        }, 3000);
    }

    function renderMarkdown() {
        const markdown = markdownInput.value;
        try {
            // Configure marked options for GitHub Flavored Markdown
            marked.setOptions({
                gfm: true,
                breaks: true,
                headerIds: true,
                mangle: false
            });
            markdownPreview.innerHTML = marked.parse(markdown);
        } catch (error) {
            markdownPreview.innerHTML = `<p style="color: red;">Error rendering markdown: ${error.message}</p>`;
        }
    }

    function handleFormat(format) {
        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        const text = markdownInput.value;
        const selectedText = text.substring(start, end);
        let newText = '';
        let cursorOffset = 0;

        switch(format) {
            case 'bold':
                newText = `**${selectedText || 'bold text'}**`;
                cursorOffset = selectedText ? newText.length : 2;
                break;
            case 'italic':
                newText = `*${selectedText || 'italic text'}*`;
                cursorOffset = selectedText ? newText.length : 1;
                break;
            case 'heading':
                newText = `## ${selectedText || 'Heading'}`;
                cursorOffset = selectedText ? newText.length : 3;
                break;
            case 'link':
                newText = `[${selectedText || 'link text'}](url)`;
                cursorOffset = selectedText ? newText.length - 4 : 1;
                break;
            case 'list':
                newText = `- ${selectedText || 'list item'}`;
                cursorOffset = selectedText ? newText.length : 2;
                break;
        }

        markdownInput.value = text.substring(0, start) + newText + text.substring(end);
        markdownInput.focus();
        markdownInput.setSelectionRange(start + cursorOffset, start + cursorOffset);

        renderMarkdown();
        updateStatus(`Applied ${format} formatting`);
    }

    function handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + B for bold
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            handleFormat('bold');
        }
        // Ctrl/Cmd + I for italic
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            handleFormat('italic');
        }
        // Ctrl/Cmd + S for save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveFile();
        }
    }

    async function loadFile() {
        const owner = repoOwner.value.trim();
        const repo = repoName.value.trim();
        const path = filePath.value.trim();
        const token = githubToken.value.trim();

        if (!owner || !repo || !path) {
            updateStatus('❌ Please provide repository owner, name, and file path', 'error');
            return;
        }

        if (!token) {
            updateStatus('❌ Please provide a GitHub Personal Access Token', 'error');
            return;
        }

        try {
            updateStatus('⏳ Loading file from GitHub...');
            loadFileBtn.classList.add('loading');

            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.type !== 'file') {
                throw new Error('The specified path is not a file');
            }

            // Decode base64 content with proper UTF-8 handling
            const base64String = data.content.replace(/\n/g, '');
            const binaryString = atob(base64String);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const content = new TextDecoder().decode(bytes);
            markdownInput.value = content;
            currentFileSha = data.sha;
            
            renderMarkdown();
            updateStatus(`✅ Loaded: ${path}`);
        } catch (error) {
            updateStatus(`❌ Error loading file: ${error.message}`, 'error');
            console.error('Load error:', error);
        } finally {
            loadFileBtn.classList.remove('loading');
        }
    }

    async function saveFile() {
        const owner = repoOwner.value.trim();
        const repo = repoName.value.trim();
        const path = filePath.value.trim();
        const token = githubToken.value.trim();
        const content = markdownInput.value;

        if (!owner || !repo || !path) {
            updateStatus('❌ Please provide repository owner, name, and file path', 'error');
            return;
        }

        if (!token) {
            updateStatus('❌ Please provide a GitHub Personal Access Token', 'error');
            return;
        }

        try {
            updateStatus('⏳ Saving file to GitHub...');
            saveFileBtn.classList.add('loading');

            // Encode content to base64 with proper UTF-8 handling
            const utf8Bytes = new TextEncoder().encode(content);
            const base64Content = btoa(String.fromCharCode(...utf8Bytes));
            
            const body = {
                message: `Update ${path} via Markdown Editor`,
                content: base64Content,
                sha: currentFileSha
            };

            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`GitHub API error: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            currentFileSha = data.content.sha;
            
            updateStatus(`✅ Saved: ${path} (commit: ${data.commit.sha.substring(0, 7)})`);
        } catch (error) {
            updateStatus(`❌ Error saving file: ${error.message}`, 'error');
            console.error('Save error:', error);
        } finally {
            saveFileBtn.classList.remove('loading');
        }
    }

    function loadSettings() {
        repoOwner.value = localStorage.getItem('gh_repo_owner') || '';
        repoName.value = localStorage.getItem('gh_repo_name') || '';
        githubToken.value = localStorage.getItem('gh_token') || '';
        
        // Auto-populate with current repo if empty
        if (!repoOwner.value || !repoName.value) {
            const urlParts = window.location.hostname.split('.');
            if (urlParts.length >= 2 && urlParts[1] === 'github') {
                repoOwner.value = urlParts[0];
            }
        }
    }

    function saveSettings() {
        localStorage.setItem('gh_repo_owner', repoOwner.value.trim());
        localStorage.setItem('gh_repo_name', repoName.value.trim());
        localStorage.setItem('gh_token', githubToken.value.trim());
    }

    function clearSettings() {
        if (confirm('Clear all saved settings including your GitHub token?')) {
            localStorage.removeItem('gh_repo_owner');
            localStorage.removeItem('gh_repo_name');
            localStorage.removeItem('gh_token');
            repoOwner.value = '';
            repoName.value = '';
            githubToken.value = '';
            currentFileSha = null;
            updateStatus('Settings cleared');
        }
    }

    function updateStatus(message, type = 'info') {
        statusMessage.textContent = message;
        statusMessage.style.color = type === 'error' ? '#dc3545' : '#6c757d';
        
        // Auto-clear success messages after 5 seconds
        if (type !== 'error') {
            setTimeout(() => {
                if (statusMessage.textContent === message) {
                    statusMessage.textContent = 'Ready';
                    statusMessage.style.color = '#6c757d';
                }
            }, 5000);
        }
    }
})();
