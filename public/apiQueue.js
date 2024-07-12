// apiQueue.js
import { openDB } from 'idb';

const dbPromise = openDB('api-queue', 1, {
  upgrade(db) {
    db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
  },
});

export async function addRequestToQueue(request) {
  const db = await dbPromise;
  await db.add('requests', request);
}

export async function getRequestsFromQueue() {
  const db = await dbPromise;
  return db.getAll('requests');
}

export async function clearRequestQueue() {
  const db = await dbPromise;
  await db.clear('requests');
}
