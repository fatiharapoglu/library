import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// empty array which will be filled with book objects
let myLibrary = [];

// firebase
let statusState; // true or false based on logged in or out

const firebaseConfig = {
    apiKey: "AIzaSyCiXcNl8XwAPCOk1C833nt1aVdc4ZiJdT4",
    authDomain: "library-68253.firebaseapp.com",
    projectId: "library-68253",
    storageBucket: "library-68253.appspot.com",
    messagingSenderId: "999698004532",
    appId: "1:999698004532:web:c64c709dcfe8670e71a861",
};
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
};

const signOutUser = () => {
    signOut(auth);
};

const getPP = () => {
    const photoURL = auth.currentUser.photoURL;
    const html = `
        <img
            id="google-pp-image"
            class="w-10 h-10 rounded-full"
            src=${photoURL}
            alt="Rounded avatar"
        />
    `;
    return html;
};

const signInWithGoogleDOM = document.getElementById("google-login");
const signOutDOM = document.getElementById("google-logout");
const ppGoogleDOM = document.getElementById("google-pp");
signInWithGoogleDOM.addEventListener("click", signInWithGoogle);
signOutDOM.addEventListener("click", signOutUser);

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        statusState = true;
        signInWithGoogleDOM.classList.add("hidden");
        signOutDOM.classList.remove("hidden");
        ppGoogleDOM.innerHTML = getPP();
        ppGoogleDOM.classList.remove("hidden");
        console.log("logged in");
        resetDisplay();
    } else {
        statusState = false;
        signInWithGoogleDOM.classList.remove("hidden");
        signOutDOM.classList.add("hidden");
        ppGoogleDOM.classList.add("hidden");
        console.log("not logged in");
        resetDisplay();
    }
});

// form event listener
const formDOM = document.querySelector("#form");
formDOM.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
    removeFromArray();
    if (statusState) {
    }
});

// form consts
const titleDOM = document.getElementById("title");
const authorDOM = document.getElementById("author");
const pageDOM = document.getElementById("page");
const readDOM = document.getElementById("read");

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
    };
}

// submit event function which adds the books to the array
function addBookToLibrary() {
    let title = titleDOM.value;
    let author = authorDOM.value;
    let page = pageDOM.value;
    let read = readDOM.checked;
    let newBook = new Book(title, author, page, read);
    myLibrary.push(newBook);
    displayArray();
    clearForm();
    defaultModalDOM.classList.add("hidden");
}

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
                    <input type="checkbox" id="read" name="read" value="true" ${
                        book.read ? "checked" : "unchecked"
                    }>
                    <label class="ml-1 text-sm text-gray-900" for="read"> Finished it? </label>
                </div>
                <button class="btn-remove" id="${book.uniqueID}">Remove</button>
            </div>
            `;
    }
}

// reset display when logged in or out
function resetDisplay() {
    myLibrary = [];
    displayDOM.innerHTML = "";
}

// remove array function with eventListeners of created buttons
function removeFromArray() {
    const removeButtons = displayDOM.querySelectorAll("button");
    removeButtons.forEach((button) =>
        button.addEventListener("click", (event) => {
            let index = myLibrary.findIndex((book) => book.uniqueID == event.target.id); // finds the index of matched id
            myLibrary.splice(index, 1); // deletes from array
            displayArray(); // refreshes the display
            return removeFromArray(); // returns itself so it continues to listen the events after removing one item.
        })
    );
}

// clear function
function clearForm() {
    titleDOM.value = "";
    authorDOM.value = "";
    pageDOM.value = "";
    readDOM.checked = "";
}

// modal settings
const openModalDOM = document.getElementById("open-modal");
const closeModalDOM = document.getElementById("close-modal");
const defaultModalDOM = document.getElementById("default-modal");
openModalDOM.onclick = () => {
    defaultModalDOM.classList.remove("hidden");
};
closeModalDOM.onclick = () => {
    defaultModalDOM.classList.add("hidden");
};
