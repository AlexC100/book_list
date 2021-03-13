class Book {
  constructor(title, author, category, section, isbn) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.section = section;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // Create the row element
    const row = document.createElement('tr');
    // Create inner td's
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.section}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    // Append row to list
    document.querySelector('#book-list').appendChild(row);
  }

  showAlert(message, className) {
    // Create div element
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Create text for alert
    div.appendChild(document.createTextNode(message));
    // Get parent element
    const container = document.querySelector('.container');
    // Get form element
    const form = document.querySelector('#book-form');
    // Insert div before firm
    container.insertBefore(div, form);

    // Timeout the alert after 3 seconds
    setTimeout(function() {
      console.log();
      document.querySelector('.alert').remove();
    }, 3000);
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#category').value = '';
    document.querySelector('#section').value = '';
    document.querySelector('#isbn').value = '';
  }

  removeBook(target) {
    if(target.className = 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getItem() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBookToLocalStorage(book) {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {

    const book = new Book(title, author, category, section, isbn);
    
    const ui = new UI();

    const books = Store.getItem();

    // ui.addBookToList(book);
    books.forEach(function(book) {
       ui.addBookToList(book);

    });

  }

  static removeBookFromLocalStorage(isbn) {
    const books = Store.getItem();
    books.forEach(function(book, index) {
        if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Add event listener on load
document.addEventListener('DOMContentLoaded', function(e) {

  const book = new Book(title, author, category, section, isbn);

  const ui = new UI();

  Store.displayBooks(book);

  e.preventDefault();
});

// Add event listener for submit
document.querySelector('#book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const category = document.querySelector('#category').value;
  const section = document.querySelector('#section').value;
  const isbn = document.querySelector('#isbn').value;

  // Instantiate Book
  const book = new Book(title, author, category, section, isbn);

  // Instantiate UI
  const ui = new UI();

  if(title === '' || author === '' || category === '' || section === '' || isbn === '') {
    ui.showAlert('Please fill in all fields!', 'error');
  } else {

  // Add book to list
  ui.addBookToList(book);

  Store.addBookToLocalStorage(book);

  // Show success alert
  ui.showAlert('Book Added Successfully!', 'success');

  // Clear input fields
  ui.clearFields();

  }
  e.preventDefault();
});

// Remove book event listener
document.querySelector('#book-list').addEventListener('click', function(e) {

  // Instantiate the ui
  const ui = new UI();

  // Remove book from the list
  ui.removeBook(e.target);

  console.log(e.target.parentElement.previousElementSibling.innerText)

  Store.removeBookFromLocalStorage(e.target.parentElement.previousElementSibling.innerText);

  // Show alert for removing book
  ui.showAlert('Book Successfully Removed', 'remove');

  e.preventDefault();
});