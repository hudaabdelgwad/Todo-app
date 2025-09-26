# Todo App
This is a feature-rich Todo application built with React. It provides a clean and modern interface for managing your daily tasks. The app supports adding, deleting, filtering, and reordering tasks, and includes a theme switcher for light and dark modes. User data, including tasks and theme preference, is persisted in the browser's local storage.

## Features

- **Create Todos**: Add new tasks to your list.
- **Mark as Complete**: Toggle the completion status of each task.
- **Delete Todos**: Remove tasks from the list with a confirmation dialog.
- **Filter Tasks**: View all tasks, only active tasks, or only completed tasks.
- **Clear Completed**: A single button to remove all completed tasks.
- **Drag and Drop**: Reorder tasks by dragging and dropping them.
- **Light/Dark Mode**: Switch between a light and a dark theme for visual comfort.
- **Responsive Design**: The application is fully responsive and works on both desktop and mobile devices.
- **Local Storage Persistence**: Your todos and theme preference are saved in your browser, so they persist across sessions.

## Tech Stack

- **Frontend**: React.js
- **State Management**: React Context API
- **Styling**: Tailwind CSS, Material-UI
- **Drag & Drop**: `@hello-pangea/dnd`
- **Icons**: Material-UI Icons, Font Awesome

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/hudaabdelgwad/todo-app.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd todo-app
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance. Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
