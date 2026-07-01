import { Client, Account, Databases, Storage } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.0/+esm";
const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('6a413df70035d232adfb');
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const clientInstance = client;
export const DATABASE_ID = '6a414c58001cef943254';
export const COLLECTION_ID = 'nexus_os_';
