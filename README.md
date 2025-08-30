# File Manager

A modern, lightweight file management application built with React and TypeScript. This project provides an intuitive interface for organizing and managing files and folders in a tree-like structure.

## Features

- **File & Folder Management**: Create, edit, and delete files and folders
- **Tree Structure**: Hierarchical organization with expandable/collapsible nodes
- **File Extensions**: Support for common file types (txt, md, js, ts, jsx, tsx, pdf, png, jpg, jpeg, mp3, mp4)
- **Local Storage**: Persistent data storage using browser's local storage
- **TypeScript**: Full type safety and better development experience

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS modules
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Utilities**: UUID for unique identifiers

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd file-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Creating Files and Folders
- Right-click on any folder to add new files or subfolders
- Choose from supported file extensions when creating files
- Files and folders are automatically organized in the tree structure

### Managing Content
- **Edit**: Click the edit icon to rename files or folders
- **Delete**: Click the delete icon to remove items
- **Folder Deletion**: Requires confirmation for folders containing files

### Navigation
- Expand/collapse folders by clicking on the folder icon
- Navigate through the hierarchical structure
- View file types with appropriate icons

## Project Structure

```
src/
├── components/          # React components
│   ├── file-container/ # Main file management container
│   ├── file-item/      # Individual file/folder display
│   ├── node-dialog/    # Create/edit dialogs
│   ├── node-tree/      # Tree structure component
│   └── confirmation-dialog/ # Delete confirmation
├── context/            # React context for state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and SCSS modules
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with modern React patterns and best practices
- Inspired by traditional file managers with a focus on simplicity and usability
