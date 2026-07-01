import { databases, DATABASE_ID, COLLECTION_ID, account } from './api.js';
import { Query, ID } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.0/+esm";

// 1. Auth Functions
const handleAuth = async () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    if (!user || !pass) return alert("Username aur Password zaroori hain!");
    const email = `${user}@echoes.com`;
    try {
        const isLogin = document.getElementById('auth-title').innerText === 'Login';
        if (isLogin) {
            await account.createEmailPasswordSession(email, pass);
        } else {
            await account.create(ID.unique(), email, pass, user);
            alert("Signup Success!"); toggleAuth(); return;
        }
        location.reload();
    } catch (e) { alert(e.message); }
};

const toggleAuth = () => {
    let isLogin = document.getElementById('auth-title').innerText === 'Login';
    document.getElementById('auth-title').innerText = isLogin ? 'Sign Up' : 'Login';
    document.getElementById('auth-btn').innerText = isLogin ? 'Sign Up' : 'Login';
};

// 2. Navigation & App Functions
const openNav = () => { document.getElementById("mySidebar").classList.add("active"); document.getElementById("sidebar-overlay").classList.add("active"); };
const closeNav = () => { document.getElementById("mySidebar").classList.remove("active"); document.getElementById("sidebar-overlay").classList.remove("active"); };
const toggleMenu = () => document.getElementById("dropdown").classList.toggle("show");
const logout = async () => { await account.deleteSession('current'); location.reload(); };

const showPage = (id) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(id).classList.add('active-page');
    closeNav();
};

// 3. Post Functions
const addPost = async () => {
    const val = document.getElementById('postInput').value;
    if(!val) return;
    const user = await account.get();
    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { caption: val, userId: user.$id });
    document.getElementById('postInput').value = '';
    fetchPosts();
};

const deletePost = async (postId) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, postId);
    fetchPosts();
};

async function fetchPosts() {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.orderDesc("$createdAt")]);
    const feed = document.getElementById('feed');
    feed.innerHTML = response.documents.map(doc => `
        <div class='post-card' style="position:relative;">
            <p>${doc.caption}</p>
            <button onclick="deletePost('${doc.$id}')" style="background:red; width:60px; font-size:10px; position:absolute; top:10px; right:10px;">Delete</button>
        </div>
    `).join('');
}

// 4. Initialization (Event Listeners)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('auth-btn').addEventListener('click', handleAuth);
    document.getElementById('toggle-auth-btn').addEventListener('click', toggleAuth);
    document.getElementById('open-nav').addEventListener('click', openNav);
    document.getElementById('close-nav').addEventListener('click', closeNav);
    document.getElementById('add-post-btn').addEventListener('click', addPost);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('nav-home').addEventListener('click', () => showPage('home'));
    document.getElementById('nav-profile').addEventListener('click', () => showPage('profile'));
    document.getElementById('nav-messages').addEventListener('click', () => showPage('messages')); // Messages add kiya

    // Auto login check
    account.get().then(user => {
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('user-display').innerText = user.name;
        fetchPosts();
    }).catch(() => {});
});

// Global accessibility ke liye (Delete button onclick ke liye)
window.deletePost = deletePost;
