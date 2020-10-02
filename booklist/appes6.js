class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>

    `;
    bookList.appendChild(row);
  }

  showAlert(msg, className) {
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const divAlert = document.createElement('div');
    divAlert.appendChild(document.createTextNode(msg));
    divAlert.className = `alert ${className}`;
    container.insertBefore(divAlert, form);
    
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      Store.deleteBook(target.parentElement.previousElementSibling.textContent);
      target.parentElement.parentElement.remove();
      this.showAlert('Delete book successfully', 'success');
    }
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  validate(book) {
    if (book.title === '' || book.author === '' || book.isbn === '') {
      this.showAlert('Please fill field', 'error');

      return false;
    }

    return true;
  }
}

class Store {
  static addBook(book) {
    let books;

    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    } else {
      books = [];
    }
    
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  static displayBook() {
    let books;

    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
      
      const bookList = document.querySelector('#book-list');
      const ui = new UI();

      books.forEach((book, index) => {
        ui.addBookToList(book);
      })
    }
  }

  static deleteBook(isbn) {
    let books;

    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
      
      books.forEach(book => {
        if (book.isbn == isbn && books.indexOf(book) > -1) {
          books.splice(books.indexOf(book), 1);
        }
      })

      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}


document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (ui.validate(book)) {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.clearFields();
    ui.showAlert('Add book successfully!', 'success');
  }

  e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
})

document.addEventListener('DOMContentLoaded', function(e) {
  Store.displayBook();
})