let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (e) {
  const db = e.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (e) {
  console.log(`Whoops! ${e.target.errorCode}`);
};

function checkDatabase() {
  let transaction = db.transaction("transaction pending", "readwrite");
  const store = transaction.objectStore("transaction pending");
  const getAll = store.getAll();
}
// Checking if online before reading database
request.onsuccess = function (e) {
  db = e.target.result;
  console.log("Success!");
  if (navigator.onLine) {
    checkDatabase();
  }
};

// listen for app coming back online
window.addEventListener("online", checkDatabase);
