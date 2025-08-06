# Notes Manager Nuxt Frontend

A modern, minimal, light-themed frontend for creating, editing, and managing notes.

## Features

- List, create, edit, and delete notes (CRUD).
- Modern, minimal, mobile-friendly UI using Nuxt 3 and Vue 3.
- Layout with header, sidebar navigation, and main display area.
- Light theme; colors: Primary `#2196F3`, Secondary `#757575`, Accent `#FFEB3B`.
- All note UI actions use API calls (API base configurable).

## Folder Structure

- `components/` - Shared UI components (HeaderBar, SidebarNav, NoteForm, DeleteConfirmModal)
- `composables/useNotes.ts` - Notes API composable for CRUD functions
- `pages/` - Main app pages:
  - `/` - List all notes
  - `/new` - Create a note
  - `/edit/[id]` - Edit a note

## Setup

```bash
# Install dependencies
npm install

# Start Dev Server
npm run dev
```

App runs at `http://localhost:3000`.

## Configuration

The API endpoint can be set via the env variable:

```bash
NUXT_PUBLIC_API_BASE="http://localhost:8000/api"
```

If not set, defaults to `/api`.

## Styling

- Layout: Header and sidebar, responsive
- Colors: 
  - Primary: #2196F3
  - Secondary: #757575
  - Accent: #FFEB3B
- Font: Inter, Segoe UI, Arial

## Icons

[Google Material Symbols](https://fonts.google.com/icons) are used via CDN.

## Production Build

```bash
npm run build
npm run preview
```

## License

MIT
