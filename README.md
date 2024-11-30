# 📝 Google Keep Clone

This is a simple **Google Keep Clone** built using **HTML**, **CSS**, and **JavaScript**. It allows users to create, edit, delete, and view notes with a simple interface inspired by Google Keep. This project also demonstrates how to use **localStorage** to persist the notes across sessions.

## ✨ Features

- **Create Notes**: Easily create notes with a title and text. ✍️

- **Edit Notes**: Open a modal to edit the title or text of a note. ✏️

- **Delete Notes**: Remove notes with the trash icon. 🗑️

- **Color Customization**: Change the background color of each note via a tooltip. 🎨

- **Responsive Design**: Works well on both desktop and mobile devices. 📱💻

- **Persistence**: Notes are saved using **localStorage**, meaning they persist across page reloads. 🔒

## 🌐 Demo

You can view the demo of the project here:

[Live Demo](https://keep-clonee.netlify.app/)

## 🛠️ Technologies Used

- **HTML**: Used for the structure of the application (form, notes, modal, etc.). 📄

- **CSS**: Styled the application, including responsive design, note styling, and modal interactions. 🎨

- **JavaScript**: Handled the app's functionality, such as adding, editing, and deleting notes, and managing state via **localStorage**. ⚙️

## 📂 Project Structure

### 1. **`index.html`**

The `index.html` file is the main structure of the app. It includes:

- **Notes Section**: A container that dynamically displays the created notes. 📋

- **Form**: A form for creating new notes with title and content fields. 📝

- **Modal**: A modal that allows users to edit the title and content of a note. ✏️

- **Tooltip**: A hidden tooltip that appears when hovering over a color icon to change the background color of the notes. 🎨

Here’s the general layout:

- **Notes Container** (`#notes`): Holds all the notes created. 🗂️

- **Form** (`#form`): Contains inputs for creating a new note. ✍️

- **Modal**: Used for editing a note. 🔄

- **Tooltip**: Allows the user to change note colors. 🎨

### 2. **`style.css`**

The `style.css` file is responsible for the design and layout of the app. Here’s a summary of the main styles:

- **Responsive Layout**: The app is centered on the page and adapts to different screen sizes (mobile and desktop). 📱💻

- **Notes Styling**: Each note has a white background with rounded corners, subtle shadow effects, and interactivity with the `cursor: pointer` style. 💡

- **Form Styling**: The form inputs (title and content) are styled with padding, borders, and rounded corners. The form is hidden by default and only shown when a user clicks to add a note. 🖊️

- **Modal**: The modal is fixed in the center of the screen and allows users to edit a note. The modal is hidden by default. 📏

- **Tooltip**: The tooltip is hidden by default and appears near the color icon when hovered, providing a set of color options. 🎨

### 3. **`script.js`**

The `script.js` file handles the logic and functionality of the app. Here's a breakdown:

- **Notes Management**: The script allows users to add, edit, and delete notes. It manages the `notes` array, where each note has an `id`, `title`, `text`, and `color`. 📝

- **localStorage**: The app uses `localStorage` to store and retrieve the notes, ensuring that the notes persist even after the page is refreshed. 💾

- **Event Listeners**:

  - **Click** events to open the form, select a note, open the modal, and delete a note. 🖱️

  - **Hover** events to show and hide the color tooltip for changing note background color. 🖌️

  - **Submit** event to add new notes when the form is submitted. 📤

  - **Edit and Delete**: Notes can be edited and deleted using buttons in the modal and toolbar. ✏️🗑️

### Key Methods in `script.js`:

- **`addNote()`**: Adds a new note to the list and stores it in `localStorage`. 📝

- **`editNote()`**: Edits the selected note's title and text. ✏️

- **`deleteNote()`**: Deletes the selected note. 🗑️

- **`editNoteColor()`**: Allows the user to change the background color of a note. 🎨

- **`render()`**: Updates the UI to reflect changes in the notes. 🔄

- **`saveNotes()`**: Saves the notes to `localStorage`. 💾

- **`displayNotes()`**: Renders all notes dynamically in the UI. 🌟

## 🚀 How to Use

### 1. **Clone this repository to your local machine using:**

```bash
git clone https://github.com/your-username/google-keep-clone.git
```

2. **Open the index.html file in your browser to start using the app.**

## Creating a Note

1. Click anywhere on the screen to open the form. 🖱️

2. Enter a title and content, then click **"Add Note"**. 📝

## Editing a Note

1. Click on the note to open the edit modal. 🖱️

2. Make changes to the title and/or content, then click **"Close"**. ✏️

## Deleting a Note

- Click the trash icon on the note's toolbar to remove it. 🗑️

## Changing the Note Color

1. Hover over the color icon on the note's toolbar. 🎨

2. Select the desired color from the tooltip. 🌈

## 🛠️ Development

### 🔧 Prerequisites

- **Text Editor**: Any code editor (e.g., VSCode, Sublime Text). ✍️

- **Browser**: Chrome, Firefox, or any modern browser to view the app. 🌍

### 🚀 Running the Project

1. After cloning the repo, simply open the `index.html` file in your browser to view the project. 🖥️

2. If you want to modify or improve the code:

   - Edit the HTML, CSS, or JavaScript files directly. ✍️

   - For a more robust development setup, consider setting up a local development server like **Live Server** in VSCode for live reloading. 🔄

## 🤝 Contributions

Feel free to fork this project and submit pull requests if you want to improve it.

### Steps to Contribute

1. **Fork the repository.**

2. **Create a new branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make changes and commit them:**
   ```bash
   git commit -am 'Add new feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-branch
   ```
5. **Submit a pull request.** 🔄

## 📝 Acknowledgements

- **Google Keep**: Inspired by the design and functionality of the Google Keep app. 🌟

- **LocalStorage**: Used to store data in the browser for persistent storage. 💾

- **CSS Flexbox and Grid**: Used for responsive layout and styling of the app. 🎨
