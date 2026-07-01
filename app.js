import { databases, DATABASE_ID, COLLECTION_ID, account } from './api.js';
import { Query, ID } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.0/+esm";

let isLogin = true;
window.toggleAuth = () => {
    isLogin = !isLogin;
    document.getElementById('auth-title').innerText = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('auth-btn').innerText = isLogin ? 'Login' : 'Sign Up';
};

window.handleAuth = async () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    if (!user || !pass) return alert("Sabhi fields bharein!");
    try {
        if (isLogin) await account.createEmailPasswordSession(`${user}@echoes.com`, pass);
        else await account.create(ID.unique(), `${user}@echoes.com`, pass, user);
        location.reload();
    } catch (e) { alert(e.message); }
};

window.logout = async () => { await account.deleteSession('current'); location.reload(); };
window.openNav = () => document.getElementById("mySidebar").classList.add("active");
window.closeNav = () => document.getElementById("mySidebar").classList.remove("active");
window.toggleMenu = () => {
    const d = document.getElementById("dropdown");
    d.style.display = (d.style.display === 'block') ? 'none' : 'block';
};
window.showPage = (id) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(id).classList.add('active-page');
    closeNav();
};

window.addPost = async () => {
    const input = document.getElementById('postInput');
    if (!input.value.trim()) return;
    try {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { 
            caption: input.value 
        });
        input.value = ''; 
        await fetchPosts();
    } catch (e) { alert("Error: " + e.message); }
};

async function checkUser() {
    try {
        const user = await account.get();
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('user-display').innerText = user.name;
        fetchPosts();
    } catch (e) {}
}

async function fetchPosts() {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc("$createdAt")
        ]);
        const feed = document.getElementById('feed');
        feed.innerHTML = '';
        
        response.documents.forEach(doc => {
            const div = document.createElement('div');
            div.className = 'post-card';
            div.innerHTML = `<p>${doc.caption}</p>`;
            feed.appendChild(div);
        });
    } catch (e) { console.error(e); }
}

window.onload = checkUser;
