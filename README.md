# KanFLOW - Kanban Desktop App

A desktop Kanban board application built with Electron, React, and TypeScript.

## Features
- User account management
- Create and delete boards
- Add, edit, and delete columns
- Add, edit, and delete cards
- Move cards between columns
- Local SQLite database for data persistence

## Technologies

### Frontend
- **Electron** — Desktop application framework
- **React** — UI component library
- **TypeScript** — Type-safe JavaScript
- **Vite** — Build tool and dev server

### Database
- **SQLite3** — Embedded SQL database (via better-sqlite3)

## Project Structure
```
src/
├── main/               # Electron main process (Node.js environment)
│   ├── main.ts         # Application entry point, window management
│   ├── database.ts     # SQLite database operations
│   └── ipc-handlers.ts # IPC message handlers
│
├── renderer/           # React UI (Browser environment)
│   ├── App.tsx         # Root React component
│   ├── components/     # Board, Column, Card components
│   └── index.html      # HTML entry point
│
└── preload/            # Security bridge
    └── preload.ts      # Exposes safe IPC APIs to renderer
```

## Architecture

The app uses Electron's multi-process architecture with IPC communication:
```
React UI (renderer process)
        ↓ IPC
Electron Main Process
        ↓
SQLite Database
        ↑
Electron Main Process
        ↑ IPC
React UI (renderer process)
```

## GitHub Management

We are working in this repo as a team and will follow a structured workflow for managing our work.

### TLDR
Each feature will need to be developed and commited on its own branch before we merge it, via pull request, into `main`.

### Branch Protection
The `main` branch is protected with the following rules:
- All changes must be made through pull requests
- Direct pushes to `main` are not allowed (even for admins)

### Workflow
1. **Create a feature branch** for each task/feature
```bash
   git checkout main
   git pull
   git checkout -b feature-name
```

2. **Make your changes** and commit regularly
```bash
   git add .
   git commit -m "Descriptive message"
```

3. **Push your branch** to GitHub
```bash
   git push origin feature-name
```

4. **Create a pull request**
```bash
   gh pr create
```
   Or use the GitHub web interface

5. **Code review** - Team members review the PR

6. **Merge** - Once approved, merge the PR into `main`

### Resources
See `/prof-instructions` for additional guidelines from course materials.

## Getting Started

[Installation and development instructions to be added]


