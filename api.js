import { Client, Databases, Account } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.0/+esm";

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Yahan apna Appwrite Endpoint dalein
    .setProject('6a413df70035d232adfb');        // Yahan apna Project ID dalein

export const account = new Account(client);
export const databases = new Databases(client);

// Apni IDs yahan se export karein taaki app.js mein mil sakein
export const DATABASE_ID = '6a414c58001cef943254';
export const COLLECTION_ID = 'nexus_os_';
