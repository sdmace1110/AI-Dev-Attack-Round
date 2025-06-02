# Attack Round Web App

This web application is a dark-mode, grid-based initiative tracker for tabletop role-playing games. It allows you to manage players and NPCs, track their initiative, and visually represent their status with interactive cards.

## Project Structure

```
ar/
├── index.html      # Main HTML file with three grid sections and control buttons.
├── style.css       # Dark mode CSS with grid/flex layouts and card/button styling.
├── script.js       # JavaScript for dynamic card rendering, modals, and interactivity.
└── README.md       # This documentation file.
```

## Getting Started

1. Download or clone this repository.
2. Open `index.html` in your web browser.

## Features

- **Dark Mode UI:** Modern, accessible color palette.
- **Grid Layout:** Three horizontal sections (Players, Controls, NPCs) using CSS Grid.
- **Dynamic Cards:** Players and NPCs are displayed as cards, sorted by initiative.
- **Add/Remove Functionality:**
  - Add new players or NPCs via modal forms.
  - Remove (hide) any card with a red "✕" button.
- **Initiative Tracker:**
  - "Begin Attack Round" button logs a composite, sorted initiative list to the console.
  - "Reset Attack Round" clears all players.
- **Customizable Bars:** Each card displays a colored bar (red-yellow-green) based on a value.
- **Responsive Controls:** All buttons are styled and aligned for usability.

## Usage

- **Add Player/NPC:** Click the respective button, fill out the modal, and add to the list.
- **Remove Card:** Click the red "✕" on any card to hide it.
- **Reset:** Click "Reset Attack Round" to clear all players.
- **View Initiative Order:** Click "Begin Attack Round" to log the full sorted list to the console.

## Future Enhancements

- Edit or restore hidden cards.
- Persist data between sessions.
- Additional fields or features for each card.

---

_Created for tabletop RPG initiative management with a focus on usability and style._
