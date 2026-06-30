import { account, databases,6a414c58001cef943254 , nexus_os_ } from './api.js';
import { ID } from 'appwrite';

async function signUp() {
    const username = document.getElementById('username').value;
    const fakeEmail = username + "@echoes.com";
    const password = document.getElementById('password').value;
    try {
        await account.create(ID.unique(), fakeEmail, password);
        alert("Signup Success!");
    } catch (e) { alert("Error: " + e.message); }
}

async function login() {
    const username = document.getElementById('username').value;
    const fakeEmail = username + "@echoes.com";
    const password = document.getElementById('password').value;
    try {
        await account.createEmailPasswordSession(fakeEmail, password);
        alert("Login Successful!");
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('home-page').style.display = 'block';
        fetchPosts();
    } catch (e) { alert("Login Failed: " + e.message); }
}

// Window attachment for buttons
window.signUp = signUp;
window.login = login;
// ... (baaki purane functions jaise fetchPosts, addPost yahan neeche rahein)
