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

getAll.onsuccess = function () {
    if () { 
        fetch("/api/transaction/bulk", {
            method: "POST", 
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: 
            }
        })
    }
};

// Checking if online before reading database
request.onsuccess = function (e) {
  db = e.target.result;
  console.log("Success!");
  if (navigator.onLine) {
    checkDatabase();
  }
};

// Creating transaction in db, accessing object store, and adding record
const saveRecord = (record) => {
  const transaction = db.transaction("pending", "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);
  console.log(
    "Offline at the moment; transaction will be updated once you are back online"
  );
};

// listen for app coming back online
window.addEventListener("online", checkDatabase);
