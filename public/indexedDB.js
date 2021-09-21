let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (e) {
  const db = e.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (e) {
  const db = e.target.result;
  db.createObjectStore("transaction pending", { autoIncrement: true });
};

function checkDatabase() {
    const transaction = 
    const store = 
    const getAll = 
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
