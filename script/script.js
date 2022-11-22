// form event listener
const formDOM = document.querySelector("#form");
formDOM.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary() ;
    });


// form consts
const titleDOM = document.getElementById("title");
const authorDOM = document.getElementById("author");
const pageDOM = document.getElementById("page");
const readDOM = document.getElementById("read");


// empty array which will be filled with book objects
let myLibrary = [];
console.log (myLibrary);


// constructor
function Book (title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${page} pages, Finished? -> ${read}`;
    };
    console.log (this.info());
}


// submit event function which adds the books to the array
function addBookToLibrary() {
    let title = titleDOM.value;
    let author = authorDOM.value;
    let page = pageDOM.value;
    let read = readDOM.checked;
    let newBook = new Book (title, author, page, read);
    myLibrary.push (newBook);
    console.log (myLibrary);
    displayArray(myLibrary.length - 1);
}


// display array function
const displayDOM = document.getElementById("display");

function displayArray(e) {

    displayDOM.innerHTML += `
    <div class="card flex content-center items-center flex-col">
        <span class="material-symbols-outlined pb-5">menu_book</span>
        <h5 class="bookTitle">${myLibrary[e].title}</h5>
        <p class="bookAuthor">${myLibrary[e].author}</p>
        <p class="bookAuthor">${myLibrary[e].page} pages</p>
        <div>
        <input type="checkbox" id="read" name="read" value="true">
        <label class="ml-1 text-sm font-medium text-gray-900" for="read"> Finished it? </label>
        </div>
    </div>
    `
};