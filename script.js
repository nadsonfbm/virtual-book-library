// Book constructor
function Book(title, author, pages, language, pubDate, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.pubDate = pubDate;
  this.readStatus = readStatus;
}

// Library array to store book objects
let library = [
  new Book("One Hundred Years of Solitude", "Gabriel Garcia Marquez", 417, "Spanish", "May 30, 1967", false),
  new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 193, "English", "October 12, 1979", false),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, "English", "July 29, 1954", false)
];

// Function to add new book object to library array
function addBookToLibrary(book) {
  library.push(book);
}

// Function to loop through library array and display each book
function displayBooks() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  library.forEach((book, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.language}</td>
      <td>${book.pubDate}</td>
      <td>
        <label>
          <input type="checkbox" name="read-status" ${book.readStatus ? "checked" : ""} onclick="toggleReadStatus(${index})">
          <span class="slider round"></span>
        </label>
      </td>
      <td>
        <button class="edit" onclick="editBook(${index})">Edit</button>
      </td>
      <td>
        <button class="edit" onclick=\"deleteBook(${index})\">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
    updateLibraryLog();
  }
  
  // Function to toggle a book's read status
  function toggleReadStatus(index) {
    library[index].readStatus = !library[index].readStatus;
    displayBooks();
  }
  
  // Function to update the Library Log
  function updateLibraryLog() {
    const booksCount = document.getElementById("books_count");
    const readCount = document.getElementById("read_b_count");
    const notReadCount = document.getElementById("not_read_b_count");
    booksCount.textContent = library.length;
    readCount.textContent = library.filter(book => book.readStatus).length;
    notReadCount.textContent = library.filter(book => !book.readStatus).length;
  }
  
  // Function to show/hide the add new book form
  function toggleAddNewBookForm() {
    const addNewBookSection = document.querySelector(".add-new-book-section");
    addNewBookSection.classList.toggle("show");
  }
  
  // Function to clear the add new book form
  function clearAddNewBookForm() {
    const form = document.getElementById("new-book-form");
    form.reset();
    const errorMsgs = document.querySelectorAll(".err-msg");
    errorMsgs.forEach(msg => msg.style.display = "none");
  }
  
  // Function to add a new book to the library array
  function addNewBook() {
    const form = document.getElementById("new-book-form");
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const pages = form.elements["pages-count"].value;
    const language = form.elements["language"].value;
    const pubDate = form.elements["pub-date"].value;
    const readStatus = form.elements["status"].value === "true";
    const newBook = new Book(title, author, pages, language, pubDate, readStatus);
    library.push(newBook);
    toggleAddNewBookForm();
    clearAddNewBookForm();
    displayBooks();
  }
  
  // Add event listeners
  document.addEventListener("DOMContentLoaded", displayBooks);
  
  const orderSelect = document.getElementById("order-by");
  const orderOption = document.getElementById("order");
  orderSelect.addEventListener("change", displayBooks);
  orderOption.addEventListener("change", displayBooks);
  
  const addNewBookBtn = document.querySelector(".new-book-btn");
  addNewBookBtn.addEventListener("click", toggleAddNewBookForm);
  
  const closeFormBtn = document.querySelector(".close-form");
  closeFormBtn.addEventListener("click", toggleAddNewBookForm);
  
  const addBookForm = document.getElementById("new-book-form");
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewBook();
  });
  
  const tableBody = document.querySelector("tbody");
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-read-status")) {
      const index = event.target.getAttribute("data-index");
      toggleReadStatus(index);
    } else if (event.target.classList.contains("delete")) {
      const index = event.target.getAttribute("data-index");
      deleteBook(index);
    } else if (event.target.classList.contains("edit")) {
      const index = event.target.getAttribute("data-index");
      editBook(index);
    } else if (event.target.classList.contains("ok")) {
      const index = event.target.getAttribute("data-index");
      updateBook(index);
    }
  });
  
  // Add some sample books
const book1 = new Book("The Catcher in the Rye", "J.D. Salinger", 277, "English", "July 16, 1951", false);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, "English", "July 11, 1960", true);
const book3 = new Book("Pride and Prejudice", "Jane Austen", 279, "English", "January 28, 1813", false);
const book4 = new Book("The Alchemist", "Paulo Coelho", 197, "Portuguese", "1988", true);
const book5 = new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, "English", "June 20, 1890", false);
const book6 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, "English", "April 10, 1925", true);
const book7 = new Book("The Hobbit", "J.R.R. Tolkien", 310, "English", "September 21, 1937", false);
const book8 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, "English", "July 29, 1954", false);

// Display initial books
displayBooks();