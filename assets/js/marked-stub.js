// Minimal markdown parser stub for testing/fallback
// This is a simplified version - production should use the full marked.js from CDN
(function() {
    if (typeof marked !== 'undefined') return; // Already loaded from CDN
    
    window.marked = {
        parse: function(markdown) {
            if (!markdown) return '';
            
            // Simple markdown to HTML conversion
            let html = markdown
                // Headers
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                // Bold
                .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
                .replace(/__([^_]+)__/gim, '<strong>$1</strong>')
                // Italic
                .replace(/\*([^*]+)\*/gim, '<em>$1</em>')
                .replace(/_([^_]+)_/gim, '<em>$1</em>')
                // Links
                .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
                // Code blocks
                .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
                // Inline code
                .replace(/`([^`]+)`/gim, '<code>$1</code>')
                // Blockquotes
                .replace(/^&gt; (.*)$/gim, '<blockquote>$1</blockquote>')
                .replace(/^> (.*)$/gim, '<blockquote>$1</blockquote>')
                // Unordered lists
                .replace(/^\* (.*)$/gim, '<li>$1</li>')
                .replace(/^- (.*)$/gim, '<li>$1</li>')
                // Line breaks
                .replace(/\n$/gim, '<br>');
            
            // Wrap list items in ul
            html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
            
            // Paragraphs
            html = html.split('\n\n').map(para => {
                if (para.trim() && !para.match(/^<[h|u|o|p|b]/)) {
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
