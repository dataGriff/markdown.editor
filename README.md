# 📝 Markdown Editor for GitHub Pages

A product manager friendly web-based markdown editor that integrates seamlessly with GitHub Pages. Edit your markdown files directly in your browser with real-time preview and save them back to GitHub - no Git commands required!

## ✨ Features

- 🌐 **Web-based Interface** - Edit markdown files directly in your browser
- 👁️ **Live Preview** - See changes in real-time with GitHub-flavored markdown rendering
- 💾 **GitHub Integration** - Load and save files directly to/from your GitHub repository
- 🎨 **Rich Formatting Tools** - Quick buttons for bold, italic, headers, links, and lists
- ⌨️ **Keyboard Shortcuts** - Speed up your workflow with familiar shortcuts
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🔒 **Secure** - Uses GitHub Personal Access Tokens for authentication
- 👥 **User-Friendly** - Perfect for product managers and non-technical users

## 🚀 Quick Start

### Step 1: Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under "Source", select your main branch (usually `main` or `master`)
4. Select the root folder `/` as the source
5. Click **Save**
6. Wait a few minutes for GitHub to deploy your site

Your site will be available at: `https://[username].github.io/[repository-name]/`

### Step 2: Get a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Markdown Editor")
4. Select the `repo` scope (this gives full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** - you won't see it again!

### Step 3: Use the Editor

1. Open your GitHub Pages URL in a browser
2. Enter your GitHub username (e.g., `dataGriff`)
3. Enter your repository name (e.g., `markdown.editor`)
4. Paste your GitHub Personal Access Token
5. Enter the path to a markdown file (e.g., `docs/sample-page.md`)
6. Click **Load File** to edit existing content
7. Make your changes in the editor panel
8. Watch the preview update automatically
9. Click **Save File** when you're done

## 📖 Documentation

### Creating New Files

To create a new file:
1. Enter the path where you want to create it (e.g., `docs/new-page.md`)
2. Type your content in the editor
3. Click **Save File**
4. The file will be created in your repository

### Editing Existing Files

To edit an existing file:
1. Enter the path to the file (e.g., `docs/getting-started.md`)
2. Click **Load File**
3. Make your changes
4. Click **Save File**

### Formatting Tools

The editor includes quick formatting buttons:
- **B** - Make text bold (`**text**`)
- **I** - Make text italic (`*text*`)
- **H** - Add a heading (`## Heading`)
- **🔗** - Add a link (`[text](url)`)
- **📋** - Add a list item (`- item`)

### Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + S` - Save file

## 🔒 Security

### Token Security

Your GitHub Personal Access Token is stored in your browser's localStorage for convenience. This means:

- ✅ It persists between sessions
- ✅ It's only accessible to this domain
- ❌ It's not encrypted
- ❌ It's stored in plain text in localStorage

**Best Practices:**
1. Use a token with minimal required permissions
2. Regularly rotate your tokens
3. Use the **"Clear Token"** button when using a shared computer
4. Never share your token with anyone
5. Consider creating a dedicated token just for this editor

### Repository Permissions

The token needs the `repo` scope to:
- Read repository contents
- Write and commit changes
- Access private repositories (if needed)

## 📁 Project Structure

```
markdown.editor/
├── index.html              # Main editor interface
├── _config.yml            # Jekyll configuration for GitHub Pages
├── assets/
│   ├── css/
│   │   └── style.css      # Editor styling
│   └── js/
│       └── editor.js      # Editor functionality and GitHub integration
├── docs/
│   ├── getting-started.md # Detailed user guide
│   └── sample-page.md     # Sample markdown content
└── README.md              # This file
```

## 🛠️ Technical Details

### Technologies Used

- **HTML5** - Structure and layout
- **CSS3** - Styling with responsive design
- **JavaScript** - Editor functionality
- **Marked.js** - Markdown parsing and rendering
- **GitHub API** - Repository integration
- **GitHub Pages** - Static site hosting
- **Jekyll** - Static site generation

### Browser Compatibility

Works with modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### GitHub API

The editor uses the GitHub REST API v3:
- `GET /repos/{owner}/{repo}/contents/{path}` - Load files
- `PUT /repos/{owner}/{repo}/contents/{path}` - Save files

## 🤝 Contributing

Contributions are welcome! This project aims to provide a simple, user-friendly interface for editing markdown files in GitHub.

### Ideas for Enhancement

- File browser for easier navigation
- Multiple file tabs
- Conflict resolution
- Collaborative editing
- Template system
- Export to PDF/HTML
- Spell checker
- Dark mode

## 📝 Use Cases

Perfect for:
- 📚 Documentation updates
- 📰 Blog post editing
- 📋 Project management
- 📖 Wiki maintenance
- 🎯 Product specifications
- 📊 Status reports
- 📝 Meeting notes

## 🐛 Troubleshooting

### Editor not loading?
- Check that GitHub Pages is enabled in your repository settings
- Verify the site URL is correct
- Wait a few minutes after enabling GitHub Pages

### Can't load files?
- Verify your GitHub username and repository name
- Check that your token has the correct permissions
- Ensure the file path is correct (case-sensitive)

### Can't save files?
- Make sure you loaded the file first (to get its SHA)
- Verify your token has write permissions
- Check that you're not saving to a protected branch

### Preview not updating?
- Click in the editor to trigger an update
- Check browser console for errors
- Try refreshing the page

## 📄 License

MIT License - Feel free to use and modify for your needs.

## 🙏 Acknowledgments

- Built with [Marked.js](https://marked.js.org/) for markdown parsing
- Styled with [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css)
- Powered by [GitHub Pages](https://pages.github.com/)

---

**Made with ❤️ for product managers and content creators**