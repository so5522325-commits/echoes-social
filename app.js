import { databases, 6a414c58001cef943254, nexus_os_ } from './api.js';
const { ID } = Appwrite;

window.openNav = () => document.getElementById("mySidebar").classList.add("active");
window.closeNav = () => document.getElementById("mySidebar").classList.remove("active");
window.showPage = (id) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(id).classList.add('active-page');
    closeNav();
};

window.addPost = async () => {
    const input = document.getElementById('postInput');
    if (!input.value.trim()) return;
    try {
        await databases.createDocument(6a414c58001cef943254, nexus_os_, ID.unique(), {
            caption: input.value // Database mein 'caption' column hona chahiye
        });
        input.value = '';
        fetchPosts();
    } catch (e) { alert("Error: " + e.message); }
};

async function fetchPosts() {
    try {
        const response = await databases.listDocuments(6a414c58001cef943254, nexus_os_);
        const feed = document.getElementById('feed');
        feed.innerHTML = '';
        response.documents.forEach(doc => {
            const div = document.createElement('div');
            div.className = 'post-card';
            div.innerHTML = `<div>${doc.caption || "No content"}</div>`;
            feed.prepend(div);
        });
    } catch (e) { console.log(e); }
}
async function signUp() {
    async function signUp() {
    // Purani line hata kar ye daalein:
    const username = document.getElementById('username').value;
    const fakeEmail = username + "@echoes.com";
    const password = document.getElementById('password').value;
    try {
        await account.create(ID.unique(), fakeEmail, password);
        alert("Signup Success!");
    } catch (error) {
        alert("Error: " + error.message);
    }
    }
    

async function login() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await 
        alert("Loginaccount.createEmailPasswordSession(username, password) Successful!");
        // Yahan page switch ka code aayega
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('home-page').style.display = 'block';
    } catch (error) {
        alert("Login Failed: " + error.message);
    }
}

window.onload = fetchPosts;

window.signUp = signUp;
window.login = login;
