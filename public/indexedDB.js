const { response } = require("express");
const { get } = require("mongoose");

let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (e) {
  const db = e.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (e) {
  console.log(`Whoops! ${e.target.errorCode}`);
};

// if database is online, saved records will be uploaded
function checkDatabase() {
  let transaction = db.transaction("transaction pending", "readwrite");
  const store = transaction.objectStore("transaction pending");
  const getAll = store.getAll();
}

getAll.onsuccess = function () {
  if (getAll.result.length > 0) {
    fetch("/api/transaction/bulk", {
      method: "POST",
      body: JSON.stringify(getAll.result),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        if (res.length !== 0) {
          transaction = db.transaction(["BudgetStore"], "readwrite");
          const currentStore = transaction.objectStore("BudgetStore");
          currentStore.clear();
          console.log("Offline transactions have been stored!");
        }
      });
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

// listening for app to come back online
window.addEventListener("online", checkDatabase);
