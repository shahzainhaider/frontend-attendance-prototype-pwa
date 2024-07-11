


import { openDB } from "idb";

const dbPromise = (async () => {
    const db = await openDB('api-queue', 1, {
      upgrade(db) {
        db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
      },
    });
    return db;
  })();
  
  async function addRequestToQueue(request) {
    const db = await dbPromise;
    await db.add('requests', request);
  }
  
  async function getRequestsFromQueue() {
    const db = await dbPromise;
    return db.getAll('requests');
  }
  
  async function clearRequestQueue() {
    const db = await dbPromise;
    await db.clear('requests');
  }
  

// public/sw.js

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
      event.respondWith(
        (async () => {
          try {
            const response = await fetch(event.request);
            return response;
          } catch (error) {
            // Offline: Add request to queue
            const clonedRequest = event.request.clone();
            const body = await clonedRequest.json();
            console.log(clonedRequest)
            console.log(body)
            await addRequestToQueue({
              url: clonedRequest.url,
              method: clonedRequest.method,
              headers: [...clonedRequest.headers],
              body,
            });
            return new Response(JSON.stringify({ error: 'Request queued due to offline mode' }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        })()
      );
    }
  });
  
  self.addEventListener('sync', async (event) => {
    if (event.tag === 'sync-api-queue') {
      event.waitUntil(
        (async () => {
          const requests = await getRequestsFromQueue();
          await Promise.all(
            requests.map(async (request) => {
              const { url, method, headers, body } = request;
              await fetch(url, {
                method,
                headers: new Headers(headers),
                body: JSON.stringify(body),
              });
            })
          );
          await clearRequestQueue();
        })()
      );
    }
  });
  