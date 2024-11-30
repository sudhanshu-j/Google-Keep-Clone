// Define the main app class that will manage notes
class App {
  // The constructor initializes all the necessary data and binds events
  constructor() {
    // Retrieve stored notes from localStorage. If none are found, initialize an empty array.
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Initialize variables for note data (title, text, and id)
    this.title = "";
    this.text = "";
    this.id = "";

    // DOM element references for various parts of the UI (form, notes list, modal, tooltips, etc.)
    this.$placeholder = document.querySelector("#placeholder"); // Placeholder when there are no notes
    this.$form = document.querySelector("#form"); // The note creation form
    this.$notes = document.querySelector("#notes"); // The container for displaying notes
    this.$noteTitle = document.querySelector("#note-title"); // The title input field in the form
    this.$noteText = document.querySelector("#note-text"); // The text input field in the form
    this.$formButtons = document.querySelector("#form-buttons"); // The form's submit and cancel buttons
    this.$formCloseButton = document.querySelector("#form-close-button"); // The close button of the form
    this.$modal = document.querySelector(".modal"); // The modal dialog for editing a note
    this.$modalTitle = document.querySelector(".modal-title"); // The title input in the modal
    this.$modalText = document.querySelector(".modal-text"); // The text input in the modal
    this.$modalCloseButton = document.querySelector(".modal-close-button"); // The close button in the modal
    this.$colorTooltip = document.querySelector("#color-tooltip"); // Tooltip for selecting note color

    // Render the notes and set up event listeners once the app is initialized
    this.render();
    this.addEventListeners();
  }

  // Function to add event listeners to all interactive elements in the app
  addEventListeners() {
    // Listen for click events on the entire body of the page
    document.body.addEventListener("click", (event) => {
      // Handle clicks on the form to open/close it and add notes
      this.handleFormClick(event);
      // Handle selecting a note for editing
      this.selectNote(event);
      // Open the modal to edit the note when it's clicked
      this.openModal(event);
      // Handle note deletion when delete icon is clicked
      this.deleteNote(event);
    });

    // Listen for mouseover events to show the tooltip when hovering over color toolbar
    document.body.addEventListener("mouseover", (event) => {
      this.openTooltip(event);
    });

    // Listen for mouseout events to hide the tooltip when mouse leaves
    document.body.addEventListener("mouseout", (event) => {
      this.closeTooltip(event);
    });

    // Tooltip behavior: Show the tooltip when mouse hovers over it
    this.$colorTooltip.addEventListener("mouseover", function () {
      this.style.display = "flex"; // Make the tooltip visible
    });

    // Tooltip behavior: Hide the tooltip when mouse leaves it
    this.$colorTooltip.addEventListener("mouseout", function () {
      this.style.display = "none"; // Hide the tooltip
    });

    // Handle clicking on a color option from the tooltip
    this.$colorTooltip.addEventListener("click", (event) => {
      const color = event.target.dataset.color; // Get the selected color from the clicked element
      if (color) {
        this.editNoteColor(color); // Apply the selected color to the note
      }
    });

    // Handle form submission (create a new note)
    this.$form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form's default submission behavior
      const title = this.$noteTitle.value; // Get the title input value
      const text = this.$noteText.value; // Get the text input value
      const hasNote = title || text; // Check if there is content in the title or text

      // Only add a new note if there's content
      if (hasNote) {
        this.addNote({ title, text }); // Add the new note
      }
    });

    // Close the form when the close button is clicked
    this.$formCloseButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the event from bubbling up to parent elements
      this.closeForm(); // Close the form (clear fields and hide it)
    });

    // Close the modal when the modal close button is clicked
    this.$modalCloseButton.addEventListener("click", (event) => {
      this.closeModal(event);
    });
  }

  // Handle form interactions: open or close the form depending on click events
  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target); // Check if the click was inside the form

    const title = this.$noteTitle.value; // Get the current title input value
    const text = this.$noteText.value; // Get the current text input value
    const hasNote = title || text; // Check if there's content in either the title or text

    // Open the form if clicked inside the form
    if (isFormClicked) {
      this.openForm();
    }
    // If the form has content, add the note
    else if (hasNote) {
      this.addNote({ title, text });
    }
    // If there's no content, close the form
    else {
      this.closeForm();
    }
  }

  // Open the note creation form (make it visible and display the inputs)
  openForm() {
    this.$form.classList.add("form-open"); // Add 'form-open' class to display the form
    this.$noteTitle.style.display = "block"; // Show the title input field
    this.$formButtons.style.display = "block"; // Show form buttons (submit, close)
  }

  // Close the note creation form (hide the inputs and reset them)
  closeForm() {
    this.$form.classList.remove("form-open"); // Remove 'form-open' class to hide the form
    this.$noteTitle.style.display = "none"; // Hide the title input field
    this.$formButtons.style.display = "none"; // Hide form buttons
    this.$noteTitle.value = ""; // Reset the title input
    this.$noteText.value = ""; // Reset the text input
  }

  // Open the modal to edit a note's title and text
  openModal(event) {
    // Ignore if the clicked element is the delete button
    if (event.target.matches(".toolbar-delete")) return;

    // If a note is clicked, open the modal and fill it with the note's data
    if (event.target.closest(".note")) {
      this.$modal.classList.toggle("open-modal"); // Toggle the visibility of the modal
      this.$modalTitle.value = this.title; // Set the modal title to the selected note's title
      this.$modalText.value = this.text; // Set the modal text to the selected note's text
    }
  }

  // Close the modal after saving changes made to a note
  closeModal(event) {
    this.editNote(); // Save changes to the note
    this.$modal.classList.toggle("open-modal"); // Hide the modal
  }

  // Show the color tooltip when hovering over the color toolbar
  openTooltip(event) {
    // Only show the tooltip if the hovered element is a color toolbar
    if (!event.target.matches(".toolbar-color")) return;

    // Get the ID of the note from the color toolbar's sibling element
    this.id = event.target.nextElementSibling.dataset.id;

    // Get the coordinates of the toolbar to position the tooltip correctly
    const noteCoords = event.target.getBoundingClientRect();
    const horizontal = noteCoords.left + window.scrollX; // Calculate horizontal position of tooltip
    const vertical = noteCoords.top + window.scrollY; // Calculate vertical position of tooltip

    // Position the tooltip and make it visible
    this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.$colorTooltip.style.display = "flex";
  }

  // Hide the color tooltip when mouse leaves the color toolbar
  closeTooltip(event) {
    // If the hovered element is not the color toolbar, do nothing
    if (!event.target.matches(".toolbar-color")) return;
    this.$colorTooltip.style.display = "none"; // Hide the tooltip
  }

  // Add a new note to the notes array and render it
  addNote({ title, text }) {
    const newNote = {
      title, // Set title of the new note
      text, // Set text of the new note
      color: "white", // Set default color for the note
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1, // Generate a unique ID for the new note
    };
    this.notes = [...this.notes, newNote]; // Add the new note to the notes array
    this.render(); // Re-render the notes on the page
    this.closeForm(); // Close the form after adding the note
  }

  // Update a note's title and text based on the modal input
  editNote() {
    const title = this.$modalTitle.value; // Get the title from the modal input
    const text = this.$modalText.value; // Get the text from the modal input

    // Update the selected note with the new title and text
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, title, text } : note
    );
    this.render(); // Re-render the notes to reflect the changes
  }

  // Change the color of a note and re-render it
  editNoteColor(color) {
    // Update the color of the selected note
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, color } : note
    );
    this.render(); // Re-render the notes with updated color
  }

  // Select a note and store its data for editing or deletion
  selectNote(event) {
    const $selectedNote = event.target.closest(".note"); // Get the closest note element
    if (!$selectedNote) return; // If no note is selected, do nothing
    const [$noteTitle, $noteText] = $selectedNote.children; // Get the title and text of the note
    this.title = $noteTitle.innerText; // Store the note's title
    this.text = $noteText.innerText; // Store the note's text
    this.id = $selectedNote.dataset.id; // Store the note's ID
  }

  // Delete a note from the notes array and re-render the notes
  deleteNote(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    if (!event.target.matches(".toolbar-delete")) return; // Only proceed if the delete icon was clicked

    const id = event.target.dataset.id; // Get the ID of the note to be deleted
    this.notes = this.notes.filter((note) => note.id !== Number(id)); // Remove the note from the array
    this.render(); // Re-render the notes to reflect the deletion
  }

  // Render the notes and save them to localStorage
  render() {
    this.saveNotes(); // Save the updated notes to localStorage
    this.displayNotes(); // Display the updated notes in the UI
  }

  // Save the current notes array to localStorage so the data persists across page reloads
  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes)); // Convert notes to JSON and save
  }

  // Display the notes in the UI
  displayNotes() {
    const hasNotes = this.notes.length > 0; // Check if there are any notes to display
    this.$placeholder.style.display = hasNotes ? "none" : "flex"; // Hide the placeholder if there are notes

    // Dynamically render each note with its title, text, and toolbar (edit/delete options)
    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
        <div style="background: ${note.color};" class="note" data-id="${
          note.id
        }">
          <div class="${note.title && "note-title"}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" data-id=${
                note.id
              } src="/Icons/paint-palette.png">
              <img data-id=${
                note.id
              } class="toolbar-delete" src="/Icons/trash.png">
            </div>
          </div>
        </div>`
      )
      .join(""); // Join the note elements into a single string and insert into the notes container
  }
}

// Instantiate the App class to initialize and run the app
new App();
