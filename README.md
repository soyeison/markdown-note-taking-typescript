# Simple Note-Taking App

## Project Overview

This is a simple note-taking application that allows users to upload Markdown files, check the grammar of the notes, save them, and render the notes in HTML format. The goal of this project is to provide an easy way to manage notes while also learning key concepts such as:

- Handling file uploads in a RESTful API.
- Parsing and rendering Markdown files using libraries.
- Checking the grammar of notes to improve text quality.

## Features

- **Upload Markdown files**: Users can upload their note files in Markdown format (.md).
- **Grammar Check**: The app checks the grammar of the uploaded Markdown files to ensure better quality content.
- **Render Markdown to HTML**: After processing, the Markdown content is rendered into readable HTML format for easy viewing.
- **Save Notes**: Users can save their notes for later viewing or editing.

## Tech Stack

- **Backend**: Typescript, Express
- **File Upload Handling**: Multer
- **Markdown Parsing**: Marked
- **Grammar Checking**: A grammar-checking API (LanguageTool)
- **HTML Rendering**: Marked (for Markdown to HTML conversion)

## Getting Started

### Prerequisites

To run this project, you'll need to have the following installed:

- Node.js V 20.17.0
- npm (Node package manager)
- Docker

### Installation

1. Clone the repository:

```bash
git clone https://github.com/soyeison/note-taking-app.git
```

2. Execute:

```bash
docker-compose up -d
```

To execute languageTool container.

# Project Idea

This project is one of begginner projects in Roadmap.sh: https://roadmap.sh/projects/markdown-note-taking-app
