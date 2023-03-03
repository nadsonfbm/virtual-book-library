// Get the necessary elements from the DOM
const addBookButton = document.querySelector('.new-book-btn');
const newBookForm = document.querySelector('.add-new-book-section');
const closeFormButton = document.querySelector('.close-form');
const bookCards = document.querySelectorAll('.book-card');

// Add an event listener to the "Add book" button to display the form
addBookButton.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

// Add an event listener to the "Close" button to hide the form
closeFormButton.addEventListener('click', () => {
  newBookForm.style.display = 'none';
});

// Add event listeners to the "Edit" and "Delete" buttons for each book card
bookCards.forEach((card) => {
  const editButton = card.querySelector('.edit-button');
  const deleteButton = card.querySelector('.delete-button');

  editButton.addEventListener('click', () => {
    // Add code to handle editing a book
    console.log('Editing book...');
  });

  deleteButton.addEventListener('click', () => {
    // Add code to handle deleting a book
    console.log('Deleting book...');
  });
});

// Add an event listener to the new book form to handle submitting a new book
const newBookFormElement = document.getElementById('new-book-form');

newBookFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Add code to handle submitting a new book
  console.log('Submitting new book...');
});

// Add event listener to theme selector
const themeSelector = document.querySelector('.theme-selector');
const mainContainer = document.querySelector('.main-container');
const headerNav = document.querySelector('.header-nav');
const footer = document.querySelector('footer');

themeSelector.addEventListener('change', (event) => {
  const selectedTheme = event.target.value;

  mainContainer.classList = `main-container ${selectedTheme}`;
  headerNav.classList = `header-nav ${selectedTheme}`;
  footer.classList = `footer ${selectedTheme}`;
});
