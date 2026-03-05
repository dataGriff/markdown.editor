# Getting Started with Markdown Editor

Welcome to the Markdown Editor - a product manager friendly tool for editing GitHub Pages content!

## What is This?

This is a web-based markdown editor that allows you to:

- ✏️ **Edit markdown files** directly in your browser
- 👁️ **Preview in real-time** with GitHub-flavored markdown rendering
- 💾 **Save directly to GitHub** without using Git commands
- 🎨 **Use rich formatting tools** for easier editing
- 👥 **Perfect for product managers** who want to update documentation without Git knowledge

## Quick Start

### 1. Get a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Markdown Editor"
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Use the Editor

1. Open the Markdown Editor at your GitHub Pages URL
2. Enter your **GitHub username**
3. Enter your **repository name**
4. Enter your **GitHub Personal Access Token**
5. Enter the **path to your markdown file** (e.g., `docs/getting-started.md`)
6. Click **Load File** to edit existing content
7. Make your changes in the editor
8. Watch the preview update in real-time
9. Click **Save File** when done

## Features

### Real-Time Preview

See your changes instantly in the preview pane with proper GitHub-flavored markdown rendering.

### Format Buttons

Quick formatting tools for:
- **Bold** text
- *Italic* text
- Headers
- Links
- Lists

### Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + S` - Save file

### Auto-Save Indicators

The status bar shows when you're editing and reminds you to save your changes.

### Local Storage

Your GitHub credentials and repository information are saved locally in your browser for convenience.

## Security Notes

⚠️ **Important Security Information:**

- Your GitHub token is stored in your browser's localStorage
- Never share your token with anyone
- Use tokens with minimal required permissions
- Clear your token when using a shared computer (use the "Clear Token" button)
- Consider using a token with limited scope if possible

## Markdown Tips

### Headers
```
# H1 Header
## H2 Header
### H3 Header
```

### Emphasis
```
*italic* or _italic_
**bold** or __bold__
***bold and italic***
```

### Lists
```
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Links and Images
```
[Link text](https://example.com)
![Alt text](image-url.jpg)
```

### Code
````
Inline `code`

```javascript
// Code block
function hello() {
    console.log("Hello!");
}
```
````

### Blockquotes
```
> This is a blockquote
> It can span multiple lines
```

### Tables
```
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Troubleshooting

### "Error loading file"
- Check that your GitHub username, repository name, and file path are correct
- Verify your GitHub token has the necessary permissions
- Make sure the file exists in the repository

### "Error saving file"
- Ensure you loaded the file first (to get the file's SHA)
- Check that your token has write permissions to the repository
- Verify you're not trying to save to a protected branch

### Preview not updating
- Try clicking in the editor area to trigger an update
- Refresh the page if issues persist

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review your GitHub token permissions
3. Check the browser console for detailed error messages
4. Verify your internet connection

## Contributing

This is an open-source project. Contributions are welcome!

## License

MIT License - Feel free to use and modify for your needs.
