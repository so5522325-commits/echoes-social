import { databases, DATABASE_ID, COLLECTION_ID } from './api.js';
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
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            caption: input.value // Database mein 'caption' column hona chahiye
        });
        input.value = '';
        fetchPosts();
    } catch (e) { alert("Error: " + e.message); }
};

async function fetchPosts() {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
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

window.onload = fetchPosts;

