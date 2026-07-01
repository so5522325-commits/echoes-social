const { Client, Databases, Account } = Appwrite;
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('6a413df70035d232adfb');

export const databases = new Databases(client);
export const account = new Account(client);
export const DATABASE_ID = '6a414c58001cef943254';
export const COLLECTION_ID = 'nexus_os_';
