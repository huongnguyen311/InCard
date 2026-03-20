# Figma to Local — Design Workflow Setup Guide

> **For designers.** This guide walks you through connecting an existing Figma project to your local machine using Claude Code and the Figma MCP. You'll be able to pull designs from Figma, recreate them as local HTML mockups, iterate on them, and push updates back to Figma.

---

## Prerequisites

Before starting, make sure you have:

- **Node.js** v18 or later — [nodejs.org](https://nodejs.org) (this also installs `npx`, which you'll use later)
- **VS Code** — [code.visualstudio.com](https://code.visualstudio.com), with the **Claude Code extension** installed from the VS Code Marketplace
- **A Figma account** with at least edit access to the project you want to work on
- The **Figma file URL** for your existing project (you'll need this in Step 6)

---

## Step 1 — Install Claude CLI

Open your terminal (PowerShell on Windows, Terminal on Mac) and run:

```bash
npm install -g @anthropic-ai/claude-code
```

Verify the installation:

```bash
claude --version
# Expected: a version number like 1.x.x
```

If `claude` is not recognized after install, close and reopen your terminal.

---

## Step 2 — Log In to Claude

Before anything else, authenticate with your Anthropic account. Run `claude` in the terminal — on first launch it will prompt you to log in:

```bash
claude
```

Follow the on-screen instructions to complete authentication (usually opens a browser). Once logged in, type `/exit` or press `Ctrl+C` to close the session and return to the terminal.

---

## Step 3 — Add the Figma MCP to Claude Code

From your terminal, run:

```bash
claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp
```

This registers the Figma MCP server in your Claude config file (it creates the file automatically if it doesn't exist yet). To open and edit that file, run:

```bash
code ~/.claude.json
```

> On Windows, `~/.claude.json` is located at `C:\Users\<your-username>\.claude.json`.

### Get your Figma Personal Access Token

1. Open Figma → click your **profile avatar** (top-left corner)
2. Go to **Settings → Security → Personal access tokens**
3. Click **Generate new token** → give it a name
4. When selecting scopes, enable at least **File content** (read access)
5. Copy the token

### Add the token to your Claude config

In the `~/.claude.json` file you just opened, find the `figma-remote-mcp` entry and add your token:

```json
"figma-remote-mcp": {
  "type": "http",
  "url": "https://mcp.figma.com/mcp",
  "headers": {
    "X-Figma-Token": "your_figma_token_here"
  }
}
```

Save the file.

> **Keep this file private.** Never share or commit `~/.claude.json` — it contains your Figma token.

---

## Step 4 — Set Up Your Local Project Folder

Create a dedicated folder for your project:

```bash
mkdir my-project
cd my-project
mkdir figma-export
```

Open this folder in VS Code. You can either:
- Run `code .` in the terminal (if VS Code CLI is set up), or
- Open VS Code → **File → Open Folder** → select `my-project`

Your folder structure should look like this:

```
my-project/
└── figma-export/       ← HTML mockups go here
```

---

## Step 5 — Authorize the Figma MCP in VS Code

1. With your project folder open in VS Code, open the **Claude Code panel** (look for the Claude icon in the sidebar or bottom bar)
2. You should see a notification or prompt asking you to **authorize** the Figma MCP connection — click to approve it
3. The Figma MCP tools will now be active inside the Claude Code chat

> If you don't see the authorization prompt, try restarting VS Code with the project folder open. If the Figma tools still don't appear in chat, check that the token in `~/.claude.json` is correct.

---

## Step 6 — Pull Design Context from Figma

Now you'll connect to your existing Figma project and read the design.

### Get the Figma file URL

Open your Figma project → right-click any frame or screen → **Copy link to selection**. The URL looks like:

```
https://www.figma.com/design/AbCdEfGhIjKl/My-App?node-id=1-23
```

The long alphanumeric string after `/design/` (e.g. `AbCdEfGhIjKl`) is the **file key** — Claude uses this to identify which Figma file to read.

### Ask Claude to read the design

In the Claude Code chat in VS Code, paste your Figma URL and say:

> "Use `get_design_context` and `get_screenshot` to read this Figma URL: [your URL]. Summarize the screens, colors, typography, and spacing used."

Claude will read the design and return a summary — colors, fonts, spacing, and component patterns.

> **Large files:** If the response seems incomplete or truncated, that's normal for big Figma files. Just ask Claude to read one screen at a time by providing the URL with the specific `node-id` for that frame.

**Save this summary** — you'll use it as reference when generating HTML mockups.

---

## Step 7 — Recreate Screens as Local HTML

With the design context in hand, ask Claude to generate an HTML mockup for each screen — one file per screen or flow.

### Ask Claude to generate an HTML mockup

In the Claude Code chat, say:

> "Based on the Figma design context you just read, create an HTML mockup for the [screen name] screen. Save it to `figma-export/screen-name.html`. Use the exact colors, fonts, and spacing from the Figma file."

Claude will generate an HTML file using the design tokens from your Figma file as CSS variables.

### The capture script must be in `<head>`

Every HTML file that will be pushed back to Figma must include this in the `<head>` tag:

```html
<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
```

Claude will add this automatically — but double-check it's there before capturing.

---

## Step 8 — Serve Locally and Iterate

### Start the local server

From your project folder, run:

```bash
npx serve ./figma-export -p 3333
```

Open your browser and go to:
```
http://localhost:3333/screen-name.html
```

> **Important:** Always use `http://localhost:3333` — `file://` URLs will not work with the Figma capture script.

### Iterate on the design

Ask Claude to make changes directly:

> "Update `figma-export/home.html` — change the header font size to 24px and make the card background cream instead of white."

Save and refresh `http://localhost:3333/home.html` to preview the changes.

### Push updates back to Figma

When you're happy with a screen, ask Claude to capture it:

> "Capture `http://localhost:3333/home.html` into the existing Figma file at [your Figma file URL]."

Claude will use the Figma MCP to push the HTML design into your Figma file and return the updated file URL.

> **Note:** Each capture creates a new frame in Figma. If you re-capture after making changes, a new frame is added — you can delete the old one manually in Figma.

---

## Daily Workflow (After Setup)

Once set up, your everyday loop is:

```
Open VS Code → open project folder
       ↓
(If Figma design changed) Ask Claude to re-read the updated screen
       ↓
Edit the HTML mockup (or ask Claude to edit)
       ↓
npx serve ./figma-export -p 3333
       ↓
Preview at localhost:3333
       ↓
Ask Claude to capture → Figma file updated
       ↓
Repeat for next screen
```

> You only need to re-read the Figma design context if the Figma file has changed since your last session. If you're iterating on existing local HTML files, you can skip the `get_design_context` step.

---

## Tips & Gotchas

| Issue | Fix |
|---|---|
| `claude` not recognized after install | Close and reopen your terminal, then retry |
| Figma MCP tools not showing in VS Code | Authorize the connection in the Claude Code panel, then restart VS Code |
| Capture stays `pending` forever | Make sure the capture script is in `<head>` (not `<body>`) and the local server is running at `http://localhost:3333` |
| `file://` URL doesn't work | Always serve via `npx serve` — the capture script requires HTTP |
| Re-capture creates a duplicate frame | This is expected — delete the old frame manually in Figma |
| Figma token not working | Regenerate the token in Figma Settings → Security and update `~/.claude.json` |
| Design context response is truncated | Ask Claude to read one screen at a time using the specific `node-id` from the URL |
| Can't find `~/.claude.json` on Windows | Open it with `code ~/.claude.json` in the terminal — it maps to `C:\Users\<username>\.claude.json` |

---

## File Reference

| What | Where |
|---|---|
| Claude config (with Figma token) | `~/.claude.json` — never share or commit this |
| HTML mockups | `my-project/figma-export/*.html` |
| Local preview server | `http://localhost:3333` |
