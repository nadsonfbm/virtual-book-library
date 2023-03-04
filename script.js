class Book {
    constructor(title, author, pages, language, pubDate, readStatus) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.language = language;
      this.pubDate = pubDate;
      this.readStatus = readStatus;
      this.insertionDate = new Date();
    }

    toggleReadStatus() {
      this.readStatus = !this.readStatus;
      updateReadCounts();
    }
  }

const library = [];

const orderBySelect = document.getElementById("order-by");
orderBySelect.addEventListener("change", handleSortBooks);

const orderSelect = document.getElementById("order");
orderSelect.addEventListener("change", handleSortBooks);

function handleSortBooks() {
    const orderBy = orderBySelect.value;
    const order = orderSelect.value;
  
    if (orderBy === "insertion-date") {
        if (order === "ascending") {
            library.sort((a, b) => a.insertionDate - b.insertionDate);
        } else {
            library.sort((a, b) => b.insertionDate - a.insertionDate);
        }
    } else if (orderBy === "publishing-date") {
        if (order === "ascending") {
            library.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
        } else {
            library.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        }
    } else if (orderBy === "title") {
        if (order === "ascending") {
            library.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            library.sort((a, b) => b.title.localeCompare(a.title));
        }
    } else if (orderBy === "author") {
        if (order === "ascending") {
            library.sort((a, b) => a.author.localeCompare(b.author));
        } else {
            library.sort((a, b) => b.author.localeCompare(a.author));
        }
    } else if (orderBy === "pages") {
        if (order === "ascending") {
            library.sort((a, b) => a.pages - b.pages);
        } else {
            library.sort((a, b) => b.pages - a.pages);
        }
    } else if (orderBy === "language") {
        if (order === "ascending") {
            library.sort((a, b) => a.language.localeCompare(b.language));
        } else {
            library.sort((a, b) => b.language.localeCompare(a.language));
        }
    }
    displayBooks();
}

function addBookToLibrary(title, author, pages, language, pubDate, readStatus) {
    const book = new Book(title, author, pages, language, pubDate, readStatus);
    library.push(book);
    displayBooks();
    updateReadCounts();
    localStorage.setItem("library", JSON.stringify(library));
}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "English", "July 11, 1960", true);
addBookToLibrary("1984", "George Orwell", 328, "English", "June 8, 1949", false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, "English", "July 16, 1951", false);
addBookToLibrary("One Hundred Years of Solitude", "Gabriel Garcia Marquez", 417, "Spanish", "May 30, 1967", false),
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 193, "English", "October 12, 1979", false),
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, "English", "July 29, 1954", true),
addBookToLibrary("Dune", "Frank Herbert", 604, "English", "August 1, 1965", false),
addBookToLibrary("Foundation", "Isaac Asimov", 244, "English", "May 1, 1951", false),
addBookToLibrary("Ender's Game", "Orson Scott Card", 324, "English", "January 15, 1985", true),
addBookToLibrary("Jurassic Park", "Michael Crichton", 448, "English", "November 20, 1990", false),
addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, "English", "September 14, 2008", true),
addBookToLibrary("Ready Player One", "Ernest Cline", 374, "English", "August 16, 2011", false),
addBookToLibrary("The War of the Worlds", "H.G. Wells", 192, "English", "April 1898", false),
addBookToLibrary("Brave New World", "Aldous Huxley", 288, "English", "1932", false),
addBookToLibrary("The Time Machine", "H.G. Wells", 118, "English", "1895", false),
addBookToLibrary("The Island of Dr. Moreau", "H.G. Wells", 133, "English", "1896", false),
addBookToLibrary("The Invisible Man", "H.G. Wells", 138, "English", "1897", false),
addBookToLibrary("The War in the Air", "H.G. Wells", 260, "English", "1908", false),
addBookToLibrary("The First Men in the Moon", "H.G. Wells", 208, "English", "1901", false)

function displayBooks() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
  
    let readCount = 0;
    let notReadCount = 0;

    tableBody.addEventListener("click", (event) => {
        console.log("Slider clicked");
        const target = event.target;
        if (target.classList.contains("slider")) {
            const index = target.closest("tr").getAttribute("data-index");
            const book = library[index];
            book.toggleReadStatus();
        }
    });
  
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        const row = document.createElement("tr");
        row.setAttribute("data-index", i);
        const readStatusCell = document.createElement("td");
        const sliderLabel = document.createElement("label");
        sliderLabel.classList.add("switch");
        const readStatusSlider = document.createElement("input");
        readStatusSlider.type = "checkbox";
        readStatusSlider.checked = book.readStatus;
        const sliderSpan = document.createElement("span");
        sliderSpan.classList.add("slider", "round");
        sliderLabel.appendChild(readStatusSlider);
        sliderLabel.appendChild(sliderSpan);
        readStatusCell.appendChild(sliderLabel);
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.language}</td>
            <td>${book.pubDate}</td>
        `;
        row.appendChild(readStatusCell);
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => {
            handleEditBook(i);
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            handleDeleteBook(i);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
        if (book.readStatus) {
            readCount++;
        } else {
            notReadCount++;
        }
    }
    const booksCount = document.getElementById("books_count");
    const readBooksCount = document.getElementById("read_b_count");
    const notReadBooksCount = document.getElementById("not_read_b_count");
    booksCount.textContent = library.length;
    readBooksCount.textContent = readCount;
    notReadBooksCount.textContent = notReadCount;
}

const formContainer = document.querySelector(".add-new-book-section");
const form = formContainer.querySelector("#new-book-form");
const formTitle = formContainer.querySelector(".form-title");

function handleEditBook(index) {
    const book = library[index];
  
    const formContainer = document.querySelector(".add-new-book-section");
    const formTitle = formContainer.querySelector(".form-title");
    const form = formContainer.querySelector("#new-book-form");
    formTitle.textContent = "Edit Book";
    form.classList.add("edit-mode");
    form.setAttribute("data-index", index);
  
    const titleInput = form.querySelector("#book-title");
    const authorInput = form.querySelector("#book-author");
    const pagesInput = form.querySelector("#number-of-pages");
    const languageInput = form.querySelector("#book-language");
    const pubDateInput = form.querySelector("#book-pub-date");
    const readStatusInput = form.querySelector("#book-read-status");
    titleInput.value = book.title;
    authorInput.value = book.author;
    pagesInput.value = book.pages;
    languageInput.value = book.language;
    pubDateInput.value = book.pubDate;
    readStatusInput.value = book.readStatus ? "true" : "false";
  
    formContainer.style.display = "block";
}

const submitButton = document.querySelector(".add-book-button");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleAddNewBook();
});

displayBooks();

function showAddBookForm() {
    const addBookSection = document.querySelector(".add-new-book-section");
    addBookSection.style.display = "flex";
}

function hideAddBookForm() {
    const addBookSection = document.querySelector(".add-new-book-section");
    addBookSection.style.display = "none";
}

const newBookButton = document.querySelector(".new-book-btn");
newBookButton.addEventListener("click", showAddBookForm);

const closeFormButton = document.querySelector(".close-form");
closeFormButton.addEventListener("click", hideAddBookForm);

function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#number-of-pages").value;
    const language = document.querySelector("#book-language").value;
    const pubDate = document.querySelector("#book-pub-date").value;
    const readStatus = document.querySelector("#book-read-status").checked;
    addBookToLibrary(title, author, pages, language, pubDate, readStatus);
    event.target.reset();
}

const addBookForm = document.querySelector("#new-book-form");
addBookForm.addEventListener("submit", handleFormSubmit);

function deleteBook(event) {
    const index = event.target.closest("tr").dataset.index;
    library.splice(index, 1);
    displayBooks();
}

function handleTableClick(event) {
    if (event.target.classList.contains("delete")) {
        deleteBook(event);
    }
}

const addBookButton = document.querySelector(".add-book-btn");
addBookButton.addEventListener("click", showAddBookForm);

const bookTable = document.querySelector("table");
bookTable.addEventListener("click", handleTableClick);

function toggleTheme(theme) {
    const body = document.querySelector("body");
    body.className = "";
    body.classList.add(theme);
}

const themeSelector = document.querySelector(".theme-selector");
themeSelector.addEventListener("change", (event) => {
    toggleTheme(event.target.value);
});

function updateReadCounts() {
    let readCount = 0;
    let notReadCount = 0;
  
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        if (book.readStatus) {
            readCount++;
        } else {
            notReadCount++;
        }
    }
  
    const booksCount = document.getElementById("books_count");
    const readBooksCount = document.getElementById("read_b_count");
    const notReadBooksCount = document.getElementById("not_read_b_count");
  
    booksCount.textContent = library.length;
    readBooksCount.textContent = readCount;
    notReadBooksCount.textContent = notReadCount;
    
    const body = document.querySelector("body");
    if (readCount === 0) {
        body.classList.add("no-books-read");
    } else {
        body.classList.remove("no-books-read");
    }
}

displayBooks();

function handleAddNewBook() {
  const form = document.getElementById("new-book-form");
  const title = form.elements["book-title"].value;
  const author = form.elements["book-author"].value;
  const pages = form.elements["number-of-pages"].value;
  const language = form.elements["book-language"].value;
  const pubDate = form.elements["book-pub-date"].value;
  const readStatus = form.elements["book-read-status"].checked;
  
  const editMode = form.classList.contains("edit-mode");
  if (editMode) {
    const index = form.getAttribute("data-index");
    const book = library[index];
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.language = language;
    book.pubDate = pubDate;
    book.readStatus = readStatus;
  } else {
    addBookToLibrary(title, author, pages, language, pubDate, readStatus);
  }
  
  form.reset();
  form.classList.remove("edit-mode");
  form.removeAttribute("data-index");
  formContainer.style.display = "none";
  displayBooks();
}

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("click", hideAddBookForm);

