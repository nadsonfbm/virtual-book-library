function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayLibrary() {
const bookTable = document.querySelector(".full-table");
bookTable.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        const bookTitle = document.createElement("h2");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = `By ${book.author}`;
        const bookPages = document.createElement("p");
        bookPages.classList.add("book-pages");
        bookPages.textContent = `${book.pages} pages`;
        const bookReadStatus = document.createElement("p");
        bookReadStatus.classList.add("book-read-status");
        bookReadStatus.textContent = book.read ? "Read" : "Not Read";
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookReadStatus);
        const bookButtons = document.createElement("div");
        bookButtons.classList.add("book-buttons");
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.textContent = book.read ? "Mark Unread" : "Mark Read";
        readButton.setAttribute("data-index", i);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", i);
        bookButtons.appendChild(readButton);
        bookButtons.appendChild(deleteButton);
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(bookButtons);
        bookTable.appendChild(bookCard);
    }
}

function addRandomBooksToLibrary(numBooks) {
    const titles = ["The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Catcher in the Rye", "Animal Farm", "Brave New World", "Lord of the Flies", "One Hundred Years of Solitude", "The Hobbit", "The Lord of the Rings", "Catch-22", "The Hitchhiker's Guide to the Galaxy", "Slaughterhouse-Five", "The Picture of Dorian Gray", "The Sun Also Rises", "The Bell Jar", "Invisible Man", "The Color Purple", "The Joy Luck Club", "The Handmaid's Tale", "The Hunger Games", "Harry Potter and the Philosopher's Stone", "The Da Vinci Code", "Angels and Demons", "The Girl with the Dragon Tattoo"];
    const authors = ["F. Scott Fitzgerald", "Harper Lee", "George Orwell", "Jane Austen", "J.D. Salinger", "George Orwell", "Aldous Huxley", "William Golding", "Gabriel Garcia Marquez", "J.R.R. Tolkien", "J.R.R. Tolkien", "Joseph Heller", "Douglas Adams", "Kurt Vonnegut", "Oscar Wilde", "Ernest Hemingway", "Sylvia Plath", "Ralph Ellison", "Alice Walker", "Amy Tan", "Margaret Atwood", "Suzanne Collins", "J.K. Rowling", "Dan Brown", "Dan Brown", "Stieg Larsson"];
    const pages = [180, 281, 328, 279, 277, 141, 311, 208, 417, 310, 1178, 453, 215, 215, 251, 251, 310, 288, 581, 288, 311, 374, 374, 454, 481, 489, 672];
    for (let i = 0; i < numBooks; i++) {
        const title = titles[Math.floor(Math.random() * titles.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];
        const numPages = pages[Math.floor(Math.random() * pages.length)];
        const read = Math.random() < 0.5 ? true : false;
        const book = new Book(title, author, numPages, read);
        addBookToLibrary(book);
    }
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

const newBookForm = document.querySelector("#new-book-form");
newBookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.querySelector("#title-input").value;
    const author = document.querySelector("#author-input").value;
    const pages = document.querySelector("#pages-input").value;
    const read = document.querySelector("#read-checkbox").checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayLibrary();
    newBookForm.style.display = "none";
});

const bookTable = document.querySelector(".full-table");
bookTable.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("read-button")) {
        const index = parseInt(target.getAttribute("data-index"));
        myLibrary[index].toggleReadStatus();
        displayLibrary();
    }

    if (target.classList.contains("delete-button")) {
        const index = parseInt(target.getAttribute("data-index"));
        myLibrary.splice(index, 1);
        displayLibrary();
    }
});

const newBookButton = document.querySelector(".new-book-btn");
newBookButton.addEventListener("click", function() {
    newBookForm.style.display = "block";
});


const closeFormButton = document.querySelector(".close-form");
closeFormButton.addEventListener("click", function() {
    newBookForm.style.display = "none";
});

displayLibrary();