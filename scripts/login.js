import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../styles/clientsList.css"

const firebase = require("firebase/app");
require("firebase/auth");
import * as validator from "validator"
import { initApp } from "./firebase.js";

initApp();

let state = "login";

const registerForm = document.querySelector("[name='registerForm']");

registerForm.addEventListener("submit", event => {
    event.preventDefault();
    validateRegisterForm(event.target);
});

const loginForm = document.querySelector("[name='loginForm']");

loginForm.addEventListener("submit", event => {
    event.preventDefault();
    validateLoginForm(event.target);
});

togleStatus(state);

const toggleButtons = [
    { id: "toggleRegister", value: "register" },
    { id: "toggleLogin", value: "login" }
];

toggleButtons.forEach(button => {
    const element = document.querySelector(`#${button.id}`);
    element.addEventListener("click", () => {
        togleStatus(button.value);
    });
});

//Observe changes

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        // let displayName = user.displayName;
        let email = user.email;
        window.location.href = "./clientsList.html";
        // let emailVerified = user.emailVerified;
        // let photoURL = user.photoURL;
        // let isAnonymous = user.isAnonymous;
        // let uid = user.uid;
        // let providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        // ...
    }
});

//Validation

// registerForm.querySelector("[type='password']").addEventListener("blur", event => {
//     validatePassword(event.target);
// });

// loginForm.querySelector("[type='password']").addEventListener("blur", event => {
//     validatePassword(event.target);
// });

// registerForm.querySelector("[name='email']").addEventListener("blur", event => {
//     validateEmail(event.target);
// });

// loginForm.querySelector("[name='email']").addEventListener("blur", event => {
//     validateEmail(event.target);
// });

function showLogin() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
}

function showRegister() {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
}

function togleStatus(newState) {
    state = newState;
    state === "login" ? showLogin() : showRegister();
}

function validateRegisterForm(target) {
    const isFormValid = validateRequiredFields(target);
    isFormValid ? registerNewUsers(target.email.value, target.pass.value) : null;
}

function validateLoginForm(target) {
    const isFormValid = validateRequiredFields(target);
    isFormValid ? logIn(target.email.value, target.pass.value) : null;
    console.log(target.email.value, target.pass.value);
}

function validateRequiredFields(target) {
    const isPasswordValid = validatePassword(target.pass);
    const isEmailValid = validateEmail(target.email);
    console.log(isPasswordValid);
    console.log(isEmailValid);
    return isPasswordValid && isEmailValid;

}

function validatePassword(field) {
    // if (field.value.length < 10) {
    //     field.className += " is-invalid";
    //     return false;
    // } else {
    //     field.className = "form-control is-valid";
    //     return true;
    // }
    if (field.value) {
        markFieldAsValid(field);
        return true;
    }
    markFieldAsInvalid(field);
    return false;

}

function markFieldAsInvalid(field) {
    field.className += " is-invalid";
}

function markFieldAsValid(field) {
    field.className = "form-control is-valid";
}

function validateEmail(field) {
    validator.isEmail('foo@bar.com')
    if (field.value && validator.isEmail(field.value)) {
        markFieldAsValid(field);
        return true;
    }
    markFieldAsInvalid(field);
    return false;
}

function registerNewUsers(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(response =>
        console.log("Register new user", response)).catch(error => handleError(error));
}

function logIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response =>
        console.log("Register new user", response)).catch(error => handleError(error));
}

function handleError(error) {
    const alert = document.querySelector(".alert");
    const message = alert.querySelector(".error-message");
    message.innerHTML = error.message;
    alert.className = "alert alert-warning fade show m-4";
}