// form event listener
const formDOM = document.querySelector("#form");
formDOM.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    removeFromArray();
});


// form consts
const titleDOM = document.getElementById("title");
const authorDOM = document.getElementById("author");
const pageDOM = document.getElementById("page");
const readDOM = document.getElementById("read");


// empty array which will be filled with book objects
let myLibrary = [];


// book class
class Book {
    constructor(title, author, page, read) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
        this.uniqueID = Date.now();
    }
    info = () => {
        return `${this.title} by ${this.author}, ${this.page} pages, Finished? -> ${this.read}`;
    }
};


// submit event function which adds the books to the array
function addBookToLibrary() {
    let title = titleDOM.value;
    let author = authorDOM.value;
    let page = pageDOM.value;
    let read = readDOM.checked;
    let newBook = new Book (title, author, page, read);
    console.log(newBook.info());
    myLibrary.push (newBook);
    displayArray();
    clearForm();
    defaultModalDOM.classList.add("hidden");
};


// creates DOM cards with innerHTML
const displayDOM = document.getElementById("display");

function displayArray() {
    displayDOM.innerHTML = "";
    for (let book of myLibrary) {
        displayDOM.innerHTML += `
            <div class="card flex content-center items-center flex-col">
                <span class="material-symbols-outlined pb-5">menu_book</span>
                <h5 class="bookTitle">${book.title}</h5>
                <p class="bookAuthor">${book.author}</p>
                <p class="bookAuthor">${book.page} pages</p>
                <div>
                    <input type="checkbox" id="read" name="read" value="true" ${book.read ? 'checked' : 'unchecked'}>
                    <label class="ml-1 text-sm text-gray-900" for="read"> Finished it? </label>
                </div>
                <button class="btn-remove" id="${book.uniqueID}">Remove</button>
            </div>
            `
    }
};


// remove array function with eventListeners of created buttons
function removeFromArray() {
    const removeButtons = displayDOM.querySelectorAll("button");
    removeButtons.forEach(button => button.addEventListener('click', event => {
        let index = myLibrary.findIndex(book => book.uniqueID == event.target.id); // finds the index of matched id
        myLibrary.splice(index, 1); // deletes from array
        displayArray(); // refreshes the display
        return removeFromArray(); // returns itself so it continues to listen the events after removing one item.
    }))
};


// clear function
function clearForm() {
    titleDOM.value = "";
    authorDOM.value = "";
    pageDOM.value = "";
    readDOM.checked = "";
};


// modal settings
const openModalDOM = document.getElementById('openModal');
const closeModalDOM = document.getElementById('closeModal');
const defaultModalDOM = document.getElementById('defaultModal');

openModalDOM.onclick = () => {
    defaultModalDOM.classList.remove("hidden");
};

closeModalDOM.onclick = () => {
    defaultModalDOM.classList.add("hidden");
};