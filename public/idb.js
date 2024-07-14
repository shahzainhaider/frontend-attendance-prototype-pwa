

const idb = (function() {
    'use strict';
  
    function toArray(arr) {
      return Array.prototype.slice.call(arr);
    }
  
    function promisifyRequest(request) {
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
  
    function promisifyRequestCall(obj, method, args) {
      const request = obj[method].apply(obj, args);
      return promisifyRequest(request);
    }
  
    function promisifyCursorRequestCall(obj, method, args) {
      const request = obj[method].apply(obj, args);
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve({ result: request.result, request });
        request.onerror = () => reject(request.error);
      });
    }
  
    function proxyProperties(ProxyClass, targetProp, properties) {
      properties.forEach(prop => {
        Object.defineProperty(ProxyClass.prototype, prop, {
          get() {
            return this[targetProp][prop];
          },
          set(val) {
            this[targetProp][prop] = val;
          },
        });
      });
    }
  
    function proxyRequestMethods(ProxyClass, targetProp, Constructor, methods) {
      methods.forEach(method => {
        if (!(method in Constructor.prototype)) return;
        ProxyClass.prototype[method] = function() {
          return promisifyRequestCall(this[targetProp], method, arguments);
        };
      });
    }
  
    function proxyMethods(ProxyClass, targetProp, Constructor, methods) {
      methods.forEach(method => {
        if (!(method in Constructor.prototype)) return;
        ProxyClass.prototype[method] = function() {
          return this[targetProp][method].apply(this[targetProp], arguments);
        };
      });
    }
  
    function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, methods) {
      methods.forEach(method => {
        if (!(method in Constructor.prototype)) return;
        ProxyClass.prototype[method] = function() {
          return promisifyCursorRequestCall(this[targetProp], method, arguments);
        };
      });
    }
  
    function Index(index) {
      this._index = index;
    }
    proxyProperties(Index, '_index', ['name', 'keyPath', 'multiEntry', 'unique']);
    proxyRequestMethods(Index, '_index', IDBIndex, ['get', 'getKey', 'getAll', 'getAllKeys', 'count']);
    proxyCursorRequestMethods(Index, '_index', IDBIndex, ['openCursor', 'openKeyCursor']);
  
    function ObjectStore(store) {
      this._store = store;
    }
    proxyProperties(ObjectStore, '_store', ['name', 'keyPath', 'indexNames', 'autoIncrement']);
    proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, ['put', 'add', 'delete', 'clear', 'get', 'getAll', 'getAllKeys', 'count']);
    proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, ['openCursor', 'openKeyCursor']);
    proxyMethods(ObjectStore, '_store', IDBObjectStore, ['deleteIndex']);
    ObjectStore.prototype.createIndex = function() {
      return new Index(this._store.createIndex.apply(this._store, arguments));
    };
    ObjectStore.prototype.index = function() {
      return new Index(this._store.index.apply(this._store, arguments));
    };
  
    function Transaction(idbTransaction) {
      this._tx = idbTransaction;
      this.complete = new Promise((resolve, reject) => {
        idbTransaction.oncomplete = () => resolve();
        idbTransaction.onerror = () => reject(idbTransaction.error);
        idbTransaction.onabort = () => reject(idbTransaction.error);
      });
    }
    proxyProperties(Transaction, '_tx', ['objectStoreNames', 'mode']);
    proxyMethods(Transaction, '_tx', IDBTransaction, ['abort']);
    Transaction.prototype.objectStore = function() {
      return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
    };
  
    function UpgradeDB(db, oldVersion, transaction) {
      this._db = db;
      this.oldVersion = oldVersion;
      this.transaction = new Transaction(transaction);
    }
    proxyProperties(UpgradeDB, '_db', ['name', 'version', 'objectStoreNames']);
    proxyMethods(UpgradeDB, '_db', IDBDatabase, ['createObjectStore', 'deleteObjectStore', 'close']);
  
    function DB(db) {
      this._db = db;
    }
    proxyProperties(DB, '_db', ['name', 'version', 'objectStoreNames']);
    proxyMethods(DB, '_db', IDBDatabase, ['close']);
    DB.prototype.transaction = function() {
      return new Transaction(this._db.transaction.apply(this._db, arguments));
    };
  
    // Open the database
    function openDB(name, version, { upgrade, blocked, blocking, terminated } = {}) {
      const request = indexedDB.open(name, version);
      const openPromise = promisifyRequest(request);
  
      if (upgrade) {
        request.onupgradeneeded = event => {
          upgrade(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        };
      }
  
      if (blocked) request.onblocked = () => blocked();
      if (blocking) openPromise.then(db => db.onversionchange = blocking);
      if (terminated) openPromise.then(db => db.onclose = terminated);
  
      return openPromise.then(db => new DB(db));
    }
  
    // Delete the database
    function deleteDB(name, { blocked } = {}) {
      const request = indexedDB.deleteDatabase(name);
      if (blocked) request.onblocked = () => blocked();
      return promisifyRequest(request);
    }
  
    return { openDB, deleteDB };
  })();
  
  self.idb = idb;
  