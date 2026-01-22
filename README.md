## Kanban Desktop App

### Project Overview
We aim to build a Kanban workflow board implemented either as a web application or a desktop application. This document specifies the core requirements and outlines the application architecture. As development progresses, a more rigid specification will be defined after a final platform decision is made.

### Core Requirements
- User accounts  
- Create and delete boards  
- Add, edit, and delete columns  
- Add, edit, and delete cards  
- Move cards between columns  
- Persist data in a SQL database (SQLite3)

## Technologies

### Stack
- **TypeScript Desktop UI + Python Backend API**

### Desktop UI
- **Electron** — Desktop application shell  
- **React** — UI components  
- **TypeScript** — Language  
- **Vite** — Development server and build tooling  

### Backend
- **Python FastAPI** — Backend REST API  
- **Uvicorn** — Server to run FastAPI  

### Database
- **SQLite3** — Simple persistent database for the backend  

### Communication
- **Local HTTP/JSON** communication between the Electron UI and FastAPI  
  (`127.0.0.1:<port>`)



