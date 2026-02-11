// Minimal markdown parser stub for testing/fallback
// This is a simplified version - production should use the full marked.js from CDN
// Limitations: Basic formatting only, may not handle edge cases correctly
(function() {
    if (typeof marked !== 'undefined') return; // Already loaded from CDN
    
    window.marked = {
        parse: function(markdown) {
            if (!markdown) return '';
            
            // Simple markdown to HTML conversion
            let html = markdown
                // Headers (must be first to avoid conflicts)
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                // Bold
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/__([^_]+)__/g, '<strong>$1</strong>')
                // Italic (avoid matching within words)
                .replace(/\*([^*\s][^*]*[^*\s]|\S)\*/g, '<em>$1</em>')
                .replace(/\b_([^_\s][^_]*[^_\s]|\S)_\b/g, '<em>$1</em>')
                // Links
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                // Code blocks (multi-line)
                .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
                // Inline code
                .replace(/`([^`]+?)`/g, '<code>$1</code>')
                // Blockquotes
                .replace(/^&gt; (.*)$/gim, '<blockquote>$1</blockquote>')
                .replace(/^> (.*)$/gim, '<blockquote>$1</blockquote>')
                // Unordered lists
                .replace(/^\* (.*)$/gim, '<li>$1</li>')
                .replace(/^- (.*)$/gim, '<li>$1</li>')
                // Line breaks
                .replace(/\n$/gim, '<br>');
            
            // Wrap consecutive list items in ul tags
            html = html.replace(/(<li>.*<\/li>\n?)+/gs, function(match) {
                return '<ul>' + match + '</ul>';
            });
            
            // Paragraphs
            html = html.split('\n\n').map(para => {
                // Don't wrap if it's already an HTML element
                if (para.trim() && !para.match(/^<[huopb]/)) {
                    return '<p>' + para + '</p>';
                }
                return para;
            }).join('\n');
            
            return html;
        },
        setOptions: function(options) {
            // Stub for compatibility
        }
    };
    
    console.log('Using fallback markdown parser (limited functionality)');
})();
