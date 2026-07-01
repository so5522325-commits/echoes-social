import { databases, DATABASE_ID, COLLECTION_ID, account } from './api.js';
import { ID, Query } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.0/+esm";

window.toggleNav = () => document.getElementById("sidebar").classList.toggle("active");
window.showPage = (id) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById('main-header').classList.toggle('hidden', id === 'login-page');
};

window.registerUser = async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    try {
        await account.create(ID.unique(), `${user}@echoes.app`, pass, user);
        await account.createEmailPasswordSession(`${user}@echoes.app`, pass);
        location.reload();
    } catch(e) { alert("Error: " + e.message); }
};

window.loginUser = async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    try {
        await account.createEmailPasswordSession(`${user}@echoes.app`, pass);
        location.reload();
    } catch(e) { alert("Login failed!"); }
};

window.addPost = async () => {
    try {
        const user = await account.get();
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { caption: document.getElementById('postInput').value, userId: user.$id });
        document.getElementById('postInput').value = '';
        loadFeed();
    } catch(e) { alert("Login error: Please re-login."); }
};

window.loadFeed = async () => {
    let user = null;
    try { user = await account.get(); } catch(e) {}
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.orderDesc("$createdAt")]);
    document.getElementById('feed').innerHTML = res.documents.map(d => `
        <div class="post-item">
            ${(user && d.userId === user.$id) ? `<div class="dots-menu">⋮</div><div class="delete-btn" onclick="deletePost('${d.$id}')">Delete</div>` : ''}
            <b style="color:#7C3AED;">User: ${d.userId.slice(0,6)}</b>
            <p>${d.caption}</p>
        </div>
    `).join('');
};

window.deletePost = async (id) => { await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id); loadFeed(); };
window.logout = () => { account.deleteSession('current'); location.reload(); };

(async () => {
    try { await account.get(); showPage('home'); loadFeed(); }
    catch(e) { showPage('login-page'); }
})();
